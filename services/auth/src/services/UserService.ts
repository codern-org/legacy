import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AuthProvider, Prisma, User } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import FormData from 'form-data';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { UserRepository } from '@/repositories/UserRepository';
import { generateAvatar } from '@/utils/AvatarGenerator';
import { Validator } from '@/utils/Validator';

export type SelfProviderUser = Omit<User, 'password'> & { password: string };

@Injectable()
export class UserService {

  private readonly httpService: HttpService;
  private readonly userRepository: UserRepository;

  public constructor(
    httpService: HttpService,
    userRepository: UserRepository,
  ) {
    this.httpService = httpService;
    this.userRepository = userRepository;
  }

  public hashUserId(id: string, provider: AuthProvider): string {
    return crypto
      .createHash('sha1')
      .update(`${id}.${provider}`)
      .digest('hex');
  }

  public async getUserWithSelfProvider(email: string): Promise<SelfProviderUser | null> {
    const user = await this.userRepository
      .getFirstUserWhere({ email, provider: 'SELF' }) as SelfProviderUser;
    return user;
  }

  public async registerUser(email: string, password: string): Promise<void> {
    const registeredUser = await this.getUserWithSelfProvider(email);
    if (registeredUser) throw new Error('User with this email already registered');

    if (!Validator.validateEmail(email)) throw new Error('Email is invalid');

    // TODO: secure password validation

    const userId = this.hashUserId(email, 'SELF');
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarUrl = await this.generateAvatar(userId);

    await this.userRepository.createUser({
      id: userId,
      email,
      password: hashedPassword,
      profileUrl: avatarUrl,
      provider: 'SELF',
    });
  }

  public async getOrCreateUser(id: string, provider: AuthProvider): Promise<User> {
    const retrievedUser = await this.userRepository.getUserById(id);
    if (retrievedUser) return retrievedUser;

    const avatarUrl = await this.generateAvatar(id);
    const user: Prisma.UserCreateInput = {
      id,
      email: '',
      profileUrl: avatarUrl,
      provider,
    };
    return this.userRepository.createUser(user);
  }

  public async updateEmail(id: string, email: string): Promise<void> {
    if (!Validator.validateEmail(email)) throw new Error('Email is invalid');
    await this.userRepository.updateUser(id, { email });
  }

  public async generateAvatar(id: string): Promise<string> {
    const rawAvatarSvg = generateAvatar(id, 150);

    const svgBuffer = Buffer.from(rawAvatarSvg, 'utf-8');
    const formData = new FormData();
    formData.append('file', svgBuffer, { filename: 'avatar.svg' });

    try {
      const fileUrl = `http://localhost:8888/profile/${id}`;
      await firstValueFrom(this.httpService.post(fileUrl, formData));
      return fileUrl;
    } catch (error) {
      throw new Error('Cannot connect to file service');
    }
  }

}
