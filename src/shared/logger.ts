import path from 'path'
import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, label, printf, prettyPrint } = format

//custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(
    label({
      label: 'user-service',
    }),
    timestamp(),
    prettyPrint(),
    myFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs/successes/user-service-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
    }),
    // new winston.transports.Console(),
  ],
})
const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({
      label: 'user-service',
    }),
    timestamp(),
    prettyPrint(),
    myFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs/errors/user-service-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    }),
  ],
})
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console())
  errorLogger.add(new transports.Console())
}

export { errorLogger, logger }

