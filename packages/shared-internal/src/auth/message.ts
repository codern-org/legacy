import { Owner, User } from './entity';

export type AuthRequest = {
  session: string,
};

export type AuthResponse = {
  user: User,
};

export type LoginRequest = {
  email: string,
  password: string,
  ipAddress: string,
  userAgent: string,
};

export type LoginResponse = {
  cookieHeader: string,
};

export type LogoutRequest = {
  session: string,
};

export type LogoutResponse = {
  cookieHeader: string,
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

export type GetOwnerDetailRequest = {
  ownerId: string,
};

export type GetOwnerDetailResponse = {
  owner: Owner,
};
