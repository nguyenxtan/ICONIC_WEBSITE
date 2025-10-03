# Danh Sách Lệnh Thường Dùng

## 🚀 Development

```bash
# Start development server
npm run dev

# Start trên port khác
PORT=3001 npm run dev

# Open trong browser tự động
open http://localhost:3000
```

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Setup database
npm run prisma:migrate
npm run prisma:generate
npm run prisma:seed
```

## 🗄️ Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Create new migration
npx prisma migrate dev --name your_migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Seed database
npm run prisma:seed

# Open Prisma Studio (GUI)
npm run prisma:studio

# Pull schema from database
npx prisma db pull

# Push schema to database (dev only)
npx prisma db push

# Format schema file
npx prisma format
```

## 🏗️ Build & Production

```bash
# Build for production
npm run build

# Start production server
npm run start

# Build + Start
npm run build && npm run start

# Type check
npx tsc --noEmit

# Lint code
npm run lint
```

## 🧪 Testing & Quality

```bash
# Lint
npm run lint

# Format with prettier (if installed)
npx prettier --write .

# Type check
npx tsc --noEmit
```

## 🔐 Admin Tasks

### Create New Admin User

```bash
# Open Prisma Studio
npm run prisma:studio

# Go to users table → Add record
# - email: newadmin@iconiclogs.com
# - passwordHash: [use bcrypt online tool or create via code]
# - role: ADMIN
```

Or programmatically:

```bash
node -e "
const bcrypt = require('bcrypt');
bcrypt.hash('yourpassword', 10).then(console.log);
"
```

### Reset Admin Password

```bash
# Open Prisma Studio
npm run prisma:studio

# Find user → Update passwordHash
# Generate new hash:
node -e "
const bcrypt = require('bcrypt');
bcrypt.hash('newpassword123', 10).then(console.log);
"
```

## 📊 Database Queries

### View All Posts

```bash
npx prisma studio
# Navigate to posts table
```

Or via code:

```bash
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.post.findMany().then(console.log).finally(() => prisma.\$disconnect());
"
```

### Count Published Posts

```bash
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.post.count({ where: { status: 'PUBLISHED' } })
  .then(count => console.log('Published posts:', count))
  .finally(() => prisma.\$disconnect());
"
```

### View Contact Forms

```bash
npx prisma studio
# Navigate to contact_forms table
```

## 🧹 Cleanup

```bash
# Remove node_modules
rm -rf node_modules

# Remove build artifacts
rm -rf .next

# Clean install
rm -rf node_modules package-lock.json && npm install

# Clear Next.js cache
rm -rf .next
```

## 🔄 Git Commands

```bash
# Initial commit
git init
git add .
git commit -m "Initial commit: ICONIC LOGISTICS website"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/iconic-logistics.git
git branch -M main
git push -u origin main

# Create feature branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature
```

## 🌐 Deploy Commands

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Pull environment variables
vercel env pull .env.local

# Add environment variable
vercel env add DATABASE_URL
```

### Manual Deploy

```bash
# Build locally
npm run build

# Test production build
npm run start

# Deploy to server (example: via SCP)
scp -r .next package.json package-lock.json user@server:/var/www/iconic-logistics/
ssh user@server "cd /var/www/iconic-logistics && npm install --production && pm2 restart iconic-logistics"
```

## 🐳 Docker Commands (if using Docker)

```dockerfile
# Dockerfile example
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build image
docker build -t iconic-logistics .

# Run container
docker run -p 3000:3000 --env-file .env iconic-logistics

# Docker Compose
docker-compose up -d
```

## 📝 Content Management

### Bulk Import Posts (future)

```bash
# Create script: scripts/import-posts.ts
node scripts/import-posts.js posts.json
```

### Export Data

```bash
# Export posts to JSON
node -e "
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

prisma.post.findMany({ where: { status: 'PUBLISHED' } })
  .then(posts => {
    fs.writeFileSync('posts-export.json', JSON.stringify(posts, null, 2));
    console.log('Exported', posts.length, 'posts');
  })
  .finally(() => prisma.\$disconnect());
"
```

## 🔍 Debug Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check PostgreSQL connection
pg_isready

# Test DATABASE_URL
echo $DATABASE_URL

# View environment variables
printenv | grep DATABASE

# Check port usage
lsof -i :3000

# Kill process on port
kill -9 $(lsof -t -i:3000)
```

## 📊 Performance Analysis

```bash
# Analyze bundle size
npm run build
# Check .next/build-manifest.json

# Lighthouse CI (if installed)
npx lighthouse http://localhost:3000 --view

# Check dependencies size
npx cost-of-modules
```

## 🔧 Useful One-Liners

```bash
# Count files
find src -type f | wc -l

# Count lines of code
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Find large files
find . -type f -size +1M

# Search in files
grep -r "TODO" src/

# Remove .DS_Store files (Mac)
find . -name ".DS_Store" -delete
```

## 📱 Mobile Testing

```bash
# Find local IP
ifconfig | grep "inet " | grep -v 127.0.0.1

# Start server accessible on network
npm run dev -- -H 0.0.0.0

# Access from phone
# http://YOUR_LOCAL_IP:3000
```

## 🎯 Quick Fixes

```bash
# Prisma client out of sync
npm run prisma:generate

# Port already in use
PORT=3001 npm run dev

# Node modules corrupted
rm -rf node_modules package-lock.json && npm install

# Build cache issues
rm -rf .next && npm run build

# Database connection issues
npx prisma db pull # Test connection
```

---

💡 **Pro Tips**:

1. Add to `~/.bashrc` or `~/.zshrc`:
```bash
alias iconic-dev="cd ~/ICONIC_CMS && npm run dev"
alias iconic-studio="cd ~/ICONIC_CMS && npm run prisma:studio"
```

2. Create `package.json` scripts shortcuts:
```json
{
  "scripts": {
    "dev:studio": "concurrently \"npm run dev\" \"npm run prisma:studio\"",
    "reset": "rm -rf .next node_modules && npm install",
    "deploy": "git push && vercel --prod"
  }
}
```

3. Use VS Code tasks (`.vscode/tasks.json`):
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Dev",
      "type": "shell",
      "command": "npm run dev",
      "group": "build"
    }
  ]
}
```

---

Save this file for quick reference! 📌
