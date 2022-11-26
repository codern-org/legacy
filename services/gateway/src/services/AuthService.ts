import { Observable } from 'rxjs';
import {
  AuthRequest, AuthResponse, GoogleAuthRequest,
  GoogleAuthResponse, GoogleAuthUrlResponse, LogoutRequest,
} from 'api-types';

export interface AuthService {

  authenticate(data: AuthRequest): Observable<AuthResponse>;

  logout(data: LogoutRequest): Observable<void>;

  getGoogleOAuthUrl(any: unknown): Observable<GoogleAuthUrlResponse>;

  loginWithGoogle(data: GoogleAuthRequest): Observable<GoogleAuthResponse>;

}
