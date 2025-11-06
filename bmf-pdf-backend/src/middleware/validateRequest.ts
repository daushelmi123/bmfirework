import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
import { HttpError } from '../utils/httpError';

export const validateRequest = <T>(schema: ZodSchema<T>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
      const formatted = parseResult.error.format();
      throw new HttpError(422, 'Validation failed', formatted);
    }
    req.body = parseResult.data;
    next();
  };
};

