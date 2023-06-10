import path from 'path'
import winston from 'winston'
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs/winston/success.log'),
      level: 'info',
    }),
    // new winston.transports.Console(),
  ],
})
const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs/winston/error.log'),
      level: 'error',
    }),
    // new winston.transports.Console(),
  ],
})
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}

export { errorLogger, logger }
