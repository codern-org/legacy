export type Configuration = {
  gatewayUrl: string,
  amqpUrl: string,
};

export const configuration = (): Configuration => ({
  gatewayUrl: process.env.GATEWAY_URL || '',
  amqpUrl: process.env.AMQP_URL || '',
});
