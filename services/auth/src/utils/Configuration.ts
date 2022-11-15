export type Configuration = {
  gatewayUrl: string,
  sessionSecret: string,
  googleApp: {
    clientId: string,
    secret: string,
  },
};

export const configuration = (): Configuration => ({
  gatewayUrl: process.env.GATEWAY_URL || '',
  sessionSecret: process.env.SESSION_SECRET || 'secret',
  googleApp: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    secret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
});
