import FormData from 'form-data';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  ExpectedDuplicatedError, ExpectedInvalidError, ExpectedNotFoundError,
  AuthProvider,
} from '@codern/internal';
import { Timestamp } from '@codern/shared';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '@/repositories/UserRepository';
import { generateAvatar } from '@/utils/AvatarGenerator';
import { Validator } from '@/utils/Validator';
import { UserError } from '@/utils/errors/UserError';
import { AuthError } from '@/utils/errors/AuthError';

export type SelfProviderUser = Omit<User, 'password'> & { password: string };

@Injectable()
export class UserService {

  private readonly httpService: HttpService;
  private readonly configService: ConfigService;
  private readonly userRepository: UserRepository;

  public constructor(
    httpService: HttpService,
    configService: ConfigService,
    userRepository: UserRepository,
  ) {
    this.httpService = httpService;
    this.configService = configService;
    this.userRepository = userRepository;
  }

  public hashUserId(id: string, provider: AuthProvider): string {
    return crypto
      .createHash('sha1')
      .update(`${id}.${provider}`)
      .digest('hex');
  }

  public toPublicUserProfileUrl<T extends User>(user: T): T {
    const convertedUser = user;
    const publicFileUrl = this.configService.get<string>('publicFileUrl');
    convertedUser.profilePath = publicFileUrl + user.profilePath;
    return convertedUser;
  }

  public async getUserOrThrow(id: string): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new ExpectedNotFoundError(UserError.NotFoundById);
    return this.toPublicUserProfileUrl(user);
  }

  public async getUserFromSessionIdOrThrow(id: string): Promise<User> {
    const user = await this.userRepository.getUserBySessionId(id);
    if (!user) throw new ExpectedNotFoundError(AuthError.NotFoundFromSession);
    return this.toPublicUserProfileUrl(user);
  }

  public async getUserWithSelfProvider(email: string): Promise<SelfProviderUser | null> {
    const user = await this.userRepository
      .getFirstUserWhere({ email, provider: AuthProvider.SELF }) as SelfProviderUser | null;
    return user ? this.toPublicUserProfileUrl(user) : null;
  }

  public async getUserByIds(ids: string[]): Promise<User[]> {
    const users = await this.userRepository.getUsersWhere({ id: { in: ids } });
    return users.map((user) => this.toPublicUserProfileUrl(user));
  }

  public async registerUserOrThrow(email: string, password: string): Promise<void> {
    const registeredUser = await this.getUserWithSelfProvider(email);
    if (registeredUser) throw new ExpectedDuplicatedError(UserError.Duplicated);

    if (!Validator.validateEmail(email)) throw new ExpectedInvalidError(UserError.InvalidEmail);

    // TODO: secure password validation

    const userId = this.hashUserId(email, AuthProvider.SELF);
    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePath = await this.generateAvatarOrThrow(userId);

    await this.userRepository.createUser({
      id: userId,
      email,
      password: hashedPassword,
      displayName: '',
      profilePath,
      provider: AuthProvider.SELF,
      createdAt: Timestamp.now(),
    });
  }

  public createUser(user: User): Promise<User> {
    return this.userRepository.createUser(user);
  }

  public async updateEmailOrThrow(id: string, email: string): Promise<void> {
    if (!Validator.validateEmail(email)) throw new ExpectedInvalidError(UserError.InvalidEmail);
    await this.userRepository.updateUser(id, { email });
  }

  public async updateDisplayName(id: string, displayName: string): Promise<void> {
    await this.userRepository.updateUser(id, { displayName });
  }

  public async generateAvatarOrThrow(id: string): Promise<string> {
    const rawAvatarSvg = generateAvatar(id, 150);

    const svgBuffer = Buffer.from(rawAvatarSvg, 'utf-8');
    const formData = new FormData();
    formData.append('file', svgBuffer, { filename: 'avatar.svg' });

    try {
      const filerUrl = this.configService.get<string>('filerUrl');
      const filePath = `/profile/${id}`;
      await firstValueFrom(this.httpService.post(`${filerUrl}${filePath}`, formData));
      return filePath;
    } catch (error) {
      throw new Error('Cannot connect to file service');
    }
  }

}
