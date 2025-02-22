export type Configuration = {
  gatewayUrl: string,
  publicFileUrl: string,
  filerUrl: string,
  sessionSecret: string,
  googleApp: {
    clientId: string,
    secret: string,
  },
};

export const configuration = (): Configuration => ({
  gatewayUrl: process.env.GATEWAY_URL || 'http://localhost:3000',
  publicFileUrl: process.env.PUBLIC_FILE_URL || 'http://localhost:3000/file',
  filerUrl: process.env.FILER_URL || 'http://localhost:8888',
  sessionSecret: process.env.SESSION_SECRET || 'secret',
  googleApp: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    secret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
});
