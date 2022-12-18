export type Configuration = {
  port: number,
  serviceAuthPort: number,
  serviceWorkspacePort: number,
  serviceGradingPort: number,
  filerUrl: string,
  frontendLoginUrl: string,
  frontendHomeUrl: string,
};

export const configuration = (): Configuration => ({
  port: Number.parseInt(process.env.PORT || '3000', 10),
  serviceAuthPort: Number.parseInt(process.env.SERVICE_AUTH_PORT || '3001', 10),
  serviceWorkspacePort: Number.parseInt(process.env.SERVICE_WORKSPACE_PORT || '3002', 10),
  serviceGradingPort: Number.parseInt(process.env.SERVICE_GRADING_PORT || '3003', 10),
  filerUrl: process.env.FILER_URL || '',
  frontendLoginUrl: process.env.FRONTEND_LOGIN_URL || '',
  frontendHomeUrl: process.env.FRONTEND_HOME_URL || '',
});
