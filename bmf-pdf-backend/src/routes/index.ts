import { Router } from 'express';
import pdfOrderRoutes from './pdfOrderRoutes';

const router = Router();

router.use('/pdf-orders', pdfOrderRoutes);

export default router;

