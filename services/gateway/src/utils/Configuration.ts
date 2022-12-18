export type Configuration = {
  port: number,
  serviceAuthUrl: string,
  serviceWorkspaceUrl: string,
  serviceGradingUrl: string,
  filerUrl: string,
  frontendLoginUrl: string,
  frontendHomeUrl: string,
};

export const configuration = (): Configuration => ({
  port: Number.parseInt(process.env.PORT || '3000', 10),
  serviceAuthUrl: process.env.SERVICE_AUTH_URL || 'localhost:3001',
  serviceWorkspaceUrl: process.env.SERVICE_WORKSPACE_URL || 'localhost:3002',
  serviceGradingUrl: process.env.SERVICE_GRADING_URL || 'localhost:3003',
  filerUrl: process.env.FILER_URL || 'http://localhost:8888',
  frontendLoginUrl: process.env.FRONTEND_LOGIN_URL || 'http://localhost:5555',
  frontendHomeUrl: process.env.FRONTEND_HOME_URL || 'http://localhost:5555/dashboard',
});
