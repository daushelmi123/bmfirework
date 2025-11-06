/**
 * PDF Overlay Service - Alternative to form filling
 *
 * Use this when your PDF doesn't have form fields.
 * This overlays text at specific X,Y coordinates.
 */

import fs from 'node:fs';
import path from 'node:path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import type { PdfTemplateConfig, GeneratedPdfFile } from '../types/pdf';
import type { PdfOrderPayload } from '../validation/pdfOrderSchema';
import { HttpError } from '../utils/httpError';
import { buildPublicUrl, writeBufferToFile } from './storageService';

// Coordinate mappings for text overlay
// Adjust these based on your PDF layout
const COORDINATE_MAPS: Record<string, Array<{
  text: string;
  x: number;
  y: number;
  size?: number;
  font?: 'normal' | 'bold';
  page?: number;
}>> = {
  'permit-ipd': [
    // Example coordinates - NEED TO ADJUST based on your actual PDF
    // Page 1 (0-indexed)
    { text: 'customer_name', x: 150, y: 700, size: 12, page: 0 },
    { text: 'customer_ic', x: 150, y: 680, size: 10, page: 0 },
    { text: 'customer_address', x: 150, y: 660, size: 10, page: 0 },
    { text: 'customer_postcode', x: 150, y: 640, size: 10, page: 0 },
    { text: 'application_date', x: 150, y: 620, size: 10, page: 0 },
    // Add more fields as needed...
  ],
};

const formatValue = (
  value: unknown,
  transform?: 'uppercase' | 'lowercase' | 'titlecase' | 'date-iso' | 'date-display',
) => {
  if (value == null) return '';
  const str = String(value);

  switch (transform) {
    case 'uppercase':
      return str.toUpperCase();
    case 'lowercase':
      return str.toLowerCase();
    case 'titlecase':
      return str
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
    case 'date-display': {
      const date = new Date(str);
      if (Number.isNaN(date.getTime())) return str;
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    }
    case 'date-iso': {
      const date = new Date(str);
      if (Number.isNaN(date.getTime())) return str;
      return date.toISOString().split('T')[0];
    }
    default:
      return str;
  }
};

const buildOutputFilename = (template: PdfTemplateConfig, payload: PdfOrderPayload) => {
  const base = template.outputFilenameTemplate || `${template.id}.pdf`;
  const tokens: Record<string, string> = {
    customer_name: payload.fullName.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-'),
    ic_last4: payload.icNumber.slice(-4),
    date: payload.applicationDate,
  };

  return base.replace(/{{(\w+)}}/g, (_match, key) => tokens[key] ?? key).replace(/--+/g, '-');
};

/**
 * Generate PDF by overlaying text on template (no form fields needed)
 */
export const generatePdfWithOverlay = async (
  template: PdfTemplateConfig,
  payload: PdfOrderPayload,
  destinationDir: string,
): Promise<GeneratedPdfFile> => {
  const templatePath = path.resolve(env.templateDir, template.file);

  if (!fs.existsSync(templatePath)) {
    throw new HttpError(500, `Template file not found: ${templatePath}`);
  }

  const buffer = await fs.promises.readFile(templatePath);
  const pdfDoc = await PDFDocument.load(buffer);

  // Get fonts
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Get coordinate map for this template
  const coordinates = COORDINATE_MAPS[template.id] || [];

  if (coordinates.length === 0) {
    logger.warn({ templateId: template.id }, 'No coordinate map found for template');
  }

  // Apply text overlays
  for (const coord of coordinates) {
    const page = pdfDoc.getPages()[coord.page || 0];
    if (!page) continue;

    // Map field name to payload value
    const field = template.fields.find((f) => f.templateField === coord.text);
    if (!field) continue;

    const value = (payload as Record<string, unknown>)[field.payloadField];
    if (value == null) continue;

    const formatted = formatValue(value, field.transform);
    const font = coord.font === 'bold' ? helveticaBold : helvetica;

    page.drawText(formatted, {
      x: coord.x,
      y: coord.y,
      size: coord.size || 10,
      font,
      color: rgb(0, 0, 0),
    });
  }

  const outputBytes = await pdfDoc.save();
  const filename = buildOutputFilename(template, payload);

  const { absolutePath, sizeBytes } = await writeBufferToFile(
    destinationDir,
    filename,
    Buffer.from(outputBytes),
  );

  return {
    templateId: template.id,
    filename,
    absolutePath,
    publicUrl: buildPublicUrl(absolutePath),
    sizeBytes,
  };
};

/**
 * Helper to find coordinates in PDF
 * Run this to help you find the right X,Y positions
 */
export const generateCoordinateFinder = async (templateFile: string) => {
  const templatePath = path.resolve(env.templateDir, templateFile);
  const buffer = await fs.promises.readFile(templatePath);
  const pdfDoc = await PDFDocument.load(buffer);

  const pages = pdfDoc.getPages();

  console.log('\n📏 PDF Coordinate Reference:\n');

  pages.forEach((page, index) => {
    const { width, height } = page.getSize();
    console.log(`Page ${index + 1}:`);
    console.log(`  Width: ${width}pt`);
    console.log(`  Height: ${height}pt`);
    console.log(`  Origin: Bottom-left (0, 0)`);
    console.log(`  Top-left: (0, ${height})`);
    console.log(`  Top-right: (${width}, ${height})`);
    console.log(`  Bottom-right: (${width}, 0)\n`);
  });

  console.log('💡 Tip: PDF coordinates start from BOTTOM-LEFT corner!');
  console.log('   - X increases to the RIGHT');
  console.log('   - Y increases UPWARD\n');
};
