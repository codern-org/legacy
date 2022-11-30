import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import {
  ExpectedInvalidError, ExpectedNotFoundError, GoogleAuthRequest,
  AuthProvider,
} from '@codern-api/internal';
import { Timestamp } from '@codern/shared';
import { User } from '@prisma/client';
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

  public async authenticateOrThrow(incomingSession: string): Promise<User> {
    const session = await this.sessionService.validateSessionOrThrow(incomingSession);
    const user = await this.userService.getUserFromSessionIdOrThrow(session.id);
    return user;
  }

  public async logoutOrThrow(incomingSession: string): Promise<void> {
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

  public async loginWithGoogleOrThrow(data: GoogleAuthRequest): Promise<string> {
    const token = await this.googleService.getToken(data.code);
    const googleUser = await this.googleService.getGoogleUser(token);
    const userId = this.userService.hashUserId(googleUser.id, AuthProvider.GOOGLE);

    let user: User;

    try {
      user = await this.userService.getUserOrThrow(userId);
    } catch (error) {
      if (!(error instanceof ExpectedNotFoundError)) throw error;
      const profileUrl = await this.userService.generateAvatarOrThrow(userId);
      user = await this.userService.createUser({
        id: userId,
        email: googleUser.email,
        password: null,
        displayName: googleUser.name,
        profileUrl,
        provider: AuthProvider.GOOGLE,
        createdAt: Timestamp.now(),
      });
    }

    return this.sessionService.createSession(user.id, data.userAgent, data.ipAddress);
  }

}
