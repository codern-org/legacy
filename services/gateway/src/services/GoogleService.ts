import { GoogleAuthResponse, GoogleAuthUrlResponse } from 'api-types';
import { Observable } from 'rxjs';

export interface GoogleService {

  getGoogleOAuthUrl(any: unknown): Observable<GoogleAuthUrlResponse>;

  authWithGoogle(code: string): Observable<GoogleAuthResponse>;

}
