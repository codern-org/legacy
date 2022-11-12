import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GoogleAuthRequest, GoogleAuthResponse, GoogleAuthUrlResponse } from 'api-types';
import { ConfigService } from '@nestjs/config';
import { GoogleService } from '@/services/GoogleService';
import { AuthService } from '@/services/AuthService';

@Controller('/auth')
export class AuthController {

  private readonly logger: Logger;
  private readonly configService: ConfigService;
  private readonly authService: AuthService;
  private readonly googleService: GoogleService;

  public constructor(
    logger: Logger,
    configService: ConfigService,
    authService: AuthService,
    googleService: GoogleService,
  ) {
    this.logger = logger;
    this.configService = configService;
    this.authService = authService;
    this.googleService = googleService;
  }

  @GrpcMethod('GoogleService')
  public getGoogleOAuthUrl(): GoogleAuthUrlResponse {
    return { url: this.googleService.getOAuthUrl() };
  }

  @GrpcMethod('GoogleService')
  public async authWithGoogle(data: GoogleAuthRequest): Promise<GoogleAuthResponse> {
    const loginUrl = this.configService.get('frontendLoginUrl');
    const homeUrl = this.configService.get('frontendHomeUrl');
    try {
      const user = await this.authService.loginWithGoogle(data.code);
      const cookie = await this.authService.createSession(user.id, data.userAgent, data.ipAddress);
      return { success: true, redirectUrl: homeUrl, cookie };
    } catch (error: Error | unknown) {
      if (error instanceof Error) this.logger.error(error.message, error, 'AuthController');
      return { success: false, redirectUrl: loginUrl };
    }

  }

}
