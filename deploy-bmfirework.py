#!/usr/bin/env python3

import ftplib
import os
import sys
from pathlib import Path

FTP_HOST = os.environ.get("BM_FIREWORK_FTP_HOST")
FTP_USER = os.environ.get("BM_FIREWORK_FTP_USER")
FTP_PASS = os.environ.get("BM_FIREWORK_FTP_PASS")
REMOTE_DIR = os.environ.get("BM_FIREWORK_REMOTE_DIR", "/bmfirework.com")
LOCAL_DIR = os.environ.get("BM_FIREWORK_BUILD_DIR", "dist")

def upload_file(ftp, local_path, remote_path):
    try:
        with open(local_path, 'rb') as f:
            ftp.storbinary(f'STOR {remote_path}', f)
        print(f"  ✅ {remote_path}")
        return True
    except Exception as e:
        print(f"  ❌ {remote_path} - Error: {e}")
        return False

def upload_directory(ftp, base_dir, remote_base):
    uploaded = 0
    failed = 0
    for root, _, files in os.walk(base_dir):
        rel = os.path.relpath(root, base_dir)
        remote_root = remote_base if rel == '.' else f"{remote_base}/{rel}".replace('\\', '/')
        if remote_root and remote_root != remote_base:
            try:
                ftp.mkd(remote_root)
                print(f"📁 Created directory: {remote_root}")
            except ftplib.error_perm:
                pass
        for file in files:
            local_file = os.path.join(root, file)
            remote_file = f"{remote_root}/{file}" if remote_root else file
            if upload_file(ftp, local_file, remote_file):
                uploaded += 1
            else:
                failed += 1
    return uploaded, failed

def main():
    print("🎆 Deploying bmfirework.com")
    if not FTP_HOST or not FTP_USER or not FTP_PASS:
        print("❌ FTP credentials missing. Set BM_FIREWORK_FTP_HOST, BM_FIREWORK_FTP_USER, BM_FIREWORK_FTP_PASS.")
        return False

    if not os.path.exists(LOCAL_DIR):
        print("❌ dist folder not found. Run 'npm run build' first.")
        return False

    try:
        print(f"📡 Connecting to {FTP_HOST}…")
        with ftplib.FTP(FTP_HOST) as ftp:
            ftp.login(FTP_USER, FTP_PASS)
            ftp.cwd(REMOTE_DIR)
            print("✅ Connected")

            # Upload site
            print("\n📤 Uploading website files…")
            uploaded, failed = upload_directory(ftp, LOCAL_DIR, "")

            # Upload .htaccess for SPA routing + headers
            print("\n⚙️  Writing .htaccess…")
            htaccess = """# bmfirework.com configuration\nRewriteEngine On\n\n# Force HTTPS\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n# React Router SPA fallback\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule . /index.html [L]\n\n# Security headers\n<IfModule mod_headers.c>\n    Header always set X-Content-Type-Options nosniff\n    Header always set X-Frame-Options DENY\n    Header always set X-XSS-Protection \"1; mode=block\"\n    Header always set Referrer-Policy \"strict-origin-when-cross-origin\"\n</IfModule>\n\n# Cache control\n<IfModule mod_expires.c>\n    ExpiresActive on\n    ExpiresByType text/css \"access plus 1 year\"\n    ExpiresByType application/javascript \"access plus 1 year\"\n    ExpiresByType image/png \"access plus 1 year\"\n    ExpiresByType image/jpg \"access plus 1 year\"\n    ExpiresByType image/jpeg \"access plus 1 year\"\n    ExpiresByType image/gif \"access plus 1 year\"\n    ExpiresByType image/svg+xml \"access plus 1 year\"\n</IfModule>\n"""
            from io import BytesIO
            ftp.storbinary('STOR .htaccess', BytesIO(htaccess.encode('utf-8')))
            print("  ✅ .htaccess")

        print("\n📊 Deployment Summary")
        print(f"✅ Uploaded: {uploaded}")
        print(f"❌ Failed: {failed}")
        if failed == 0:
            print("\n🎉 Deployment successful!")
            print("🌐 https://bmfirework.com")
        else:
            print("\n⚠️  Deployment completed with errors.")
        return failed == 0
    except Exception as e:
        print(f"❌ Deployment failed: {e}")
        return False

if __name__ == "__main__":
    ok = main()
    sys.exit(0 if ok else 1)
