import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

// Simple in-memory rate limiter for cluster mode
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute per IP

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export const rateLimiter = (req: Request, res: Response, next: NextFunction): void => {
  // Get client IP (handle proxy headers from Cloudflare/Apache)
  const ip =
    (req.headers['cf-connecting-ip'] as string) ||
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.ip ||
    'unknown';

  const now = Date.now();
  const key = `rate_limit:${ip}`;

  // Initialize or reset if window expired
  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 0,
      resetTime: now + WINDOW_MS,
    };
  }

  store[key].count += 1;

  // Set rate limit headers
  const remaining = Math.max(0, MAX_REQUESTS - store[key].count);
  const resetTime = Math.ceil((store[key].resetTime - now) / 1000);

  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS.toString());
  res.setHeader('X-RateLimit-Remaining', remaining.toString());
  res.setHeader('X-RateLimit-Reset', resetTime.toString());

  // Check if rate limit exceeded
  if (store[key].count > MAX_REQUESTS) {
    logger.warn({ ip, count: store[key].count }, 'Rate limit exceeded');
    res.status(429).json({
      status: 'error',
      message: 'Too many requests. Please try again later.',
      retryAfter: resetTime,
    });
    return;
  }

  next();
};
