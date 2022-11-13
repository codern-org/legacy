import { Observable } from 'rxjs';
import {
  AuthRequest, AuthUserRequest, AuthUserResponse, GoogleAuthRequest,
  GoogleAuthResponse, GoogleAuthUrlResponse, LogoutRequest,
} from 'api-types';

export interface AuthService {

  authenticate(data: AuthRequest): Observable<void>;

  logout(data: LogoutRequest): Observable<void>;

  getUserFromSession(data: AuthUserRequest): Observable<AuthUserResponse>;

  getGoogleOAuthUrl(any: unknown): Observable<GoogleAuthUrlResponse>;

  loginWithGoogle(data: GoogleAuthRequest): Observable<GoogleAuthResponse>;

}
