export type Configuration = {
  port: number,
  gatewayUrl: string,
  sessionSecret: string,
  googleApp: {
    clientId: string,
    secret: string,
  },
};

export const configuration = (): Configuration => ({
  port: Number.parseInt(process.env.PORT || '3001', 10),
  gatewayUrl: process.env.GATEWAY_URL || '',
  sessionSecret: process.env.SESSION_SECRET || 'secret',
  googleApp: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    secret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
});
