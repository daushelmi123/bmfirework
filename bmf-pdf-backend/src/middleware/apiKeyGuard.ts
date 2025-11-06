import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import { HttpError } from '../utils/httpError';

export const apiKeyGuard = (req: Request, _res: Response, next: NextFunction) => {
  const headerKey = req.headers['x-api-key'];

  if (!headerKey || Array.isArray(headerKey) || headerKey !== env.apiKey) {
    throw new HttpError(401, 'Unauthorized');
  }

  next();
};

