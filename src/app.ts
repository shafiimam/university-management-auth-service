import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './middleWares/globalErrorHandler';
import appRoutes from './routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// application routes
app.use('/api/v1', appRoutes);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Error logger');
// });

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.url,
        message: 'API not Found',
      },
    ],
  });
  next();
});

// generateFacultyId().then(data => console.log('test id ', data));
export default app;
