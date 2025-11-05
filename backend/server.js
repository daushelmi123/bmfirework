require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['https://bmfirework.com', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'BMFireworks Backend API is running' });
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

    // Call external PDF service
    const response = await fetch('https://grkfireworks.com:4000/api/generate-permit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.PDF_API_KEY
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
