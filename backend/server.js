require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;
const PDF_SERVICE_URL = process.env.PDF_SERVICE_URL || 'http://84.247.150.90:4001/api/pdf-orders';
const ALLOWED_ORIGINS = process.env.FRONTEND_ORIGINS
  ? process.env.FRONTEND_ORIGINS.split(',').map((origin) => origin.trim())
  : ['https://bmfirework.com', 'http://localhost:5173'];
const PRICE_WEBHOOK_URL = process.env.PRICE_WEBHOOK_URL || '';
const PDF_API_KEY = process.env.PDF_API_KEY || '';

// Middleware
app.use(cors({
  origin: ALLOWED_ORIGINS,
  credentials: true,
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'BMFireworks Backend API is running' });
});

app.post('/api/price-request', async (req, res) => {
  const { name, phone, state, stateLabel, source } = req.body || {};

  if (!name || !phone || !state) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['name', 'phone', 'state'],
    });
  }

  if (!PRICE_WEBHOOK_URL) {
    console.warn('[price-request] PRICE_WEBHOOK_URL not configured');
    return res.status(503).json({
      error: 'Price request handler not configured',
    });
  }

  try {
    const payload = {
      name,
      phone,
      state,
      stateLabel: stateLabel || state,
      source: source || 'bmfireworks-price-download',
      timestamp: new Date().toISOString(),
      meta: {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
      },
    };

    const response = await fetch(PRICE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[price-request] Webhook failed:', errorText);
      return res.status(502).json({
        error: 'Failed to deliver payload to webhook',
        details: errorText,
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('[price-request] Unexpected error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

// Proxy endpoint for PDF generation
app.post('/api/generate-permit', async (req, res) => {
  try {
    // Validate request body
    const {
      applicationType,
      fullName,
      icNumber,
      phone,
      companyName,
      companySsm,
      applicationDate,
      // Optional fields
      occupation,
      addressLine1,
      addressLine2,
      city,
      postcode,
      state,
      businessLocation,
      businessAddress1,
      businessAddress2,
      businessState,
      ipdName
    } = req.body;

    // Basic validation
    if (!applicationType || !fullName || !icNumber || !phone || !companyName || !companySsm || !applicationDate) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['applicationType', 'fullName', 'icNumber', 'phone', 'companyName', 'companySsm', 'applicationDate']
      });
    }

    // Log request (for monitoring)
    console.log(`[${new Date().toISOString()}] PDF Generation Request: ${fullName} - ${applicationType}`);

    if (!PDF_API_KEY) {
      console.warn('[generate-permit] PDF_API_KEY not configured');
      return res.status(503).json({
        error: 'PDF service not configured',
      });
    }

    // Call external PDF service
    const response = await fetch(PDF_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': PDF_API_KEY,
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[${new Date().toISOString()}] PDF Service Error:`, errorText);
      return res.status(response.status).json({
        error: 'Failed to generate PDF',
        details: errorText
      });
    }

    const result = await response.json();

    // Log success
    console.log(`[${new Date().toISOString()}] PDF Generated Successfully: ${result.pdfUrl || 'No URL'}`);

    res.json(result);

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Server Error:`, error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`BMFireworks Backend API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
