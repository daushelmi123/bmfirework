import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { requestLogger } from './middleware/requestLogger';
import { apiKeyGuard } from './middleware/apiKeyGuard';
import { rateLimiter } from './middleware/rateLimiter';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { env } from './config/env';

export const createApp = () => {
  const app = express();

  app.disable('x-powered-by');

  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(express.json({ limit: `${env.maxUploadSizeMb}mb` }));
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);
  app.use(rateLimiter);

  app.get('/healthz', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api', apiKeyGuard, routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

