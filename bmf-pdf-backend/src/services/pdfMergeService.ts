import fs from 'node:fs';
import { PDFDocument } from 'pdf-lib';
import { logger } from '../utils/logger';
import type { GeneratedPdfFile } from '../types/pdf';
import { writeBufferToFile, buildPublicUrl } from './storageService';

/**
 * Merge multiple PDF files into a single PDF
 * @param pdfFiles - Array of generated PDF files to merge
 * @param destinationDir - Directory where merged PDF will be saved
 * @returns Merged PDF file info
 */
export const mergePdfFiles = async (
  pdfFiles: GeneratedPdfFile[],
  destinationDir: string,
): Promise<GeneratedPdfFile> => {
  if (pdfFiles.length === 0) {
    throw new Error('No PDF files to merge');
  }

  // If only one PDF, return it as-is
  if (pdfFiles.length === 1) {
    return pdfFiles[0];
  }

  logger.info({ fileCount: pdfFiles.length }, 'Merging PDF files');

  // Create new PDF document for merging
  const mergedPdf = await PDFDocument.create();

  // Load and copy pages from each PDF
  for (const pdfFile of pdfFiles) {
    try {
      const pdfBytes = await fs.promises.readFile(pdfFile.absolutePath);
      const pdf = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

      // Add all pages from this PDF
      for (const page of pages) {
        mergedPdf.addPage(page);
      }

      logger.info({
        templateId: pdfFile.templateId,
        pageCount: pages.length
      }, 'Added pages from PDF');
    } catch (error) {
      logger.error({
        templateId: pdfFile.templateId,
        error
      }, 'Failed to merge PDF file');
      throw error;
    }
  }

  // Save merged PDF
  const mergedBytes = await mergedPdf.save();

  // Generate filename for merged PDF
  // Extract unique folder identifier from destinationDir (last part of path)
  const folderName = destinationDir.split('/').pop() || '';

  // Use folder name as base for PDF filename to ensure uniqueness
  // Format: 2025-11-05-093045-yus-bin-farok-7471-a8f2-merged.pdf
  const filename = `${folderName}-merged.pdf`;

  const { absolutePath, sizeBytes } = await writeBufferToFile(
    destinationDir,
    filename,
    Buffer.from(mergedBytes),
  );

  logger.info({
    filename,
    sizeBytes,
    sourceCount: pdfFiles.length
  }, 'PDF files merged successfully');

  return {
    templateId: 'merged',
    filename,
    absolutePath,
    publicUrl: buildPublicUrl(absolutePath),
    sizeBytes,
  };
};

/**
 * Delete individual PDF files after merging
 * @param pdfFiles - Array of PDF files to delete
 */
export const cleanupIndividualPdfs = async (
  pdfFiles: GeneratedPdfFile[],
): Promise<void> => {
  for (const pdfFile of pdfFiles) {
    try {
      await fs.promises.unlink(pdfFile.absolutePath);
      logger.info({ filename: pdfFile.filename }, 'Deleted individual PDF');
    } catch (error) {
      logger.warn({
        filename: pdfFile.filename,
        error
      }, 'Failed to delete individual PDF');
    }
  }
};
