# PDF Service Backend - Overview

Reusable PDF generation service untuk multiple companies.

---

## Apa itu Service Ini?

Backend service untuk:
- ✅ **Auto-fill PDF forms** - Isi borang PDF secara automatik
- ✅ **Generate PDFs** - Combine multiple PDFs jadi satu file
- ✅ **Send webhooks** - Hantar data ke external systems (Boost.space, Make.com)
- ✅ **Auto-cleanup** - Delete files automatically selepas configured time
- ✅ **API authentication** - Protected dengan API key
- ✅ **UPPERCASE text** - Semua text dalam PDF jadi uppercase

---

## Untuk Siapa?

Service ini sesuai untuk:
- Companies yang ada PDF forms untuk customers isi
- Businesses yang nak automate document generation
- Systems yang integrate dengan external webhooks
- Companies yang nak reuse sama service untuk banyak projects

---

## Tech Stack

- **Runtime:** Node.js 18+
- **Language:** TypeScript
- **Framework:** Express.js
- **PDF Processing:** pdf-lib
- **Logging:** Winston
- **Process Manager:** PM2 (production)

---

## Current Implementation

Service ni already digunakan untuk **GRK Fireworks**:
- Generate permit application PDFs
- Auto-fill forms dengan customer data
- Send data ke Boost.space webhook
- Auto-delete PDFs after 15 minutes

---

## Features

### 1. PDF Form Filling
- Automatically fill form fields dalam PDF
- Support text fields, checkboxes, radio buttons
- Uppercase transformation untuk all text
- Handle multiple PDF templates

### 2. Multi-page PDF Generation
- Combine multiple PDFs jadi single file
- Include uploaded images (ID card, business license, etc)
- Maintain proper page ordering

### 3. Webhook Integration
- Send form data ke external systems
- Configurable payload
- Timeout handling
- Error retry (optional)

### 4. Auto Cleanup
- Scheduled cleanup of old files
- Configurable retention period
- Cleanup after response (immediate)
- Space management

### 5. Security
- API key authentication
- Input validation
- File upload limits
- Secure file handling

### 6. Logging
- Winston logger with rotation
- Request/response logging
- Error tracking
- Debug mode

---

## Cara Guna untuk Company Baru

### Quick Steps:

1. **Copy folder** → Rename untuk company baru
2. **Install dependencies** → `npm install`
3. **Add PDF templates** → Letak PDF files dalam `pdf_templates/`
4. **Configure .env** → Setup API key, webhook, URLs
5. **Update field mappings** → Edit `src/services/pdfService.ts`
6. **Test locally** → `npm run dev`
7. **Deploy to VPS** → Use `deploy-template.sh`

**Time:** ~15-20 minit untuk complete setup

**Baca:** `QUICKSTART.md` untuk step-by-step guide

---

## Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Full documentation dengan all features |
| **QUICKSTART.md** | 15-minute setup guide |
| **CUSTOMIZATION_GUIDE.md** | Detailed customization untuk company baru |
| **OVERVIEW.md** | This file - high-level overview |
| **.env.template** | Environment variables template |
| **deploy-template.sh** | Automated deployment script |

---

## File Structure

```
PDF Service Backend/
│
├── 📄 Documentation
│   ├── README.md                    # Main documentation
│   ├── QUICKSTART.md               # Quick start guide
│   ├── CUSTOMIZATION_GUIDE.md      # Customization guide
│   └── OVERVIEW.md                 # This file
│
├── ⚙️ Configuration
│   ├── .env.template               # Environment template
│   ├── .gitignore                  # Git ignore rules
│   ├── package.json                # Node dependencies
│   ├── tsconfig.json               # TypeScript config
│   └── deploy-template.sh          # Deployment script
│
├── 💻 Source Code
│   └── src/
│       ├── server.ts               # Express server
│       ├── config/
│       │   └── env.ts              # Load environment variables
│       ├── routes/
│       │   └── pdfRoutes.ts        # API endpoints
│       ├── services/
│       │   ├── pdfService.ts       # 🎯 PDF generation (EDIT THIS)
│       │   ├── webhookService.ts   # Webhook integration
│       │   └── cleanupService.ts   # Auto cleanup
│       ├── middleware/
│       │   ├── authMiddleware.ts   # API key validation
│       │   └── errorHandler.ts     # Error handling
│       └── utils/
│           ├── logger.ts            # Winston logger
│           └── validators.ts        # Input validation
│
└── 📁 Runtime Directories
    ├── pdf_templates/              # 🎯 PUT PDF FILES HERE
    └── customers/                  # Generated PDFs (auto-cleanup)
```

