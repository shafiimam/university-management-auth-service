import cors from 'cors';
import express, { Application } from 'express';
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

export default app;
