import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import UserRoutes from './app/modules/user/user.route'
import globalErrorHandler from './middleWares/globalErrorHandler'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// application routes
app.use('/api/v1/users/', UserRoutes)

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  throw new Error('Error logger')
})

app.use(globalErrorHandler)

export default app
