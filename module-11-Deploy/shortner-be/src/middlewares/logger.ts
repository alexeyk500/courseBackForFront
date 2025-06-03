import expressWinston from 'express-winston';
import winston from 'winston';
import 'winston-daily-rotate-file';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'request-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      maxFiles: 14,
      zippedArchive: true
    })
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH'
    })
  ],
  format: winston.format.json(),
});
