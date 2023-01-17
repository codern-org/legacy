export type Configuration = {
  gatewayUrl: string,
  publicFileUrl: string,
};

export const configuration = (): Configuration => ({
  gatewayUrl: process.env.GATEWAY_URL || 'http://localhost:3000',
  publicFileUrl: process.env.PUBLIC_FILE_URL || 'http://localhost:3000/file',
});
