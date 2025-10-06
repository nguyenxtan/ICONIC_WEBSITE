#!/bin/bash
# ICONIC LOGISTICS - Server Setup Script
# Ubuntu 22.04 LTS / Debian 12

set -e

echo "🚀 ICONIC LOGISTICS - Server Setup"
echo ""

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    echo "⚠️  Please do not run as root."
    exit 1
fi

echo "Step 1: Updating system..."
sudo apt update && sudo apt upgrade -y

echo "Step 2: Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

echo "Step 3: Installing PostgreSQL 16..."
sudo apt install -y postgresql-16 postgresql-contrib-16
sudo systemctl enable postgresql
sudo systemctl start postgresql

echo "Step 4: Installing Nginx..."
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

echo "Step 5: Installing PM2..."
sudo npm install -g pm2

echo "Step 6: Installing tools..."
sudo apt install -y git htop curl wget ufw certbot python3-certbot-nginx

echo "✅ Setup completed!"
