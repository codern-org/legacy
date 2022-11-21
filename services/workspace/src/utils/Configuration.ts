export type Configuration = {
  gatewayUrl: string,
};

export const configuration = (): Configuration => ({
  gatewayUrl: process.env.GATEWAY_URL || '',
});
