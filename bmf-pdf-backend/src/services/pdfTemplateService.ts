import fs from 'node:fs';
import path from 'node:path';
import { logger } from '../utils/logger';
import type { PdfTemplateConfig, PdfTemplateRegistry } from '../types/pdf';
import { HttpError } from '../utils/httpError';

const TEMPLATE_CONFIG_FILENAME = process.env.TEMPLATE_CONFIG || 'config/pdf-templates.json';

let cachedRegistry: PdfTemplateRegistry | null = null;
let cachedMtime = 0;

const readTemplateConfig = (): PdfTemplateRegistry => {
  const configPath = path.resolve(process.cwd(), TEMPLATE_CONFIG_FILENAME);

  if (!fs.existsSync(configPath)) {
    throw new HttpError(500, `Template configuration file not found at ${configPath}`);
  }

  const stat = fs.statSync(configPath);
  if (cachedRegistry && stat.mtimeMs === cachedMtime) {
    return cachedRegistry;
  }

  const raw = fs.readFileSync(configPath, 'utf-8');
  const data = JSON.parse(raw) as PdfTemplateRegistry;

  if (!Array.isArray(data.templates)) {
    throw new HttpError(500, 'Invalid template configuration format');
  }

  cachedRegistry = data;
  cachedMtime = stat.mtimeMs;

  logger.info({ count: data.templates.length }, 'Loaded PDF template configuration');

  return data;
};

export const getTemplateRegistry = (): PdfTemplateRegistry => {
  return readTemplateConfig();
};

export const resolveTemplates = (templateIds?: string[]): PdfTemplateConfig[] => {
  const registry = getTemplateRegistry();
  const enabledTemplates = registry.templates.filter((template) => template.enabled !== false);

  if (!templateIds || templateIds.length === 0) {
    return enabledTemplates;
  }

  const selected = enabledTemplates.filter((template) => templateIds.includes(template.id));

  if (selected.length === 0) {
    throw new HttpError(404, 'No templates found for provided template IDs');
  }

  return selected;
};

