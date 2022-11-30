import { User } from './entity';

export type AuthRequest = {
  session: string,
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

export type GetUserByIdsRequest = {
  userIds: string[],
};

export type GetUserByIdsResponse = {
  users: User[],
};
