export type AuthRequest = {
  session: string,
};

export type LogoutRequest = {
  session: string,
};

export type AuthUserRequest = {
  session: string,
};

export type AuthUserResponse = {
  id: string,
  email: string,
  profileUrl: string,
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
