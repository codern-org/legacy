import {
  Controller, Get, Inject, Query, Redirect,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GoogleAuthResponse, GoogleAuthUrlResponse } from 'api-types';
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
  public authWithGoogle(@Query('code') code: string): Observable<GoogleAuthResponse> {
    const service = this.client.getService<GoogleService>('GoogleService');
    return service.authWithGoogle(code);
  }

}
