export interface TemplateFieldMapping {
  templateField: string;
  payloadField: string;
  transform?: 'uppercase' | 'lowercase' | 'titlecase' | 'date-iso' | 'date-display';
}

export interface PdfTemplateConfig {
  id: string;
  file: string;
  outputFilenameTemplate: string;
  description?: string;
  fields: TemplateFieldMapping[];
  enabled?: boolean;
}

export interface PdfTemplateRegistry {
  templates: PdfTemplateConfig[];
}

export interface GeneratedPdfFile {
  templateId: string;
  filename: string;
  absolutePath: string;
  publicUrl: string;
  sizeBytes: number;
}

export interface PdfGenerationResult {
  requestId: string;
  customerName: string;
  customerIc: string;
  destinationDir: string;
  generatedFiles: GeneratedPdfFile[];
}

