import { resolve } from 'path';
import winston from 'winston';

export class LoggerFactory {
  static createWinstonLogger() {
    const logPath = resolve(__dirname, '..', 'logs');
    const timestamp = new Date().toISOString();
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'automation-cli' },
      transports: [
        new winston.transports.File({
          dirname: logPath,
          filename: `errors-${timestamp}.log`,
          level: 'error',
        }),
        new winston.transports.File({
          dirname: logPath,
          filename: `all-${timestamp}.log`,
        }),
      ],
    });

    return logger;
  }
}
