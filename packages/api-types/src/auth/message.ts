export type AuthRequest = {
  session: string,
};

export type AuthResponse = {
  id: string,
  email: string,
  profileUrl: string,
};

export type LogoutRequest = {
  session: string,
};

export type GoogleAuthUrlResponse = {
  url: string,
};

export type GoogleAuthRequest = {
  code: string,
  ipAddress: string,
  userAgent: string,
};

export type GoogleAuthResponse = {
  cookieHeader: string,
};
