import fs from 'node:fs';
import path from 'node:path';
import { env } from '../config/env';
import { logger } from '../utils/logger';

const sanitize = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9-_\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();

/**
 * Generate random alphanumeric suffix (4 characters)
 * Used to prevent folder collision when same customer submits multiple times
 */
const generateRandomSuffix = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const ensureDirectory = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    logger.info({ dirPath }, 'Created directory');
  }
};

export const buildCustomerDirectory = (timestamp: string, customerName: string, ic: string) => {
  const safeName = sanitize(customerName) || 'customer';
  const safeIc = ic.slice(-4);

  // Add time component (HHMMSS) to prevent collision on same day
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, ''); // HHMMSS format

  // Add random suffix for extra uniqueness
  const randomSuffix = generateRandomSuffix();

  // Format: YYYY-MM-DD-HHMMSS-name-ic-random
  const dirName = `${timestamp}-${timeStr}-${safeName}-${safeIc}-${randomSuffix}`.replace(/\s+/g, '-');
  const destination = path.resolve(env.outputDir, dirName);
  ensureDirectory(destination);
  return destination;
};

export const buildPublicUrl = (absolutePath: string) => {
  const relative = path.relative(env.outputDir, absolutePath);
  return `${env.publicBaseUrl}/${relative.replace(/\\/g, '/')}`;
};

export const writeBufferToFile = async (destination: string, filename: string, buffer: Buffer) => {
  ensureDirectory(destination);
  const absolutePath = path.resolve(destination, filename);
  await fs.promises.writeFile(absolutePath, buffer);
  const stat = await fs.promises.stat(absolutePath);
  return { absolutePath, sizeBytes: stat.size };
};

