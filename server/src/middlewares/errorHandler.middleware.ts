// src/middlewares/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';

export const errorHandler = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'An unexpected error occurred';
console.log(err instanceof CustomError, '>>>>');

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  console.error(`[Error] ${message}:`, err);

  res.status(statusCode).json({ message });
};
