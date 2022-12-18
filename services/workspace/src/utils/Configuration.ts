export type Configuration = {
  gatewayUrl: string,
};

export const configuration = (): Configuration => ({
  gatewayUrl: process.env.GATEWAY_URL || 'http://localhost:3000',
});
