import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

let server: Server

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})
async function bootstrap() {
  try {
    await mongoose.connect(config.db_url as string)
    logger.info('🎞️ Database connected successfully')
    server = app.listen(config.port, () => {
      logger.info(`Application is listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect database', error)
  }

  process.on('unhandledRejection', error => {
    errorLogger.error(error)
    if (server) {
      server.close(err => {
        errorLogger.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', async () => {
  logger.info('🔥 SIGTERM recieved, Shutting down server...')
  await mongoose.connection.close()
  if (server) {
    server.close()
  }
})
