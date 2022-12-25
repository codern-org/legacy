import { Observable } from 'rxjs';
import {
  AuthRequest, AuthResponse, GetOwnerDetailRequest,
  GetOwnerDetailResponse, GetUserByIdsRequest, GetUserByIdsResponse,
  GoogleAuthRequest, GoogleAuthResponse, GoogleAuthUrlResponse,
  LoginRequest, LoginResponse, LogoutRequest, LogoutResponse,
} from '@codern/internal';

export interface AuthService {

  authenticate(data: AuthRequest): Observable<AuthResponse>;

  login(data: LoginRequest): Observable<LoginResponse>;

  logout(data: LogoutRequest): Observable<LogoutResponse>;

  getGoogleOAuthUrl(any: unknown): Observable<GoogleAuthUrlResponse>;

  loginWithGoogle(data: GoogleAuthRequest): Observable<GoogleAuthResponse>;

  getUserByIds(data: GetUserByIdsRequest): Observable<GetUserByIdsResponse>;

  getOwnerDetail(data: GetOwnerDetailRequest): Observable<GetOwnerDetailResponse>;

}
