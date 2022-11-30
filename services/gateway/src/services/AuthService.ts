import { Observable } from 'rxjs';
import {
  AuthRequest, AuthResponse, GetUserByIdsRequest,
  GetUserByIdsResponse, GoogleAuthRequest, GoogleAuthResponse,
  GoogleAuthUrlResponse, LogoutRequest,
} from '@codern-api/internal';

export interface AuthService {

  authenticate(data: AuthRequest): Observable<AuthResponse>;

  logout(data: LogoutRequest): Observable<void>;

  getGoogleOAuthUrl(any: unknown): Observable<GoogleAuthUrlResponse>;

  loginWithGoogle(data: GoogleAuthRequest): Observable<GoogleAuthResponse>;

  getUserByIds(data: GetUserByIdsRequest): Observable<GetUserByIdsResponse>;

}
