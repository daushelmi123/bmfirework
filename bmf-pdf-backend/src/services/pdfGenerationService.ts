import fs from 'node:fs';
import path from 'node:path';
import { PDFDocument, PDFName, PDFBool } from 'pdf-lib';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import type { PdfTemplateConfig, GeneratedPdfFile } from '../types/pdf';
import type { PdfOrderPayload } from '../validation/pdfOrderSchema';
import { HttpError } from '../utils/httpError';
import { buildPublicUrl, writeBufferToFile } from './storageService';

const templatePath = (file: string) => path.resolve(env.templateDir, file);

const readTemplateBuffer = async (file: string) => {
  const resolved = templatePath(file);
  if (!fs.existsSync(resolved)) {
    throw new HttpError(500, `Template file not found: ${resolved}`);
  }
  return fs.promises.readFile(resolved);
};

const formatValue = (
  value: unknown,
  transform?: 'uppercase' | 'lowercase' | 'titlecase' | 'date-iso' | 'date-display' | 'date-dmY',
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
    case 'date-dmY': {
      // Format: DD/MM/YYYY (Malaysian format)
      const date = new Date(str);
      if (Number.isNaN(date.getTime())) return str;
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
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

const fillFormFields = (pdfBytes: Uint8Array, template: PdfTemplateConfig, payload: PdfOrderPayload) => {
  return PDFDocument.load(pdfBytes).then(async (pdfDoc) => {
    const form = pdfDoc.getForm();

    // Disable NeedAppearances to use our custom font settings
    form.acroForm.dict.set(PDFName.of('NeedAppearances'), PDFBool.False);

    for (const field of template.fields) {
      const { templateField, payloadField, transform } = field;
      try {
        const value = (payload as Record<string, unknown>)[payloadField];
        if (value == null) continue;

        const formatted = formatValue(value, transform);

        // Try to get and populate text field
        try {
          const textField = form.getTextField(templateField);
          textField.setText(formatted);

          // Standardize font appearance for professional look
          textField.setFontSize(10); // Professional standard size
          textField.enableReadOnly(); // Make non-editable after fill

          continue;
        } catch (e) {
          // Not a text field, try checkbox
        }

        // Try checkbox
        try {
          const checkbox = form.getCheckBox(templateField);
          const truthy = String(value).toLowerCase();
          if (['true', 'yes', '1', 'on'].includes(truthy)) {
            checkbox.check();
          } else {
            checkbox.uncheck();
          }
          continue;
        } catch (e) {
          // Not a checkbox, try radio group
        }

        // Try radio group
        try {
          const radioGroup = form.getRadioGroup(templateField);
          radioGroup.select(String(value));
          continue;
        } catch (e) {
          // Field not found or unsupported type
        }

        logger.warn({ templateField }, 'Template field not found in PDF');
      } catch (error) {
        logger.error({ templateField, error }, 'Failed to populate form field');
      }
    }

    // Try to flatten, but continue if it fails (some PDFs have broken references)
    try {
      form.flatten();
    } catch (e: any) {
      logger.warn({ error: e.message }, 'Flatten failed, skipping');
    }

    return pdfDoc.save();
  });
};

export const generatePdfFromTemplate = async (
  template: PdfTemplateConfig,
  payload: PdfOrderPayload,
  destinationDir: string,
): Promise<GeneratedPdfFile> => {
  const buffer = await readTemplateBuffer(template.file);
  const outputBytes = await fillFormFields(buffer, template, payload);

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

