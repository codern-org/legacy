import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AuthRequest, GoogleAuthRequest, GoogleAuthResponse,
  GoogleAuthUrlResponse, LogoutRequest, AuthResponse,
} from 'api-types';
import { GoogleService } from '@/services/GoogleService';
import { AuthService } from '@/services/AuthService';

@Controller('/auth')
export class AuthController {

  private readonly authService: AuthService;
  private readonly googleService: GoogleService;

  public constructor(
    authService: AuthService,
    googleService: GoogleService,
  ) {
    this.authService = authService;
    this.googleService = googleService;
  }

  @GrpcMethod('AuthService')
  public async authenticate(data: AuthRequest): Promise<AuthResponse> {
    const user = await this.authService.authenticateOrThrow(data.session);
    return { user };
  }

  @GrpcMethod('AuthService')
  public async logout(data: LogoutRequest): Promise<void> {
    return this.authService.logout(data.session);
  }

  @GrpcMethod('AuthService')
  public getGoogleOAuthUrl(): GoogleAuthUrlResponse {
    return { url: this.googleService.getOAuthUrl() };
  }

  @GrpcMethod('AuthService')
  public async loginWithGoogle(data: GoogleAuthRequest): Promise<GoogleAuthResponse> {
    const cookieHeader = await this.authService.loginWithGoogle(data);
    return { cookieHeader };
  }

}
