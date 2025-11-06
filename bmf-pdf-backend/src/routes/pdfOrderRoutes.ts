import { Router } from 'express';
import { createPdfOrder } from '../controllers/pdfOrderController';
import { validateRequest } from '../middleware/validateRequest';
import { pdfOrderSchema } from '../validation/pdfOrderSchema';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/', validateRequest(pdfOrderSchema), asyncHandler(createPdfOrder));

export default router;

