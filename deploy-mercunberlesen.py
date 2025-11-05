#!/usr/bin/env python3

import ftplib
import os
import sys
from pathlib import Path

FTP_HOST = os.environ.get("MERCUN_FTP_HOST")
FTP_USER = os.environ.get("MERCUN_FTP_USER")
FTP_PASS = os.environ.get("MERCUN_FTP_PASS")
REMOTE_DIR = os.environ.get("MERCUN_REMOTE_DIR", "/mercunberlesen.com")
LOCAL_DIR = os.environ.get("MERCUN_BUILD_DIR", "dist")

def deploy_mercunberlesen():
    """Deploy MercunBerlesen website to hosting"""
    
    print("🌙 Starting MercunBerlesen.com Deployment...")
    print("=" * 50)
    
    if not FTP_HOST or not FTP_USER or not FTP_PASS:
        print("❌ FTP credentials missing. Set MERCUN_FTP_HOST, MERCUN_FTP_USER, MERCUN_FTP_PASS.")
        return False

    # Check if dist directory exists
    if not os.path.exists(LOCAL_DIR):
        print(f"❌ Error: {LOCAL_DIR} directory not found!")
        print("Please run 'npm run build' first")
        return False
    
    try:
        # Connect to FTP
        print(f"📡 Connecting to {FTP_HOST}...")
        with ftplib.FTP(FTP_HOST) as ftp:
            ftp.login(FTP_USER, FTP_PASS)
            print("✅ Connected successfully!")

            # Change to remote directory
            try:
                ftp.cwd(REMOTE_DIR)
                print(f"📁 Changed to directory: {REMOTE_DIR}")
            except ftplib.error_perm:
                print(f"❌ Cannot access directory: {REMOTE_DIR}")
                return False
        
            # Upload files
            uploaded = 0
            failed = 0

            def upload_file(local_path, remote_path):
                nonlocal uploaded, failed
                try:
                    with open(local_path, 'rb') as file:
                        ftp.storbinary(f'STOR {remote_path}', file)
                    print(f"  ✅ {remote_path}")
                    uploaded += 1
                except Exception as e:
                    print(f"  ❌ {remote_path} - Error: {e}")
                    failed += 1
        
            # Upload root files
            print("\n🚀 Uploading MercunBerlesen files...")
            root_files = ['index.html', 'favicon.ico', 'robots.txt', 'placeholder.svg', 'sitemap.xml']
            for file in root_files:
                local_file = os.path.join(LOCAL_DIR, file)
                if os.path.exists(local_file):
                    upload_file(local_file, file)

            # Upload pre-rendered HTML files
            html_files = ['products.html', 'cartons.html', 'packages.html', 'permit-guide.html',
                          'safety-guide.html', 'testimonials.html', 'contact.html', 'cart.html']
            for file in html_files:
                local_file = os.path.join(LOCAL_DIR, file)
                if os.path.exists(local_file):
                    upload_file(local_file, file)

            # Upload assets directory
            assets_dir = os.path.join(LOCAL_DIR, 'assets')
            if os.path.exists(assets_dir):
                print("\n📦 Uploading assets...")
                # Ensure assets directory exists on remote
                try:
                    ftp.mkd('assets')
                except ftplib.error_perm:
                    pass  # Directory already exists

                for asset_file in os.listdir(assets_dir):
                    local_asset = os.path.join(assets_dir, asset_file)
                    upload_file(local_asset, f'assets/{asset_file}')

            # Create .htaccess for React Router and Berlesen theme
            print("\n⚙️  Creating .htaccess for MercunBerlesen...")
            htaccess_content = """# MercunBerlesen.com - Berlesen Theme Configuration
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# React Router - Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security Headers for Berlesen celebrations
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Cache Control for better performance
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Directory Index
DirectoryIndex index.html
"""

            # Upload .htaccess
            try:
                from io import BytesIO
                htaccess_file = BytesIO(htaccess_content.encode('utf-8'))
                ftp.storbinary('STOR .htaccess', htaccess_file)
                print("  ✅ .htaccess")
                uploaded += 1
            except Exception as e:
                print(f"  ❌ .htaccess - Error: {e}")
                failed += 1

        # Summary
        print("\n" + "=" * 50)
        print("🌙 MercunBerlesen.com Deployment Complete!")
        print(f"✅ Files uploaded: {uploaded}")
        print(f"❌ Files failed: {failed}")
        print(f"🎉 Website: https://mercunberlesen.com")
        print("Mercun Berlesen Terbaik! 🌙✨")

        return failed == 0
        
    except Exception as e:
        print(f"❌ Deployment failed: {e}")
        return False

if __name__ == "__main__":
    success = deploy_mercunberlesen()
    sys.exit(0 if success else 1)
