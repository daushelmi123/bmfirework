import axios, { AxiosError } from 'axios';
import { logger } from '../utils/logger';
import { config } from '../config/env';

interface WebhookPayload {
  // Customer information
  fullName: string;
  icNumber: string;
  occupation?: string;
  phone: string;
  countryCode?: string;

  // Address
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postcode?: string;
  state?: string;

  // Company information
  companyName?: string;
  companySsm?: string;

  // Business details
  businessLocation?: string;
  businessAddress1?: string;
  businessAddress2?: string;
  businessState?: string;

  // IPD information
  ipd?: string;
  ipdName?: string;
  ipdAddress?: string;
  ipdCity?: string;
  ipdState?: string;
  ipdOther?: string;

  // Fireworks details
  fireworksType?: string;
  supplierName?: string;
  supplierAddress1?: string;
  supplierAddress2?: string;
  appointmentLetterRef?: string;

  // Application metadata
  applicationDate?: string;
  festivalType?: string;
  templates?: string[];

  // PDF information
  pdfUrl: string;
  mergedPdfFilename: string;
  customerFolder: string;

  // Timestamps
  submittedAt: string;
}

class WebhookService {
  private webhookUrl: string;
  private enabled: boolean;
  private timeout: number;

  constructor() {
    this.webhookUrl = config.webhookUrl;
    this.enabled = config.webhookEnabled;
    this.timeout = config.webhookTimeoutMs;
  }

  /**
   * Send application data to webhook endpoint
   */
  async sendApplicationData(payload: WebhookPayload): Promise<void> {
    if (!this.enabled) {
      logger.info('Webhook disabled, skipping notification');
      return;
    }

    if (!this.webhookUrl) {
      logger.warn('Webhook URL not configured, skipping notification');
      return;
    }

    try {
      logger.info({
        url: this.maskWebhookUrl(this.webhookUrl),
        customer: payload.fullName,
      }, 'Sending data to webhook');

      const response = await axios.post(this.webhookUrl, payload, {
        timeout: this.timeout,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'GRK-PDF-Service/1.0',
        },
      });

      logger.info({
        status: response.status,
        customer: payload.fullName,
      }, 'Webhook notification successful');
    } catch (error) {
      // Log error but don't throw - webhook failure shouldn't block PDF generation
      if (error instanceof AxiosError) {
        logger.error({
          error: error.message,
          status: error.response?.status,
          data: error.response?.data,
          customer: payload.fullName,
        }, 'Webhook notification failed');
      } else {
        logger.error({
          error: error instanceof Error ? error.message : String(error),
          customer: payload.fullName,
        }, 'Webhook notification failed with unexpected error');
      }
    }
  }

  /**
   * Mask webhook URL for logging (show only domain)
   */
  private maskWebhookUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      return `${urlObj.protocol}//${urlObj.hostname}/***`;
    } catch {
      return '***';
    }
  }

  /**
   * Test webhook connectivity
   */
  async testWebhook(): Promise<boolean> {
    if (!this.enabled || !this.webhookUrl) {
      return false;
    }

    try {
      const testPayload = {
        test: true,
        message: 'GRK PDF Service webhook test',
        timestamp: new Date().toISOString(),
      };

      const response = await axios.post(this.webhookUrl, testPayload, {
        timeout: this.timeout,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'GRK-PDF-Service/1.0',
        },
      });

      logger.info({ status: response.status }, 'Webhook test successful');
      return response.status >= 200 && response.status < 300;
    } catch (error) {
      logger.error({
        error: error instanceof Error ? error.message : String(error),
      }, 'Webhook test failed');
      return false;
    }
  }
}

export default new WebhookService();
