export type Configuration = {
  gatewayUrl: string,
  publicFilerUrl: string,
  amqpUrl: string,
};

export const configuration = (): Configuration => ({
  gatewayUrl: process.env.GATEWAY_URL || 'http://localhost:3000',
  publicFilerUrl: process.env.PUBLIC_FILER_URL || 'http://localhost:8888',
  amqpUrl: process.env.AMQP_URL || '',
});
