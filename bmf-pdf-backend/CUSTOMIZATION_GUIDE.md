# Panduan Customization untuk Company Lain

Guide lengkap untuk setup PDF service untuk company baru.

---

## Step 1: Prepare PDF Templates

### 1.1 Dapatkan PDF Forms

Minta PDF forms dari company baru (contoh: permit application, agreement form, etc)

### 1.2 Check PDF Field Names

Guna Adobe Acrobat atau online tool untuk check field names dalam PDF:

```bash
# Install pdf-lib atau guna online tool
# Contoh field names:
# - Text1, Text2, Text3 (generic names)
# - applicant_name, ic_number (descriptive names)
```

### 1.3 Letakkan dalam pdf_templates/

```bash
cp /path/to/company-form.pdf pdf_templates/
```

---

## Step 2: Update Field Mappings

Edit `src/services/pdfService.ts`:

### 2.1 Cari section Field Mappings (line ~50)

```typescript
const fieldMappings: { [key: string]: string } = {
  // GANTI DENGAN FIELD NAMES COMPANY BARU

  // Format: 'frontendFieldName': 'pdfFieldName'

  // Example untuk GRK Fireworks (current):
  'applicantName': 'Text1',
  'applicantIc': 'Text2',
  'businessName': 'Text3',
  'businessAddress': 'Text4',

  // Example untuk Company Baru (ganti dengan field names sebenar):
  // 'customerName': 'customer_name_field',
  // 'customerId': 'id_field',
  // 'productName': 'product_field',
  // ...
};
```

### 2.2 Update PDF Template Filenames

```typescript
// Line ~100: Update template filenames
const templateFiles = [
  'company-form-1.pdf',  // Ganti dengan nama file sebenar
  'company-form-2.pdf',
  // Add more templates...
];
```

---

## Step 3: Update Webhook Integration

Edit `src/services/webhookService.ts`:

### 3.1 Customize Webhook Payload (line ~30)

```typescript
const payload = {
  // Header info
  timestamp: new Date().toISOString(),
  company: 'NEW_COMPANY_NAME',  // GANTI company name
  service: 'pdf-generation',

  // Customer data
  formData: {
    ...data,  // All form fields
  },

  // Generated files
  pdfUrl: result.pdfUrl,
  folderName: result.folderName,

  // Add custom fields specific to company:
  // industry: 'retail',
  // region: 'KL',
  // priority: data.urgentOrder ? 'high' : 'normal',
};
```

### 3.2 Update Webhook URL

Edit `.env`:
```bash
WEBHOOK_URL=https://hook.integrator.boost.space/NEW_WEBHOOK_ID
```

---

## Step 4: Generate New API Key

### 4.1 Generate Secure Key

```bash
# Method 1: OpenSSL
openssl rand -base64 32

# Method 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Example output:
# abc123_new_company_XyZ456==
```

### 4.2 Update .env

```bash
API_KEY=abc123_new_company_XyZ456==
```

### 4.3 Update Frontend

Update frontend code untuk guna API key baru:

```typescript
// Frontend API call
const response = await fetch('https://api.company.com/api/pdf/generate', {
  method: 'POST',
  headers: {
    'x-api-key': 'abc123_new_company_XyZ456==',  // GANTI
  },
  body: formData,
});
```

---

## Step 5: Customize Output Structure

### 5.1 Update Folder Naming (optional)

Edit `src/services/pdfService.ts` line ~150:

```typescript
// Current format: 2025-11-05-john-doe-1234
const folderName = `${dateStr}-${sanitizedName}-${randomSuffix}`;

// Custom format examples:
// Option 1: Include company prefix
const folderName = `${companyPrefix}-${dateStr}-${sanitizedName}`;

// Option 2: Use customer ID
const folderName = `${customerId}-${dateStr}`;

// Option 3: Category-based
const folderName = `${category}/${dateStr}-${sanitizedName}`;
```

### 5.2 Update Filename Pattern (optional)

```typescript
// Current: 2025-11-05-john-doe-merged.pdf
const filename = `${dateStr}-${sanitizedName}-merged.pdf`;

// Custom examples:
// Option 1: Include reference number
const filename = `${referenceNo}-${sanitizedName}.pdf`;

// Option 2: Include document type
const filename = `${docType}-${dateStr}.pdf`;
```

---

## Step 6: Configure Auto-Cleanup

Edit `.env` based on company requirements:

```bash
# Example 1: Keep files for 24 hours (monitoring/audit)
CLEANUP_RETENTION_MINUTES=1440

# Example 2: Delete immediately (privacy-sensitive data)
CLEANUP_RETENTION_MINUTES=0
CLEANUP_AFTER_RESPONSE=true

# Example 3: Keep for 1 week (customer can re-download)
CLEANUP_RETENTION_MINUTES=10080

# Example 4: Disable cleanup (permanent storage)
AUTO_CLEANUP_ENABLED=false
```

---

## Step 7: Update Validation Rules

Edit `src/utils/validators.ts`:

```typescript
// Update required fields based on company forms
const requiredFields = [
  'applicantName',      // GANTI dengan fields company baru
  'applicantIc',
  'businessName',
  // Add new company's required fields:
  // 'customerEmail',
  // 'orderNumber',
  // 'deliveryAddress',
];

// Add custom validation logic
export const validateFormData = (data: any): boolean => {
  // Check required fields
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Add custom validations:
  // if (data.email && !isValidEmail(data.email)) {
  //   throw new Error('Invalid email format');
  // }

  // if (data.phoneNumber && !isValidPhone(data.phoneNumber)) {
  //   throw new Error('Invalid phone number');
  // }

  return true;
};
```

