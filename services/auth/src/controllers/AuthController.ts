import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GoogleAuthResponse, GoogleAuthUrlResponse } from 'api-types';
import { AuthService } from '@/services/AuthService';
import { GoogleService } from '@/services/GoogleService';

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

  @GrpcMethod('GoogleService')
  public getGoogleOAuthUrl(): GoogleAuthUrlResponse {
    return { url: this.googleService.getOAuthUrl() };
  }

  @GrpcMethod('GoogleService')
  public async authWithGoogle(code: string): Promise<GoogleAuthResponse> {
    try {
      const token = await this.googleService.getToken(code);
      await this.googleService.getGoogleUser(token);

      return {
        success: true,
        redirectUrl: 'https://www.google.com/',
      };
    } catch {
      return {
        success: false,
        redirectUrl: 'https://www.youtube.com/',
      };
    }
  }

}
