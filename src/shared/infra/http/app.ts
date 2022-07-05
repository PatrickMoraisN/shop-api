import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import { routes } from './routes';
import { AppError } from '@shared/errors/AppError';
import '@shared/infra/typeorm';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        data: error?.data,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

export default app;