---

## Step 8: Update Deployment Configuration

### 8.1 Update .env.production

```bash
# Server
PORT=4000
HOST=0.0.0.0

# API Key (use generated key from Step 4)
API_KEY=abc123_new_company_XyZ456==

# VPS Paths - GANTI dengan company name
TEMPLATE_DIR=/var/www/new-company-pdf/pdf_templates
OUTPUT_DIR=/var/www/new-company-pdf/customers

# Public URLs - GANTI dengan domain company
PUBLIC_BASE_URL=https://newcompany.com/customers
STATIC_PREFIX=/customers

# Webhook - GANTI dengan company's webhook
WEBHOOK_URL=https://hook.integrator.boost.space/NEW_WEBHOOK_ID
WEBHOOK_ENABLED=true

# Logging
LOG_LEVEL=info

# Cleanup (adjust based on company needs)
AUTO_CLEANUP_ENABLED=true
CLEANUP_RETENTION_MINUTES=15
```

### 8.2 Create Deployment Script

Create `deploy-new-company.sh`:

```bash
#!/bin/bash
# Deployment script untuk New Company

COMPANY_NAME="newcompany"
VPS_IP="xxx.xxx.xxx.xxx"
VPS_USER="root"
VPS_PATH="/var/www/${COMPANY_NAME}-pdf"

echo "Deploying PDF Service for ${COMPANY_NAME}..."

# Build
npm run build

# Create tarball
tar -czf pdf-service.tar.gz \
  dist/ \
  package.json \
  .env.production \
  pdf_templates/

# Upload to VPS
scp pdf-service.tar.gz ${VPS_USER}@${VPS_IP}:/tmp/

# Deploy on VPS
ssh ${VPS_USER}@${VPS_IP} << 'EOF'
  cd ${VPS_PATH}
  tar -xzf /tmp/pdf-service.tar.gz
  npm install --production
  pm2 restart pdf-service-${COMPANY_NAME}
EOF

echo "Deployment complete!"
```

---

## Step 9: Testing

### 9.1 Test Locally

```bash
# Start service
npm run dev

# Test API
curl -X POST http://localhost:4000/api/pdf/generate \
  -H "x-api-key: abc123_new_company_XyZ456==" \
  -F "applicantName=Test Customer" \
  -F "applicantIc=123456789012"

# Check response
# - PDF generated?
# - Fields filled correctly?
# - Webhook sent?
```

### 9.2 Test on VPS

```bash
# Test production API
curl -X POST https://newcompany.com/api/pdf/generate \
  -H "x-api-key: abc123_new_company_XyZ456==" \
  -F "applicantName=Test Customer" \
  -F "applicantIc=123456789012"

# Verify:
# - PDF accessible via public URL?
# - Auto-cleanup working?
# - Webhook received at destination?
```

---

## Step 10: Documentation for New Company

Create `COMPANY_NAME_SETUP.md` dengan info:

### 10.1 API Documentation

```markdown
# PDF Generation API - [Company Name]

## Endpoint
POST https://newcompany.com/api/pdf/generate

## Headers
- x-api-key: abc123_new_company_XyZ456==
- Content-Type: multipart/form-data

## Fields
| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| customerName | string | Yes | Full name |
| customerId | string | Yes | ID number |
| orderNumber | string | Yes | Order reference |
| ... | ... | ... | ... |

## Response Example
{
  "success": true,
  "data": {
    "pdfUrl": "https://newcompany.com/customers/.../document.pdf"
  }
}
```

### 10.2 Integration Guide

```markdown
# Frontend Integration

## React Example
const handleSubmit = async (formData) => {
  const response = await fetch('https://newcompany.com/api/pdf/generate', {
    method: 'POST',
    headers: {
      'x-api-key': 'abc123_new_company_XyZ456==',
    },
    body: formData,
  });

  const result = await response.json();
  console.log('PDF URL:', result.data.pdfUrl);
};
```

---

## Checklist untuk New Company

- [ ] PDF templates prepared dan letakkan dalam `pdf_templates/`
- [ ] Field mappings updated dalam `pdfService.ts`
- [ ] Webhook URL configured dan tested
- [ ] New API key generated dan configured
- [ ] .env.production updated dengan company settings
- [ ] Validation rules updated untuk company requirements
- [ ] Deployment script prepared
- [ ] Local testing completed successfully
- [ ] VPS deployment completed
- [ ] Production testing completed
- [ ] Webhook integration verified
- [ ] Auto-cleanup tested
- [ ] API documentation provided to company
- [ ] Frontend integration completed

---

## Common Issues & Solutions

### Issue: PDF fields not filling
**Solution:** Check field mappings match PDF form field names

### Issue: Webhook not received
**Solution:** Verify webhook URL dan check WEBHOOK_ENABLED=true

### Issue: Files not auto-deleting
**Solution:** Check AUTO_CLEANUP_ENABLED=true dan retention settings

### Issue: Permission denied errors on VPS
**Solution:** Check folder permissions (755 for directories, 644 for files)

---

## Support

Untuk bantuan customization, hubungi developer.
