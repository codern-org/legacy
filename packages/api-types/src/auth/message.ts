export type GoogleAuthUrlResponse = {
  url: string,
};

export type GoogleAuthRequest = {
  code: string,
};

export type GoogleAuthResponse = {
  success: boolean,
  redirectUrl: string,
};
