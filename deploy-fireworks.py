#!/usr/bin/env python3
"""
Deploy Malaysia Blaze Shop to fireworksmalaysia.com
"""

import ftplib
import os
from pathlib import Path

FTP_HOST = os.environ.get("FIREWORKS_FTP_HOST")
FTP_USER = os.environ.get("FIREWORKS_FTP_USER")
FTP_PASS = os.environ.get("FIREWORKS_FTP_PASS")
FTP_PATH = os.environ.get("FIREWORKS_REMOTE_DIR", "/fireworksmalaysia.com")
BUILD_DIR = Path(os.environ.get("FIREWORKS_BUILD_DIR", "dist"))

def upload_file(ftp, local_path, remote_path):
    """Upload a single file"""
    try:
        with open(local_path, 'rb') as file:
            ftp.storbinary(f'STOR {remote_path}', file)
        print(f"✅ Uploaded: {remote_path}")
        return True
    except Exception as e:
        print(f"❌ Failed to upload {remote_path}: {e}")
        return False

def upload_directory(ftp, local_dir, remote_dir=""):
    """Recursively upload directory"""
    uploaded = 0
    failed = 0
    
    for root, dirs, files in os.walk(local_dir):
        # Calculate relative path
        rel_path = os.path.relpath(root, local_dir)
        if rel_path == ".":
            remote_root = remote_dir
        else:
            remote_root = f"{remote_dir}/{rel_path}".replace("\\", "/")
        
        # Create remote directory if needed
        if remote_root and remote_root != remote_dir:
            try:
                ftp.mkd(remote_root)
                print(f"📁 Created directory: {remote_root}")
            except:
                pass  # Directory might already exist
        
        # Upload files in current directory
        for file in files:
            local_file = os.path.join(root, file)
            remote_file = f"{remote_root}/{file}".replace("\\", "/") if remote_root else file
            
            if upload_file(ftp, local_file, remote_file):
                uploaded += 1
            else:
                failed += 1
    
    return uploaded, failed

def main():
    print("🎆 Malaysia Blaze Shop Deployment to fireworksmalaysia.com")

    if not FTP_HOST or not FTP_USER or not FTP_PASS:
        print("❌ FTP credentials missing. Set FIREWORKS_FTP_HOST, FIREWORKS_FTP_USER, FIREWORKS_FTP_PASS.")
        return

    if not BUILD_DIR.exists():
        print(f"❌ {BUILD_DIR} folder not found. Run 'npm run build' first.")
        return

    try:
        print(f"📡 Connecting to {FTP_HOST}...")
        with ftplib.FTP(FTP_HOST) as ftp:
            ftp.login(FTP_USER, FTP_PASS)
            ftp.cwd(FTP_PATH)
            print("✅ Connected to FTP server")

            uploaded = 0
            failed = 0

            # Upload all files from dist folder
            print("📤 Uploading website files...")
            for item in BUILD_DIR.iterdir():
                if item.is_file():
                    if upload_file(ftp, str(item), item.name):
                        uploaded += 1
                    else:
                        failed += 1
                elif item.is_dir():
                    dir_uploaded, dir_failed = upload_directory(ftp, str(item), item.name)
                    uploaded += dir_uploaded
                    failed += dir_failed

            # Create .htaccess for better routing
            htaccess_content = '''# Fireworks Malaysia .htaccess
RewriteEngine On

# Handle React Router
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Cache control
<FilesMatch "\\.(ico|jpg|jpeg|png|gif|svg|js|css|swf|woff|woff2|ttf|eot)$">
    Header set Cache-Control "max-age=604800, public"
</FilesMatch>
'''

            tmp_htaccess = Path('/tmp/htaccess')
            tmp_htaccess.write_text(htaccess_content)

            if upload_file(ftp, str(tmp_htaccess), '.htaccess'):
                uploaded += 1
            tmp_htaccess.unlink(missing_ok=True)

        print(f"\n📊 Deployment Summary:")
        print(f"✅ Uploaded: {uploaded} files")
        print(f"❌ Failed: {failed} files")

        if failed == 0:
            print(f"\n🎉 Deployment successful!")
            print(f"🌐 Your website is live at: https://fireworksmalaysia.com")
            print(f"\n🎆 Malaysia Blaze Shop is ready for business!")
        else:
            print(f"\n⚠️  Deployment completed with {failed} errors.")

    except Exception as e:
        print(f"❌ Deployment failed: {e}")

if __name__ == "__main__":
    main()
