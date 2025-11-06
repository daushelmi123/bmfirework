import type { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { processPdfOrder } from '../services/pdfOrderService';
import type { PdfOrderPayload } from '../validation/pdfOrderSchema';
import { sanitizePhone } from '../validation/pdfOrderSchema';

interface PdfOrderResponse {
  status: 'success';
  customer: string;
  ic: string;
  phone: string;
  requestId: string;
  files: Array<{
    name: string;
    url: string;
    sizeBytes: number;
  }>;
  destinationDir: string;
}

export const createPdfOrder = async (req: Request, res: Response<PdfOrderResponse>) => {
  const payload = req.body as PdfOrderPayload;
  const requestId = (req.headers['x-request-id'] as string | undefined) ?? uuid();

  const result = await processPdfOrder(payload, requestId);

  const phone = sanitizePhone(payload.countryCode, payload.phone);

  return res.status(201).json({
    status: 'success',
    customer: result.customerName,
    ic: result.customerIc,
    phone,
    requestId: result.requestId,
    destinationDir: result.destinationDir,
    files: result.generatedFiles.map((file) => ({
      name: file.filename,
      url: file.publicUrl,
      sizeBytes: file.sizeBytes,
    })),
  });
};