**Key files to edit:**
- 🎯 `src/services/pdfService.ts` - Field mappings & template files
- 🎯 `.env` - Configuration
- 🎯 `pdf_templates/` - PDF template files

---

## API Endpoints

### 1. Generate PDF
```
POST /api/pdf/generate
Headers: x-api-key: YOUR_API_KEY
Body: multipart/form-data
```

### 2. Health Check
```
GET /health
Response: {"status": "ok"}
```

---

## Environment Variables

Key configurations:

```bash
# Security
API_KEY=your_secret_key                    # Generate new untuk each company

# Directories
TEMPLATE_DIR=./pdf_templates               # PDF templates location
OUTPUT_DIR=./customers                     # Generated PDFs location

# URLs
PUBLIC_BASE_URL=http://localhost:4000/customers
STATIC_PREFIX=/customers

# Webhook
WEBHOOK_URL=https://hook.integrator.boost.space/xxx
WEBHOOK_ENABLED=true

# Cleanup
AUTO_CLEANUP_ENABLED=true
CLEANUP_RETENTION_MINUTES=15
```

---

## Deployment Options

### Local Development
```bash
npm run dev
# Runs on http://localhost:4000
```

### Production (VPS)

**Option 1: Automated**
```bash
./deploy-template.sh
```

**Option 2: Manual**
```bash
npm run build
# Upload dist/ to VPS
pm2 start dist/server.js
```

---

## Use Cases

### 1. E-commerce
- Generate invoices
- Order confirmation PDFs
- Shipping labels

### 2. HR Systems
- Employment contracts
- Offer letters
- Employee forms

### 3. Permit Applications
- License applications (current: GRK Fireworks)
- Permit requests
- Registration forms

### 4. Healthcare
- Patient forms
- Consent forms
- Medical reports

### 5. Real Estate
- Rental agreements
- Property documents
- Contract generation

---

## Customization Points

Untuk adapt untuk company baru:

1. **PDF Templates** - Ganti dengan company's forms
2. **Field Mappings** - Map form fields ke PDF fields
3. **API Key** - Generate unique key
4. **Webhook** - Configure company's webhook URL
5. **Branding** - Update company name dalam webhook payload
6. **Validation** - Customize required fields
7. **Cleanup Schedule** - Adjust retention based on needs

---

## Security Features

- ✅ API key authentication
- ✅ Input validation & sanitization
- ✅ File upload size limits
- ✅ Secure file naming (no path traversal)
- ✅ Auto-cleanup (prevent storage abuse)
- ✅ Error handling without exposing internals
- ✅ Request logging for audit

---

## Performance

- Fast PDF generation (< 2 seconds)
- Concurrent request handling
- Efficient file cleanup
- Minimal memory footprint
- Scalable architecture

---

## Support & Maintenance

### Monitoring
```bash
# View logs
tail -f logs/app.log

# Check PM2 status
pm2 status

# Monitor resources
pm2 monit
```

### Common Tasks
```bash
# Restart service
pm2 restart pdf-service

# View logs
pm2 logs pdf-service

# Clear old logs
pm2 flush

# Update deployment
./deploy-template.sh
```

---

## Pricing Model (Suggestion)

Kalau nak jual service ni:

1. **Setup Fee** - One-time customization
2. **Monthly Fee** - Hosting & maintenance
3. **Per-PDF Fee** - Usage-based pricing
4. **Support Package** - Optional support contract

---

## Next Steps

1. **Read QUICKSTART.md** - Setup dalam 15 minit
2. **Test locally** - Generate first PDF
3. **Customize** - Follow CUSTOMIZATION_GUIDE.md
4. **Deploy** - Use deploy-template.sh
5. **Integrate** - Connect dengan frontend

---

## License

Proprietary - For internal company use only.

---

## Contact

Untuk soalan atau bantuan customization, hubungi developer.

---

**Prepared by:** PDF Service Backend Team
**Date:** November 2025
**Version:** 1.0.0
