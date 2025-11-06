import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime.bigint();
  const requestId = req.headers['x-request-id'];

  res.on('finish', () => {
    const duration = Number(process.hrtime.bigint() - start) / 1_000_000;
    logger.info(
      {
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        durationMs: duration.toFixed(2),
        requestId,
      },
      'Request completed',
    );
  });

  next();
};

