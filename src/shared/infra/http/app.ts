import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import { routes } from './routes';
import { AppError } from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import uploadConfig from '@config/upload';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);
app.use(errors());

app.use((error: Error, request: Request, response: Response) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'Error',
      message: error.message,
      data: error?.data,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error',
  });
});

export default app;
