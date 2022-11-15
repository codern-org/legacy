import {
  Controller, Get, Headers,
  Inject, Ip, Query,
  Redirect, Req, Res,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthResponse, GoogleAuthUrlResponse } from 'api-types';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@/services/AuthService';
import { AuthGuard } from '@/utils/AuthGuard';
import { SessionId } from '@/utils/decorators/AuthDecorator';

@Controller('/auth')
export class AuthController {

  private readonly client: ClientGrpc;
  private readonly configService: ConfigService;

  public constructor(
    configService: ConfigService,
    @Inject('AUTH_PACKAGE') client: ClientGrpc,
  ) {
    this.client = client;
    this.configService = configService;
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  public authenticate(
    @SessionId() session: string,
  ): Observable<AuthResponse> {
    const service = this.client.getService<AuthService>('AuthService');
    return service.authenticate({ session });
  }

  @UseGuards(AuthGuard)
  @Get('/logout')
  public async logout(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
    @SessionId() session: string,
  ): Promise<void> {
    const service = this.client.getService<AuthService>('AuthService');
    await firstValueFrom(service.logout({ session }));
    response.header('Set-Cookie', 'sid=; path=/ expires=Thu, 01 Jan 1970 00:00:00 GMT');
  }

  @Get('/google')
  public getGoogleOAuthUrl(): Observable<GoogleAuthUrlResponse> {
    const service = this.client.getService<AuthService>('AuthService');
    return service.getGoogleOAuthUrl({});
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
    const service = this.client.getService<AuthService>('AuthService');

    try {
      const result = await firstValueFrom(service.loginWithGoogle({ code, userAgent, ipAddress }));
      response.header('Set-Cookie', result.cookieHeader);
      return { url: homeUrl };
    } catch {
      return { url: loginUrl };
    }
  }

}
