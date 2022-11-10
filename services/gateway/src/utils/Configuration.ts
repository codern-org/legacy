export type Configuration = {
  port: number,
  serviceAuthPort: number,
};

export const configuration = (): Configuration => ({
  port: Number.parseInt(process.env.PORT || '3000', 10),
  serviceAuthPort: Number.parseInt(process.env.SERVICE_AUTH_PORT || '3001', 10),
});
