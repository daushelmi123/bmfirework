import path from 'node:path';
import fs from 'node:fs';
import dotenv from 'dotenv';

const ENV_PATH = process.env.PDF_SERVICE_ENV || path.resolve(process.cwd(), '.env');

if (fs.existsSync(ENV_PATH)) {
  dotenv.config({ path: ENV_PATH });
} else {
  dotenv.config();
}

const required = (key: string, fallback?: string) => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const numeric = (key: string, fallback: number) => {
  const raw = process.env[key];
  if (!raw) return fallback;
  const parsed = Number(raw);
  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be numeric`);
  }
  return parsed;
};

const boolean = (key: string, fallback: boolean) => {
  const raw = process.env[key];
  if (!raw) return fallback;
  return raw.toLowerCase() === 'true' || raw === '1';
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: numeric('PORT', 4000),
  host: process.env.HOST ?? '0.0.0.0',
  apiKey: required('API_KEY', 'changeme'),
  templateDir: required('TEMPLATE_DIR', path.resolve(process.cwd(), 'pdf_templates')),
  outputDir: required('OUTPUT_DIR', path.resolve(process.cwd(), 'customers')),
  publicBaseUrl: required('PUBLIC_BASE_URL', 'https://grkfireworks.com/customers'),
  staticPrefix: process.env.STATIC_PREFIX ?? '/customers',
  logLevel: process.env.LOG_LEVEL ?? 'info',
  maxUploadSizeMb: numeric('MAX_UPLOAD_SIZE_MB', 15),

  // Webhook configuration
  webhookUrl: process.env.WEBHOOK_URL ?? '',
  webhookEnabled: boolean('WEBHOOK_ENABLED', false),
  webhookTimeoutMs: numeric('WEBHOOK_TIMEOUT_MS', 5000),

  // Cleanup configuration
  autoCleanupEnabled: boolean('AUTO_CLEANUP_ENABLED', true),
  cleanupAfterResponse: boolean('CLEANUP_AFTER_RESPONSE', true),
  cleanupRetentionMinutes: numeric('CLEANUP_RETENTION_MINUTES', 15),
  cleanupCheckIntervalMs: numeric('CLEANUP_CHECK_INTERVAL_MS', 60000),
};

export const isProduction = env.nodeEnv === 'production';

// Export as named config for convenience
export const config = env;

