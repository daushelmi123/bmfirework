import path from 'node:path';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import { resolveTemplates } from './pdfTemplateService';
import { generatePdfFromTemplate } from './pdfGenerationService';
import { buildCustomerDirectory } from './storageService';
import { mergePdfFiles, cleanupIndividualPdfs } from './pdfMergeService';
import webhookService from './webhookService';
import type { PdfGenerationResult } from '../types/pdf';
import type { PdfOrderPayload } from '../validation/pdfOrderSchema';
import { sanitizePhone } from '../validation/pdfOrderSchema';

/**
 * Enrich payload with computed and fixed values for permohonan-ipd template
 */
const enrichPayload = (payload: PdfOrderPayload): PdfOrderPayload => {
  // Create combined fields
  const cityPostcode = payload.city && payload.postcode
    ? `${payload.city}, ${payload.postcode}`
    : '';

  const businessLocationState = payload.businessLocation && payload.businessState
    ? `${payload.businessLocation}, ${payload.businessState.toUpperCase()}`
    : '';

  // Fixed values for supplier (GRK Pyrotechnics)
  const supplierName = 'GRK PYROTECHNICS SDN BHD';
  const supplierAddress1 = '10, Jalan Pelepas 4/2';
  const supplierAddress2 = '81550 Gelang Patah, Johor';

  // Fixed value for fireworks type
  const fireworksType = 'SENARAI SEPERTI DI LAMPIRAN "A"';

  // Format appointment letter ref as DD/MM/YYYY from applicationDate
  let appointmentLetterRef = '';
  if (payload.applicationDate) {
    const date = new Date(payload.applicationDate);
    if (!Number.isNaN(date.getTime())) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      appointmentLetterRef = `${day}/${month}/${year}`;
    }
  }

  return {
    ...payload,
    cityPostcode,
    businessLocationState,
    supplierName,
    supplierAddress1,
    supplierAddress2,
    fireworksType,
    appointmentLetterRef,
  };
};

export const processPdfOrder = async (
  payload: PdfOrderPayload,
  requestId: string,
): Promise<PdfGenerationResult> => {
  // Enrich payload with computed and fixed values
  const enrichedPayload = enrichPayload(payload);

  const timestamp = new Date().toISOString().split('T')[0];
  const destinationDir = buildCustomerDirectory(timestamp, payload.fullName, payload.icNumber);
  const templates = resolveTemplates(payload.templates);

  logger.info(
    {
      requestId,
      customer: payload.fullName,
      templates: templates.map((template) => template.id),
      destinationDir,
    },
    'Processing PDF order',
  );

  const generatedFiles = [];

  for (const template of templates) {
    const result = await generatePdfFromTemplate(template, enrichedPayload, destinationDir);
    generatedFiles.push(result);
  }

  // Auto-merge PDFs if multiple templates were generated
  let finalFiles = generatedFiles;
  if (generatedFiles.length > 1) {
    logger.info({ fileCount: generatedFiles.length }, 'Multiple PDFs generated, merging...');

    const mergedPdf = await mergePdfFiles(
      generatedFiles,
      destinationDir,
    );

    // Clean up individual PDFs after successful merge
    await cleanupIndividualPdfs(generatedFiles);

    // Return only the merged PDF
    finalFiles = [mergedPdf];

    logger.info({
      mergedFile: mergedPdf.filename,
      sizeBytes: mergedPdf.sizeBytes
    }, 'PDFs merged successfully');
  }

  const resolvedPhone = sanitizePhone(payload.countryCode, payload.phone);

  const summary: PdfGenerationResult = {
    requestId,
    customerName: payload.fullName,
    customerIc: payload.icNumber,
    destinationDir: path.relative(env.outputDir, destinationDir),
    generatedFiles: finalFiles,
  };

  logger.info(
    {
      requestId,
      customer: payload.fullName,
      phone: resolvedPhone,
      generatedCount: finalFiles.length,
      merged: generatedFiles.length > 1,
    },
    'PDF order completed',
  );

  // Send webhook notification (non-blocking)
  const mergedPdfUrl = finalFiles.length > 0 ? finalFiles[0].publicUrl : '';
  const mergedPdfFilename = finalFiles.length > 0 ? finalFiles[0].filename : '';

  webhookService.sendApplicationData({
    // Customer information
    fullName: payload.fullName,
    icNumber: payload.icNumber,
    occupation: payload.occupation,
    phone: resolvedPhone,
    countryCode: payload.countryCode,

    // Address
    addressLine1: payload.addressLine1,
    addressLine2: payload.addressLine2,
    city: payload.city,
    postcode: payload.postcode,
    state: payload.state,

    // Company information
    companyName: payload.companyName,
    companySsm: payload.companySsm,

    // Business details
    businessLocation: payload.businessLocation,
    businessAddress1: payload.businessAddress1,
    businessAddress2: payload.businessAddress2,
    businessState: payload.businessState,

    // IPD information
    ipd: payload.ipd,
    ipdName: payload.ipdName,
    ipdAddress: payload.ipdAddress,
    ipdCity: payload.ipdCity,
    ipdState: payload.ipdState,
    ipdOther: payload.ipdOther,

    // Fireworks details
    fireworksType: enrichedPayload.fireworksType,
    supplierName: enrichedPayload.supplierName,
    supplierAddress1: enrichedPayload.supplierAddress1,
    supplierAddress2: enrichedPayload.supplierAddress2,
    appointmentLetterRef: enrichedPayload.appointmentLetterRef,

    // Application metadata
    applicationDate: payload.applicationDate,
    festivalType: payload.festivalType,
    templates: payload.templates,

    // PDF information
    pdfUrl: mergedPdfUrl,
    mergedPdfFilename: mergedPdfFilename,
    customerFolder: summary.destinationDir,

    // Timestamps
    submittedAt: new Date().toISOString(),
  }).catch((error) => {
    // Log but don't fail the request if webhook fails
    logger.error({ error, requestId }, 'Failed to send webhook notification');
  });

  return summary;
};

