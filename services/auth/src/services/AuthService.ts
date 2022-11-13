import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthResponse, GoogleAuthRequest } from 'api-types';
import { GoogleService } from '@/services/GoogleService';
import { UserService } from '@/services/UserService';
import { SessionService } from '@/services/SessionService';

@Injectable()
export class AuthService {

  private readonly googleService: GoogleService;
  private readonly sessionService: SessionService;
  private readonly userService: UserService;

  public constructor(
    googleService: GoogleService,
    sessionService: SessionService,
    userService: UserService,
  ) {
    this.googleService = googleService;
    this.sessionService = sessionService;
    this.userService = userService;
  }

  public async authenticate(incomingSession: string): Promise<AuthResponse> {
    const session = await this.sessionService.validateSession(incomingSession);
    const user = await this.userService.getUserFromSessionId(session.id);
    if (!user) throw new Error('User not found');
    return {
      id: user.id,
      email: user.email,
      profileUrl: user.profileUrl,
    };
  }

  public async logout(incomingSession: string): Promise<void> {
    const session = await this.sessionService.validateSession(incomingSession);
    await this.sessionService.destroySession(session.id);
  }

  public async login(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserWithSelfProvider(email);
    if (!user) throw new Error('Username or password is invalid');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Username or password is invalid');

    return user;
  }

  public async loginWithGoogle(data: GoogleAuthRequest): Promise<string> {
    const token = await this.googleService.getToken(data.code);
    const googleUser = await this.googleService.getGoogleUser(token);
    const userId = this.userService.hashUserId(googleUser.id, 'GOOGLE');

    const user = await this.userService.getOrCreateUser(userId, 'GOOGLE');
    await this.userService.updateEmail(userId, googleUser.email);

    return this.sessionService.createSession(user.id, data.userAgent, data.ipAddress);
  }

}
