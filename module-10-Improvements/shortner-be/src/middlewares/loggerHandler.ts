import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';


export const requestLogger = expressWinston.logger({
  // transports: [
  //   new winston.transports.Console({
  //     format: winston.format.simple()
  //   }),
  //   new winston.transports.File({
  //     filename: 'requests.log'
  //   }),
  // ],
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'requests-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: 14,
      zippedArchive: false
    })
  ],
  format: winston.format.json()
})

export const errorLogger = expressWinston.errorLogger({
  // transports: [
  //   new winston.transports.File({
  //     filename: 'errors.log'
  //   }),
  // ],
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'errors-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: 31,
      zippedArchive: true
    })
  ],
  format: winston.format.json()
})