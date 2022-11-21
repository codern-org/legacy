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
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf((info) => {
          const timestamp = new Date().toUTCString();
          const context = info.context || __filename.split('/').at(-1);
          const message = `${timestamp} | ${info.level} | ${context} | ${info.message}`;
          return message;
        }),
      ),
    })
  ],
});
