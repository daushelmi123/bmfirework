import { z } from 'zod';

export const phoneRegex = /^[0-9\s\-]{8,15}$/;

export const pdfOrderSchema = z.object({
  fullName: z.string().min(3).max(160),
  icNumber: z
    .string()
    .regex(/^[0-9]{6}-?[0-9]{2}-?[0-9]{4}$/)
    .transform((val) => val.replaceAll('-', '')),
  occupation: z.string().min(2).max(120),
  countryCode: z.enum(['60']).default('60'),
  phone: z
    .string()
    .regex(phoneRegex, 'Phone number must be numeric and at least 8 digits'),
  // Home address fields
  addressLine1: z.string().min(5).max(200),
  addressLine2: z.string().max(200).optional().or(z.literal('')),
  addressLine3: z.string().max(200).optional().or(z.literal('')),
  addressLine23: z.string().max(400).optional().or(z.literal('')), // Combined line 2+3 for BMF

  // GRK legacy fields (optional for backward compatibility)
  city: z.string().min(2).max(120).optional().or(z.literal('')),
  postcode: z.string().regex(/^[0-9]{5}$/).optional().or(z.literal('')),
  state: z.string().min(2).max(120).optional().or(z.literal('')),

  // Company info (pemohon's company)
  companyName: z.string().min(3).max(160),
  companySsm: z.string().min(4).max(50).optional().or(z.literal('')),
  companyAddressLine1: z.string().min(5).max(200).optional().or(z.literal('')),
  companyAddressLine2: z.string().max(200).optional().or(z.literal('')),
  companyAddressLine3: z.string().max(200).optional().or(z.literal('')),
  companyAddressLine23: z.string().max(400).optional().or(z.literal('')), // Combined company address line 2+3
  applicationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),

  // Business premises address fields (tapak/gerai)
  businessAddressLine1: z.string().min(5).max(200),
  businessAddressLine2: z.string().max(200).optional().or(z.literal('')),
  businessAddressLine3: z.string().max(200).optional().or(z.literal('')),
  businessAddressLine23: z.string().max(400).optional().or(z.literal('')), // Combined line 2+3 for BMF

  // GRK legacy business fields (optional for backward compatibility)
  businessLocation: z.string().min(2).max(200).optional().or(z.literal('')),
  businessAddress1: z.string().min(5).max(200).optional().or(z.literal('')),
  businessAddress2: z.string().max(200).optional().or(z.literal('')),
  businessState: z.string().min(2).max(120).optional().or(z.literal('')),
  // IPD fields (GRK format)
  ipd: z.string().min(2).max(200),
  ipdOther: z.string().max(200).optional().or(z.literal('')),
  ipdName: z.string().max(200).optional().or(z.literal('')),
  ipdAddress: z.string().max(300).optional().or(z.literal('')),
  ipdCity: z.string().max(200).optional().or(z.literal('')),
  ipdState: z.string().max(120).optional().or(z.literal('')),

  // IPD fields (BMF format - 5 lines)
  ipdLine1: z.string().max(200).optional().or(z.literal('')), // IPD Name
  ipdLine2: z.string().max(300).optional().or(z.literal('')), // IPD Address
  ipdLine3: z.string().max(200).optional().or(z.literal('')), // Postcode + City
  ipdLine4: z.string().max(120).optional().or(z.literal('')), // State
  ipdLine5: z.string().max(200).optional().or(z.literal('')), // Extra info
  // New fields for permohonan-ipd template
  cityPostcode: z.string().max(200).optional().or(z.literal('')),
  businessLocationState: z.string().max(250).optional().or(z.literal('')),
  fireworksType: z.string().max(300).optional().or(z.literal('')),
  supplierName: z.string().max(200).optional().or(z.literal('')),
  supplierAddress1: z.string().max(200).optional().or(z.literal('')),
  supplierAddress2: z.string().max(200).optional().or(z.literal('')),
  appointmentLetterRef: z.string().max(100).optional().or(z.literal('')),
  festivalType: z.enum(['cny-2026', 'raya-2026']).optional().or(z.literal('')),
  templates: z.array(z.string()).min(1).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type PdfOrderPayload = z.infer<typeof pdfOrderSchema>;

export const sanitizePhone = (countryCode: string, phone: string) => {
  const digits = phone.replace(/\D/g, '').replace(/^0+/, '');
  return `${countryCode}${digits}`;
};

