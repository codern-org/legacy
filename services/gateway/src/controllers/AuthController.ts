import {
  Controller, Get, Headers,
  Inject, Ip, Query,
  Redirect, Res, UseGuards,
} from '@nestjs/common';
import { PublicGoogleAuthUrlResponse, PublicUser } from '@codern-api/external';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { FastifyReply } from 'fastify';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@/services/AuthService';
import { AuthGuard } from '@/utils/guards/AuthGuard';
import { Session, User } from '@/utils/decorators/AuthDecorator';

@Controller('/auth')
export class AuthController {

  private readonly configService: ConfigService;
  private readonly authService: AuthService;

  public constructor(
    configService: ConfigService,
    @Inject('AUTH_PACKAGE') client: ClientGrpc,
  ) {
    this.configService = configService;
    this.authService = client.getService('AuthService');
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  public authenticate(@User() userData: PublicUser): PublicUser {
    return userData;
  }

  @Get('/logout')
  @UseGuards(AuthGuard)
  public async logout(
    @Res({ passthrough: true }) response: FastifyReply,
    @Session() session: string,
  ): Promise<void> {
    await firstValueFrom(this.authService.logout({ session }));
    response.header('Set-Cookie', 'sid=; path=/ expires=Thu, 01 Jan 1970 00:00:00 GMT');
  }

  @Get('/google')
  public getGoogleOAuthUrl(): Observable<PublicGoogleAuthUrlResponse> {
    return this.authService.getGoogleOAuthUrl({});
  }

  @Redirect()
  @Get('/google/callback')
  public async loginWithGoogle(
    @Query('code') code: string,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<{ url: string }> {
    const loginUrl = this.configService.get('frontendLoginUrl');
    const homeUrl = this.configService.get('frontendHomeUrl');

    try {
      const result = await firstValueFrom(
        this.authService.loginWithGoogle({ code, userAgent, ipAddress }),
      );
      response.header('Set-Cookie', result.cookieHeader);
      return { url: homeUrl };
    } catch {
      return { url: loginUrl };
    }
  }

}
