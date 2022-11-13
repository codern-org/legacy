import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  AuthRequest, AuthUserRequest,
  AuthUserResponse, GrpcError, GoogleAuthRequest, GoogleAuthResponse,
  GoogleAuthUrlResponse,
  LogoutRequest,
} from 'api-types';
import { GoogleService } from '@/services/GoogleService';
import { AuthService } from '@/services/AuthService';

@Controller('/auth')
export class AuthController {

  private readonly logger: Logger;
  private readonly authService: AuthService;
  private readonly googleService: GoogleService;

  public constructor(
    logger: Logger,
    authService: AuthService,
    googleService: GoogleService,
  ) {
    this.logger = logger;
    this.authService = authService;
    this.googleService = googleService;
  }

  @GrpcMethod('AuthService')
  public async authenticate(data: AuthRequest): Promise<void> {
    try {
      await this.authService.authenticate(data.session);
    } catch (error: Error | unknown) {
      if (error instanceof Error) this.logger.error(error.message, error, 'AuthController');
      throw new RpcException({
        code: GrpcError.UNAUTHENTICATED,
        message: 'Unauthorized user',
      });
    }
  }

  @GrpcMethod('AuthService')
  public async logout(data: LogoutRequest): Promise<void> {
    try {
      await this.authService.logout(data.session);
    } catch (error: Error | unknown) {
      if (error instanceof Error) this.logger.error(error.message, error, 'AuthController');
      throw new RpcException({
        code: GrpcError.ABORTED,
        message: 'Cannot logout',
      });
    }
  }

  @GrpcMethod('AuthService')
  public async getUserFromSession(data: AuthUserRequest): Promise<AuthUserResponse> {
    try {
      return this.authService.getUserFromSession(data.session);
    } catch (error: Error | unknown) {
      if (error instanceof Error) this.logger.error(error.message, error, 'AuthController');
      throw new RpcException({
        code: GrpcError.UNAUTHENTICATED,
        message: 'Cannot get an user data from the session',
      });
    }
  }

  @GrpcMethod('AuthService')
  public getGoogleOAuthUrl(): GoogleAuthUrlResponse {
    return { url: this.googleService.getOAuthUrl() };
  }

  @GrpcMethod('AuthService')
  public async loginWithGoogle(data: GoogleAuthRequest): Promise<GoogleAuthResponse> {
    try {
      const cookieHeader = await this.authService.loginWithGoogle(data);
      return { cookieHeader };
    } catch (error: Error | unknown) {
      if (error instanceof Error) this.logger.error(error.message, error, 'AuthController');
      throw new RpcException({
        code: GrpcError.UNAUTHENTICATED,
        message: 'Cannot authenticate with Google OAuth',
      });
    }
  }

}
