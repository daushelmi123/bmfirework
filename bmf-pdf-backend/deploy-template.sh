#!/bin/bash

# ============================================
# PDF Service - VPS Deployment Script Template
# ============================================
# Customize variables below untuk company baru

# ============================================
# Configuration - EDIT THIS!
# ============================================
COMPANY_NAME="yourcompany"           # Nama company (lowercase, no spaces)
VPS_IP="xxx.xxx.xxx.xxx"             # VPS IP address
VPS_USER="root"                      # VPS username
VPS_PASSWORD="your_password"         # VPS password (optional if using SSH key)
VPS_PATH="/var/www/${COMPANY_NAME}-pdf"  # Installation path on VPS

# ============================================
# Colors for output
# ============================================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ============================================
# Helper functions
# ============================================
print_step() {
    echo -e "${GREEN}[STEP]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# ============================================
# Pre-deployment checks
# ============================================
print_step "Checking prerequisites..."

if [ ! -f ".env.production" ]; then
    print_error ".env.production file not found!"
    print_warning "Please create .env.production from .env.template"
    exit 1
fi

if [ ! -d "pdf_templates" ] || [ -z "$(ls -A pdf_templates)" ]; then
    print_error "pdf_templates directory is empty!"
    print_warning "Please add your PDF template files to pdf_templates/"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    print_error "node_modules not found!"
    print_warning "Please run 'npm install' first"
    exit 1
fi

print_step "All checks passed!"

# ============================================
# Build
# ============================================
print_step "Building project..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed!"
    exit 1
fi

print_step "Build completed successfully"

# ============================================
# Create deployment package
# ============================================
print_step "Creating deployment package..."

tar -czf pdf-service-${COMPANY_NAME}.tar.gz \
    dist/ \
    package.json \
    package-lock.json \
    .env.production \
    pdf_templates/

if [ $? -ne 0 ]; then
    print_error "Failed to create tarball!"
    exit 1
fi

print_step "Package created: pdf-service-${COMPANY_NAME}.tar.gz"

# ============================================
# Upload to VPS
# ============================================
print_step "Uploading to VPS..."

if [ -n "$VPS_PASSWORD" ]; then
    # Using password
    sshpass -p "$VPS_PASSWORD" scp -o StrictHostKeyChecking=no \
        pdf-service-${COMPANY_NAME}.tar.gz \
        ${VPS_USER}@${VPS_IP}:/tmp/
else
    # Using SSH key
    scp pdf-service-${COMPANY_NAME}.tar.gz \
        ${VPS_USER}@${VPS_IP}:/tmp/
fi

if [ $? -ne 0 ]; then
    print_error "Upload failed!"
    exit 1
fi

print_step "Upload completed"

# ============================================
# Deploy on VPS
# ============================================
print_step "Deploying on VPS..."

REMOTE_COMMANDS="
    # Create directory if not exists
    mkdir -p ${VPS_PATH}
    cd ${VPS_PATH}

    # Backup existing installation
    if [ -d 'dist' ]; then
        echo 'Creating backup...'
        tar -czf /tmp/backup-${COMPANY_NAME}-\$(date +%Y%m%d-%H%M%S).tar.gz .
    fi

    # Extract new files
    echo 'Extracting files...'
    tar -xzf /tmp/pdf-service-${COMPANY_NAME}.tar.gz

    # Rename .env.production to .env
    mv .env.production .env

    # Install production dependencies
    echo 'Installing dependencies...'
    npm install --production

    # Create required directories
    mkdir -p customers
    mkdir -p logs

    # Set permissions
    chmod -R 755 .

    # Setup PM2 if not already running
    if pm2 list | grep -q 'pdf-service-${COMPANY_NAME}'; then
        echo 'Restarting existing PM2 process...'
        pm2 restart pdf-service-${COMPANY_NAME}
    else
        echo 'Starting new PM2 process...'
        pm2 start dist/server.js --name pdf-service-${COMPANY_NAME}
        pm2 save
    fi

    echo 'Deployment completed successfully!'
"

if [ -n "$VPS_PASSWORD" ]; then
    # Using password
    sshpass -p "$VPS_PASSWORD" ssh -o StrictHostKeyChecking=no \
        ${VPS_USER}@${VPS_IP} "$REMOTE_COMMANDS"
else
    # Using SSH key
    ssh ${VPS_USER}@${VPS_IP} "$REMOTE_COMMANDS"
fi

if [ $? -ne 0 ]; then
    print_error "Deployment failed!"
    exit 1
fi

# ============================================
# Cleanup
# ============================================
print_step "Cleaning up..."
rm pdf-service-${COMPANY_NAME}.tar.gz

# ============================================
# Test deployment
# ============================================
print_step "Testing deployment..."
sleep 3  # Wait for service to start

# Get API key from .env.production
API_KEY=$(grep "^API_KEY=" .env.production | cut -d'=' -f2)

# Test health endpoint
print_step "Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s http://${VPS_IP}:4000/health)

if echo "$HEALTH_RESPONSE" | grep -q '"status":"ok"'; then
    print_step "Health check: ${GREEN}PASSED${NC}"
else
    print_warning "Health check failed or service not responding yet"
fi

# ============================================
# Summary
# ============================================
echo ""
echo "============================================"
echo -e "${GREEN}Deployment Summary${NC}"
echo "============================================"
echo "Company: ${COMPANY_NAME}"
echo "VPS: ${VPS_IP}"
echo "Path: ${VPS_PATH}"
echo "PM2 Process: pdf-service-${COMPANY_NAME}"
echo ""
echo "API Endpoint: http://${VPS_IP}:4000/api/pdf/generate"
echo "Health Check: http://${VPS_IP}:4000/health"
echo ""
echo "============================================"
echo "Next Steps:"
echo "============================================"
echo "1. Test API with: curl http://${VPS_IP}:4000/health"
echo "2. Configure Nginx/Apache reverse proxy"
echo "3. Setup SSL certificate"
echo "4. Update frontend with API endpoint"
echo "5. Test webhook integration"
echo ""
echo "To view logs on VPS:"
echo "  ssh ${VPS_USER}@${VPS_IP}"
echo "  pm2 logs pdf-service-${COMPANY_NAME}"
echo ""
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo "============================================"
