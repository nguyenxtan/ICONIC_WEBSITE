#!/bin/bash
# ICONIC LOGISTICS - Deploy Script

set -e

echo "🚀 Deploying ICONIC LOGISTICS..."

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Run migrations
echo "🗃️ Running migrations..."
npx prisma migrate deploy

# Build app
echo "🏗️ Building application..."
npm run build

# Restart PM2
echo "🔄 Restarting application..."
pm2 restart iconic-website || pm2 start npm --name "iconic-website" -- start

pm2 save

echo "✅ Deployment completed!"
