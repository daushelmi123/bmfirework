import fs from 'node:fs';
import path from 'node:path';
import { env } from '../config/env';
import { logger } from '../utils/logger';

/**
 * Cleanup service to automatically delete old PDF folders
 * Runs periodically to maintain storage and comply with data retention policies
 */
class CleanupService {
  private intervalId: NodeJS.Timeout | null = null;
  private retentionMinutes: number;
  private checkIntervalMs: number;

  constructor() {
    // Default: 15 minutes retention
    this.retentionMinutes = env.cleanupRetentionMinutes ?? 15;
    // Check every 1 minute
    this.checkIntervalMs = env.cleanupCheckIntervalMs ?? 60000;
  }

  /**
   * Start the cleanup service
   */
  start() {
    if (!env.autoCleanupEnabled) {
      logger.info('Auto-cleanup is disabled');
      return;
    }

    logger.info({
      retentionMinutes: this.retentionMinutes,
      checkIntervalMs: this.checkIntervalMs,
      outputDir: env.outputDir
    }, 'Starting cleanup service');

    // Run cleanup immediately on start
    this.cleanup().catch((error) => {
      logger.error({ error }, 'Initial cleanup failed');
    });

    // Schedule periodic cleanup
    this.intervalId = setInterval(() => {
      this.cleanup().catch((error) => {
        logger.error({ error }, 'Scheduled cleanup failed');
      });
    }, this.checkIntervalMs);
  }

  /**
   * Stop the cleanup service
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      logger.info('Cleanup service stopped');
    }
  }

  /**
   * Perform cleanup of old PDF folders
   */
  private async cleanup(): Promise<void> {
    try {
      const outputDir = env.outputDir;

      if (!fs.existsSync(outputDir)) {
        logger.warn({ outputDir }, 'Output directory does not exist');
        return;
      }

      const folders = await fs.promises.readdir(outputDir);
      const now = Date.now();
      const retentionMs = this.retentionMinutes * 60 * 1000;

      let deletedCount = 0;
      let skippedCount = 0;

      for (const folder of folders) {
        const folderPath = path.join(outputDir, folder);

        try {
          const stats = await fs.promises.stat(folderPath);

          // Skip if not a directory
          if (!stats.isDirectory()) {
            continue;
          }

          // Check folder age
          const ageMs = now - stats.mtimeMs;

          if (ageMs > retentionMs) {
            // Delete old folder
            await fs.promises.rm(folderPath, { recursive: true, force: true });
            deletedCount++;

            logger.info({
              folder,
              ageMinutes: Math.floor(ageMs / 60000),
              retentionMinutes: this.retentionMinutes
            }, 'Deleted old PDF folder');
          } else {
            skippedCount++;
          }
        } catch (error) {
          logger.error({ folder, error }, 'Failed to process folder during cleanup');
        }
      }

      if (deletedCount > 0 || skippedCount > 0) {
        logger.info({
          deleted: deletedCount,
          kept: skippedCount,
          total: folders.length
        }, 'Cleanup cycle completed');
      }
    } catch (error) {
      logger.error({ error }, 'Cleanup operation failed');
      throw error;
    }
  }
}

// Export singleton instance
export const cleanupService = new CleanupService();
