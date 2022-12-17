import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AuthRequest, GoogleAuthRequest, GoogleAuthResponse,
  GoogleAuthUrlResponse, LogoutRequest, AuthResponse,
  GetUserByIdsRequest, GetUserByIdsResponse, GetOwnerDetailRequest,
  GetOwnerDetailResponse, LoginRequest, LoginResponse,
} from '@codern/internal';
import { GoogleService } from '@/services/GoogleService';
import { AuthService } from '@/services/AuthService';
import { UserService } from '@/services/UserService';

@Controller('/auth')
export class AuthController {

  private readonly authService: AuthService;
  private readonly googleService: GoogleService;
  private readonly userService: UserService;

  public constructor(
    authService: AuthService,
    googleService: GoogleService,
    userSerive: UserService,
  ) {
    this.authService = authService;
    this.googleService = googleService;
    this.userService = userSerive;
  }

  @GrpcMethod('AuthService')
  public async authenticate(data: AuthRequest): Promise<AuthResponse> {
    const user = await this.authService.authenticateOrThrow(data.session);
    return { user };
  }

  @GrpcMethod('AuthService')
  public async login(data: LoginRequest): Promise<LoginResponse> {
    const cookieHeader = await this.authService.loginOrThrow(data);
    return { cookieHeader };
  }

  @GrpcMethod('AuthService')
  public async logout(data: LogoutRequest): Promise<void> {
    return this.authService.logoutOrThrow(data.session);
  }

  @GrpcMethod('AuthService')
  public getGoogleOAuthUrl(): GoogleAuthUrlResponse {
    return { url: this.googleService.getOAuthUrl() };
  }

  @GrpcMethod('AuthService')
  public async loginWithGoogle(data: GoogleAuthRequest): Promise<GoogleAuthResponse> {
    const cookieHeader = await this.authService.loginWithGoogleOrThrow(data);
    return { cookieHeader };
  }

  @GrpcMethod('AuthService')
  public async getUserByIds(
    data: GetUserByIdsRequest,
  ): Promise<GetUserByIdsResponse> {
    const users = await this.userService.getUserByIds(data.userIds);
    return { users };
  }

  @GrpcMethod('AuthService')
  public async getOwnerDetail(data: GetOwnerDetailRequest): Promise<GetOwnerDetailResponse> {
    const owner = await this.authService.getOwnerDetailOrThrow(data.ownerId);
    return { owner };
  }

}
