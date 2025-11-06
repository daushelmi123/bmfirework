import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { isHttpError } from '../utils/httpError';

interface ErrorResponse {
  status: 'error';
  message: string;
  details?: unknown;
  requestId?: string;
}

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction,
) => {
  const requestId = req.headers['x-request-id'] as string | undefined;
  let statusCode = 500;
  let message = 'Internal Server Error';
  let details: unknown;

  if (isHttpError(error)) {
    statusCode = error.statusCode;
    message = error.message;
    details = error.details;
  } else if (error instanceof Error) {
    message = error.message;
  }

  logger.error({ err: error, path: req.path, requestId }, 'Request failed');

  res.status(statusCode).json({
    status: 'error',
    message,
    details,
    requestId,
  });
};

export const notFoundHandler = (req: Request, res: Response<ErrorResponse>) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.path} not found`,
  });
};

