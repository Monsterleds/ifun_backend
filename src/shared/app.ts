import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import './container/index';
import cors from 'cors';

import rateLimiter from './infra/http/middlewares/rateLimiter';
import routes from './infra/http/routes';
import AppError from './errors/AppError';
import uploadConfig from '@config/upload';

import './infra/typeorm/index';

const app = express();

app.use(rateLimiter);
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({ 
      status: 'error', 
      message: err.message
    });
  }

  console.error(err);

  return response.status(500).json({ 
    status: 'error', 
    message: 'Internal Server Error'
  });
});

export default app;