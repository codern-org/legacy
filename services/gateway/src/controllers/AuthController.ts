import {
  Controller, Get, Headers, Inject, Ip, Query, Redirect, Res,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { GoogleAuthUrlResponse } from 'api-types';
import { FastifyReply } from 'fastify';
import { GoogleService } from '@/services/GoogleService';

@Controller('/auth')
export class AuthController {

  private readonly client: ClientGrpc;

  public constructor(@Inject('AUTH_PACKAGE') client: ClientGrpc) {
    this.client = client;
  }

  @Get('/google')
  public getGoogleOAuthUrl(): Observable<GoogleAuthUrlResponse> {
    const service = this.client.getService<GoogleService>('GoogleService');
    return service.getGoogleOAuthUrl({});
  }

  @Redirect()
  @Get('/google/callback')
  public async authWithGoogle(
    @Query('code') code: string,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<{ url: string }> {
    const service = this.client.getService<GoogleService>('GoogleService');
    const result = await firstValueFrom(service.authWithGoogle({
      code,
      userAgent,
      ipAddress,
    }));
    if (result.cookie) response.header('Set-Cookie', result.cookie);
    return { url: result.redirectUrl };
  }

}
