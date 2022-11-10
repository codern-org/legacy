import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import querystring from 'querystring';
import { catchError, firstValueFrom, OperatorFunction } from 'rxjs';

type GoogleApiError = {
  error: string,
  error_description: string,
};

type GoogleToken = {
  access_token: string,
  id_token: string,
};

export type GoogleUser = {
  id: string,
  email: string,
  verified_email: string,
  name: string,
  given_name: string,
  family_name: string,
  picture: string,
  locale: string,
};

@Injectable()
export class GoogleService {

  private readonly logger: Logger;
  private readonly httpService: HttpService;
  private readonly configService: ConfigService;

  public constructor(
    logger: Logger,
    httpService: HttpService,
    configService: ConfigService,
  ) {
    this.logger = logger;
    this.httpService = httpService;
    this.configService = configService;
  }

  public getOAuthUrl(): string {
    const apiUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = this.configService.get('googleApp.clientId');
    const gatewayUrl = this.configService.get('gatewayUrl');

    const options = {
      redirect_uri: `${gatewayUrl}/auth/google/callback`,
      client_id: clientId,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };

    return `${apiUrl}?${querystring.stringify(options)}`;
  }

  public async getToken(code: string): Promise<GoogleToken> {
    const apiUrl = 'https://oauth2.googleapis.com/token';
    const clientId = this.configService.get('googleApp.clientId');
    const clientSecret = this.configService.get('googleApp.secret');
    const gatewayUrl = this.configService.get('gatewayUrl');

    const body = querystring.stringify({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: `${gatewayUrl}/auth/google/callback`,
      grant_type: 'authorization_code',
    });

    const { data } = await firstValueFrom(
      this.httpService
        .post(apiUrl, body)
        .pipe(this.handleError('getToken', 'Cannot retrieve auth token from Google API')),
    );
    return data;
  }

  public async getGoogleUser(token: GoogleToken): Promise<GoogleUser> {
    const query = querystring.stringify({
      alt: 'json',
      access_token: token.access_token,
    });
    const apiUrl = `https://www.googleapis.com/oauth2/v1/userinfo?${query}`;

    const { data } = await firstValueFrom(
      this.httpService
        .get(apiUrl, { headers: { Authorization: `Bearer ${token.id_token}` } })
        .pipe(this.handleError('getGoogleUser', 'Cannot retrieve auth user from Google API')),
    );
    return data;
  }

  private getErrorMessage(scope: string, error: AxiosError): string {
    let errorMessage = `${scope}:`;
    if (error.response && error.response.data) {
      errorMessage += (error.response.data as GoogleApiError).error_description;
    } else {
      errorMessage += error.message;
    }
    return errorMessage;
  }

  private handleError(
    caller: string,
    throwMessage: string,
  ): OperatorFunction<AxiosResponse<unknown, unknown>, AxiosResponse> {
    return catchError((error: AxiosError) => {
      const errorMessage = this.getErrorMessage(caller, error);
      this.logger.error(errorMessage, error, 'GoogleSerivce');
      throw new Error(throwMessage);
    });
  }

}
