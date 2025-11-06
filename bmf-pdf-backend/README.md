# PDF Generation Service - Reusable Backend

Service backend untuk generate PDF dengan auto-fill form untuk mana-mana company.

## Features

✅ **Auto-fill PDF Forms** - Isi borang PDF secara automatik
✅ **Webhook Integration** - Hantar data ke webhook (Boost.space/Make.com)
✅ **Auto Cleanup** - Delete file automatically selepas 15 minit
✅ **API Key Security** - Protected dengan API key
✅ **Uppercase Text** - Semua text dalam PDF jadi UPPERCASE
✅ **Collision Prevention** - Unique filenames (timestamp + random)
✅ **Multi-page PDFs** - Support multiple PDF files (ID card, permit, etc)

---

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Copy `.env.template` to `.env` dan edit:

```bash
cp .env.template .env
nano .env
```

### 3. Add PDF Templates

Letakkan PDF template files dalam folder `pdf_templates/`:

```
pdf_templates/
  ├── form1.pdf
  ├── form2.pdf
  └── ...
```

### 4. Start Service

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

---

## Environment Variables

```bash
# Port & Host
PORT=4000
HOST=0.0.0.0

# Security - WAJIB tukar untuk production!
API_KEY=your_secret_api_key_here

# Directories (local development)
TEMPLATE_DIR=./pdf_templates
OUTPUT_DIR=./customers

# Public URLs - Tukar dengan domain company
PUBLIC_BASE_URL=http://localhost:4000/customers
STATIC_PREFIX=/customers

# Logging
LOG_LEVEL=debug

# Upload limit
MAX_UPLOAD_SIZE_MB=15

# Webhook Configuration
WEBHOOK_URL=https://hook.integrator.boost.space/YOUR_WEBHOOK_ID
WEBHOOK_ENABLED=true
WEBHOOK_TIMEOUT_MS=5000

# Cleanup Configuration
AUTO_CLEANUP_ENABLED=true
CLEANUP_AFTER_RESPONSE=true
CLEANUP_RETENTION_MINUTES=15
CLEANUP_CHECK_INTERVAL_MS=60000
```

---

## API Endpoints

### 1. Generate PDF

**POST** `/api/pdf/generate`

**Headers:**
```
Content-Type: multipart/form-data
x-api-key: your_secret_api_key_here
```

**Body (form-data):**
```
applicantName: John Doe
applicantIc: 123456789012
businessName: My Company Sdn Bhd
businessAddress: Jalan ABC, 12345 KL
fireworksType: Celebration Cake
eventDate: 2025-11-15
eventLocation: Stadium XYZ
...
(any field names yang ada dalam PDF form)

idCardImage: [FILE] (optional)
```

**Response:**
```json
{
  "success": true,
  "message": "PDF generated successfully",
  "data": {
    "pdfUrl": "https://yourdomain.com/customers/2025-11-05-john-doe-1234/2025-11-05-john-doe-merged.pdf",
    "folderName": "2025-11-05-john-doe-1234",
    "files": {
      "filled_form1.pdf": "https://yourdomain.com/customers/.../filled_form1.pdf",
      "filled_form2.pdf": "https://yourdomain.com/customers/.../filled_form2.pdf",
      "merged.pdf": "https://yourdomain.com/customers/.../merged.pdf"
    }
  },
  "webhookSent": true
}
```

### 2. Health Check

**GET** `/health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-05T10:30:00.000Z"
}
```

---

## File Structure

```
pdf-service/
├── src/
│   ├── server.ts              # Main Express server
│   ├── config/
│   │   └── env.ts             # Environment variables
│   ├── routes/
│   │   └── pdfRoutes.ts       # API routes
│   ├── services/
│   │   ├── pdfService.ts      # PDF generation logic
│   │   ├── cleanupService.ts  # Auto cleanup
│   │   └── webhookService.ts  # Webhook integration
│   ├── middleware/
│   │   ├── authMiddleware.ts  # API key validation
│   │   └── errorHandler.ts    # Error handling
│   └── utils/
│       ├── logger.ts           # Winston logger
│       └── validators.ts       # Input validation
├── pdf_templates/              # PDF template files
├── customers/                  # Generated PDFs (auto-cleanup)
├── .env                        # Environment config
├── package.json
└── tsconfig.json
```

---

## Customization untuk Company Lain

### 1. Update PDF Templates

Gantikan PDF files dalam `pdf_templates/` dengan form company baru:

```bash
cp /path/to/new-company-form.pdf pdf_templates/
```

### 2. Update Field Mapping

Edit `src/services/pdfService.ts`:

```typescript
// Line ~50: Update field mappings
const fieldMappings: { [key: string]: string } = {
  // Map frontend field names to PDF form field names
  'applicantName': 'applicant_name_field',
  'applicantIc': 'ic_number_field',
  'businessName': 'business_name',
  // Add more mappings...
};
```

### 3. Update Webhook Payload

Edit `src/services/webhookService.ts`:

```typescript
// Line ~30: Customize webhook data
const payload = {
  timestamp: new Date().toISOString(),
  company: 'NEW_COMPANY_NAME',
  formData: data,
  pdfUrl: result.pdfUrl,
  // Add custom fields...
};
```

### 4. Update API Key

Generate new API key:

```bash
openssl rand -base64 32
```

Update `.env`:
```
API_KEY=new_company_api_key_here
```

---

## VPS Deployment

### Option 1: Manual Deployment

```bash
# 1. Copy files to VPS
scp -r pdf-service/ root@your-vps-ip:/var/www/

# 2. SSH to VPS
ssh root@your-vps-ip

# 3. Install dependencies
cd /var/www/pdf-service
npm install

# 4. Setup .env for production
cp .env.template .env.production
nano .env.production

# 5. Build
npm run build

# 6. Start with PM2
pm2 start dist/server.js --name pdf-service
pm2 save
pm2 startup
```

### Option 2: Automated with Script

Buat deployment script (lihat `deploy.sh`)

---

## Testing

```bash
# Test PDF generation
curl -X POST http://localhost:4000/api/pdf/generate \
  -H "x-api-key: your_api_key" \
  -F "applicantName=John Doe" \
  -F "applicantIc=123456789012"

# Test health check
curl http://localhost:4000/health
```

---

## Troubleshooting

### PDF tidak generate
- Check PDF template ada dalam `pdf_templates/`
- Check field names dalam PDF form match dengan mapping
- Check logs: `tail -f logs/app.log`

### Webhook tidak sampai
- Check `WEBHOOK_URL` betul
- Check `WEBHOOK_ENABLED=true`
- Check webhook endpoint accessible
- Check logs untuk errors

### Files tidak auto-delete
- Check `AUTO_CLEANUP_ENABLED=true`
- Check `CLEANUP_RETENTION_MINUTES` setting
- Check cleanup service running: logs akan show "Cleanup completed"

---

## Security Notes

⚠️ **IMPORTANT:**

1. **API Key** - WAJIB tukar untuk production
2. **Webhook URL** - Jangan share publicly
3. **File Permissions** - Set proper permissions (755 for directories, 644 for files)
4. **HTTPS** - Guna HTTPS untuk production
5. **Firewall** - Restrict access to port 4000

---

## Support

Untuk soalan atau issue, hubungi developer atau rujuk documentation.

---

## License

Proprietary - Untuk kegunaan dalaman company sahaja.
