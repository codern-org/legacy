export type AuthRequest = {
  session: string,
};

export type User = {
  id: string,
  email: string,
  profileUrl: string,
};

export type AuthResponse = {
  user: User,
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
