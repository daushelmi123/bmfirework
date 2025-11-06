# Quick Start Guide - 15 Minit Setup

Panduan pantas untuk setup PDF service untuk company baru dalam 15 minit.

---

## Prerequisites

- Node.js 18+ installed
- PDF template files dari company
- VPS dengan SSH access (optional untuk production)
- Webhook URL (Boost.space/Make.com)

---

## Step 1: Initial Setup (2 minit)

```bash
# 1. Copy folder ini ke company baru
cp -r "PDF Service Backend" "NewCompany-PDF-Service"
cd "NewCompany-PDF-Service"

# 2. Install dependencies
npm install
```

---

## Step 2: Add PDF Templates (2 minit)

```bash
# Copy PDF template files company ke folder pdf_templates/
cp /path/to/company-form.pdf pdf_templates/

# Verify
ls pdf_templates/
```

---

## Step 3: Configure Environment (3 minit)

```bash
# Copy template
cp .env.template .env

# Edit .env
nano .env
```

**Update these values:**

```bash
# Generate API key
API_KEY=$(openssl rand -base64 32)

# Update webhook
WEBHOOK_URL=https://hook.integrator.boost.space/YOUR_NEW_WEBHOOK_ID

# Local testing
PUBLIC_BASE_URL=http://localhost:4000/customers
```

---

## Step 4: Update Field Mappings (5 minit)

Edit `src/services/pdfService.ts`:

### Find PDF field names first:

```bash
# Install pdf-lib to inspect PDF
npm install pdf-lib

# Or use Adobe Acrobat to view form field names
# Or use online PDF field viewer
```

### Update mappings:

```typescript
// Line ~50 in src/services/pdfService.ts
const fieldMappings: { [key: string]: string } = {
  // Your company's field mappings
  'customerName': 'Text1',      // Map to actual PDF field name
  'customerId': 'Text2',
  'productName': 'Text3',
  // ... add more fields
};
```

### Update template filenames:

```typescript
// Line ~100
const templateFiles = [
  'company-form.pdf',  // Your actual filename
];
```

---

## Step 5: Test Locally (3 minit)

```bash
# Start service
npm run dev

# Test in new terminal
curl -X POST http://localhost:4000/api/pdf/generate \
  -H "x-api-key: YOUR_API_KEY_FROM_ENV" \
  -F "customerName=Test User" \
  -F "customerId=123456"

# Check output
open customers/
```

**Verify:**
- ✅ PDF generated successfully?
- ✅ Fields filled correctly?
- ✅ Webhook sent to Boost.space?

---

## Step 6: Deploy to Production (Optional)

### Option A: Automated Deployment

```bash
# 1. Update deploy script
nano deploy-template.sh

# Update these variables:
COMPANY_NAME="newcompany"
VPS_IP="xxx.xxx.xxx.xxx"
VPS_USER="root"
VPS_PASSWORD="your_password"

# 2. Create production config
cp .env .env.production

# Update production URLs in .env.production:
PUBLIC_BASE_URL=https://newcompany.com/customers

# 3. Deploy
chmod +x deploy-template.sh
./deploy-template.sh
```

### Option B: Manual Deployment

```bash
# 1. Build
npm run build

# 2. Create package
tar -czf pdf-service.tar.gz dist/ package.json .env.production pdf_templates/

# 3. Upload to VPS
scp pdf-service.tar.gz root@YOUR_VPS_IP:/tmp/

# 4. SSH and extract
ssh root@YOUR_VPS_IP
cd /var/www/pdf-service
tar -xzf /tmp/pdf-service.tar.gz
npm install --production

# 5. Start with PM2
pm2 start dist/server.js --name pdf-service
pm2 save
pm2 startup
```

---

## Step 7: Integrate with Frontend

### React Example:

```typescript
const generatePDF = async (formData: FormData) => {
  try {
    const response = await fetch('https://api.company.com/api/pdf/generate', {
      method: 'POST',
      headers: {
        'x-api-key': 'YOUR_API_KEY',  // From .env
      },
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      // Download or display PDF
      window.open(result.data.pdfUrl, '_blank');
    }
  } catch (error) {
    console.error('PDF generation failed:', error);
  }
};
```

---

## Troubleshooting

### PDF not generated
```bash
# Check logs
tail -f logs/app.log

# Verify templates exist
ls pdf_templates/

# Check field mappings
cat src/services/pdfService.ts | grep fieldMappings
```

### Webhook not working
```bash
# Test webhook URL manually
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Check .env
cat .env | grep WEBHOOK
```

### Permission errors
```bash
# Fix permissions
chmod -R 755 pdf_templates/
chmod -R 755 customers/
```

---

## What's Included

```
PDF Service Backend/
├── README.md                    # Full documentation
├── QUICKSTART.md               # This file
├── CUSTOMIZATION_GUIDE.md      # Detailed customization guide
├── .env.template               # Environment template
├── deploy-template.sh          # Deployment script
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
│
├── src/
│   ├── server.ts               # Main server
│   ├── config/env.ts           # Environment config
│   ├── routes/pdfRoutes.ts     # API routes
│   ├── services/
│   │   ├── pdfService.ts       # PDF generation (EDIT THIS!)
│   │   ├── webhookService.ts   # Webhook integration
│   │   └── cleanupService.ts   # Auto cleanup
│   ├── middleware/
│   │   ├── authMiddleware.ts   # API key validation
│   │   └── errorHandler.ts     # Error handling
│   └── utils/
│       ├── logger.ts            # Logging
│       └── validators.ts        # Validation
│
├── pdf_templates/              # PUT PDF FILES HERE!
└── customers/                  # Generated PDFs (auto-cleanup)
```

---

## Quick Reference

### Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Run production build

# Testing
curl http://localhost:4000/health                    # Health check
curl -X POST http://localhost:4000/api/pdf/generate  # Generate PDF

# Deployment
./deploy-template.sh     # Deploy to VPS
pm2 logs pdf-service     # View logs on VPS
pm2 restart pdf-service  # Restart service
```

### Important Files to Edit

1. **`src/services/pdfService.ts`** - Field mappings (line 50) & template filenames (line 100)
2. **`.env`** - API key, webhook URL, directories
3. **`src/services/webhookService.ts`** - Webhook payload customization
4. **`deploy-template.sh`** - Deployment configuration

---

## Need Help?

- Read **CUSTOMIZATION_GUIDE.md** for detailed instructions
- Read **README.md** for full documentation
- Check logs: `tail -f logs/app.log`
- Test API: `curl http://localhost:4000/health`

---

## Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] PDF templates added to `pdf_templates/`
- [ ] `.env` configured with API key & webhook
- [ ] Field mappings updated in `pdfService.ts`
- [ ] Template filenames updated in `pdfService.ts`
- [ ] Local testing successful
- [ ] Production deployment completed (optional)
- [ ] Frontend integration completed
- [ ] Webhook integration verified

---

**Time estimate:** 15-20 minutes for complete setup!
