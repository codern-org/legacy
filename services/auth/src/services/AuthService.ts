import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  AuthResponse, ExpectedInvalidError, ExpectedNotFoundError,
  GoogleAuthRequest,
} from 'api-types';
import { GoogleService } from '@/services/GoogleService';
import { UserService } from '@/services/UserService';
import { SessionService } from '@/services/SessionService';
import { AuthError } from '@/utils/errors/AuthError';

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

  public async authenticateOrThrow(incomingSession: string): Promise<AuthResponse> {
    const session = await this.sessionService.validateSessionOrThrow(incomingSession);
    const user = await this.userService.getUserFromSessionId(session.id);
    if (!user) throw new ExpectedNotFoundError(AuthError.NotFoundFromSession);
    return {
      id: user.id,
      email: user.email,
      profileUrl: user.profileUrl,
    };
  }

  public async logout(incomingSession: string): Promise<void> {
    const session = await this.sessionService.validateSessionOrThrow(incomingSession);
    await this.sessionService.destroySession(session.id);
  }

  public async loginOrThrow(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserWithSelfProvider(email);
    if (!user) throw new ExpectedInvalidError(AuthError.InvalidCredentials);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ExpectedInvalidError(AuthError.InvalidCredentials);

    return user;
  }

  public async loginWithGoogle(data: GoogleAuthRequest): Promise<string> {
    const token = await this.googleService.getToken(data.code);
    const googleUser = await this.googleService.getGoogleUser(token);
    const userId = this.userService.hashUserId(googleUser.id, 'GOOGLE');

    const user = await this.userService.getOrCreateUser(userId, 'GOOGLE');
    await this.userService.updateEmailOrThrow(userId, googleUser.email);

    return this.sessionService.createSession(user.id, data.userAgent, data.ipAddress);
  }

}
