import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import {
  ExpectedInvalidError, ExpectedNotFoundError, GoogleAuthRequest,
  AuthProvider,
  Owner,
  LoginRequest,
} from '@codern/internal';
import { Timestamp } from '@codern/shared';
import { User } from '@prisma/client';
import { GoogleService } from '@/services/GoogleService';
import { UserService } from '@/services/UserService';
import { SessionService } from '@/services/SessionService';
import { AuthError } from '@/utils/errors/AuthError';
import { OrganizationService } from '@/services/OrganizationService';

@Injectable()
export class AuthService {

  private readonly googleService: GoogleService;
  private readonly sessionService: SessionService;
  private readonly userService: UserService;
  private readonly organizationService: OrganizationService;

  public constructor(
    googleService: GoogleService,
    sessionService: SessionService,
    userService: UserService,
    organizationService: OrganizationService,
  ) {
    this.googleService = googleService;
    this.sessionService = sessionService;
    this.userService = userService;
    this.organizationService = organizationService;
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

  public async loginOrThrow(data: LoginRequest): Promise<string> {
    const user = await this.userService.getUserWithSelfProvider(data.email);
    if (!user) throw new ExpectedNotFoundError(AuthError.NotFound);

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) throw new ExpectedInvalidError(AuthError.InvalidCredentials);

    return this.sessionService.createSession(user.id, data.userAgent, data.ipAddress);
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

  public async getOwnerDetailOrThrow(ownerId: string): Promise<Owner> {
    const isOrganization = ownerId.startsWith('org:');
    if (isOrganization) {
      const organizationId = Number.parseInt(ownerId.split(':')[1], 10);
      const organization = await this.organizationService.getOrganizationOrThrow(organizationId);
      return {
        id: `org:${organization.id.toString()}`,
        displayName: organization.displayName,
      };
    }

    const user = await this.userService.getUserOrThrow(ownerId);
    return {
      id: user.id,
      displayName: user.displayName,
    };
  }

}
