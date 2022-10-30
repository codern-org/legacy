import path from 'path';
import { createLogger, format, transports } from 'winston';

const baseLogPath = path.resolve(process.cwd(), 'logs');

export const Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    new transports.File({ filename: path.resolve(baseLogPath, 'error.log'), level: 'error' }),
    new transports.File({ filename: path.resolve(baseLogPath, 'system.log') }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  Logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.printf((info) => {
        const timestamp = new Date().toUTCString();
        const fileName = __filename.split('/').at(-1);
        const message = `${timestamp} | ${info.level} | ${fileName} | ${info.message}`;
        return message;
      }),
    ),
  }));
}
