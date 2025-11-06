import http from 'node:http';
import { createApp } from './app';
import { env } from './config/env';
import { logger } from './utils/logger';
import { cleanupService } from './services/cleanupService';

const app = createApp();

const server = http.createServer(app);

server.listen(env.port, env.host, () => {
  logger.info({ port: env.port, host: env.host }, 'PDF service listening');

  // Start cleanup service after server is listening
  cleanupService.start();
});

const shutdown = (signal: NodeJS.Signals) => {
  logger.warn({ signal }, 'Shutting down PDF service');

  // Stop cleanup service before closing server
  cleanupService.stop();

  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

