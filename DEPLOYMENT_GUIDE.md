# 🚀 ICONIC LOGISTICS - Hướng Dẫn Deploy Self-Hosted

Tài liệu hướng dẫn chi tiết cách deploy ICONIC LOGISTICS CMS trên server Ubuntu/Debian với PostgreSQL tự dựng.

---

## 📋 Yêu Cầu Hệ Thống

### Server Requirements
- **OS**: Ubuntu 22.04 LTS hoặc Debian 12 (khuyến nghị)
- **RAM**: Tối thiểu 2GB (khuyến nghị 4GB+)
- **CPU**: 2 cores trở lên
- **Disk**: 20GB+ dung lượng trống
- **Network**: Public IP với port 80, 443 mở

### Software Requirements
- Node.js 20.x
- PostgreSQL 16.x
- Nginx (reverse proxy)
- PM2 (process manager) hoặc Docker + Docker Compose
- Git

---

## 🎯 PHƯƠNG ÁN 1: Deploy với PM2 (Traditional)

### Bước 1: Cài Đặt Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL 16
sudo apt install -y postgresql-16 postgresql-contrib-16

# Install Nginx
sudo apt install -y nginx

# Install PM2 globally
sudo npm install -g pm2

# Install Git
sudo apt install -y git
```

### Bước 2: Cấu Hình PostgreSQL

```bash
# Switch to postgres user
sudo -u postgres psql

# Trong PostgreSQL shell, chạy các lệnh sau:
```

```sql
-- Create database user
CREATE USER iconic_user WITH PASSWORD 'YOUR_STRONG_PASSWORD';

-- Create database
CREATE DATABASE iconic_logistics;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE iconic_logistics TO iconic_user;

-- Grant schema privileges
\c iconic_logistics
GRANT ALL ON SCHEMA public TO iconic_user;

-- Exit
\q
```

```bash
# Test connection
psql -U iconic_user -d iconic_logistics -h localhost
```

### Bước 3: Clone Repository

```bash
# Create app directory
sudo mkdir -p /var/www/iconic-website
sudo chown -R $USER:$USER /var/www/iconic-website

# Clone repository
cd /var/www
git clone https://github.com/nguyenxtan/ICONIC_WEBSITE.git iconic-website
cd iconic-website

# Install dependencies
npm ci --only=production
```

### Bước 4: Cấu Hình Environment Variables

```bash
# Create .env file
cat > .env << 'ENVEOF'
# PostgreSQL Connection
DATABASE_URL="postgresql://iconic_user:YOUR_STRONG_PASSWORD@localhost:5432/iconic_logistics?schema=public"
DIRECT_URL="postgresql://iconic_user:YOUR_STRONG_PASSWORD@localhost:5432/iconic_logistics?schema=public"

# Environment
NODE_ENV=production

# JWT Secret (generate with: openssl rand -base64 64)
JWT_SECRET="PASTE_GENERATED_SECRET_HERE"

# Site URL
SITE_URL="https://iconiclogs.com"
ENVEOF

# Generate strong JWT secret
openssl rand -base64 64
# Copy output và paste vào JWT_SECRET trong .env
```

### Bước 5: Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed initial data (admin user, sample posts, services)
npm run prisma:seed
```

**Tài khoản admin mặc định:**
- Email: `admin@iconiclogs.com`
- Password: `admin123`

⚠️ **Đổi password ngay sau khi login lần đầu!**

### Bước 6: Build Application

```bash
# Build Next.js app
npm run build

# Test locally first
npm start
# Truy cập http://YOUR_SERVER_IP:3000 để kiểm tra
# Nhấn Ctrl+C để dừng
```

### Bước 7: Setup PM2

```bash
# Start application with PM2
pm2 start npm --name "iconic-website" -- start

# Save PM2 process list
pm2 save

# Setup PM2 auto-start on boot
pm2 startup
# Copy và chạy lệnh mà PM2 output

# Verify PM2 status
pm2 status
pm2 logs iconic-website

# Useful PM2 commands:
pm2 restart iconic-website    # Restart app
pm2 stop iconic-website        # Stop app
pm2 delete iconic-website      # Remove from PM2
pm2 monit                      # Monitor resources
```

### Bước 8: Cấu Hình Nginx Reverse Proxy

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/iconic-website
```

Paste nội dung sau:

```nginx
server {
    listen 80;
    server_name iconiclogs.com www.iconiclogs.com;

    # Logs
    access_log /var/log/nginx/iconic-website-access.log;
    error_log /var/log/nginx/iconic-website-error.log;

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }

    # Media uploads
    location /uploads {
        alias /var/www/iconic-website/public/uploads;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/iconic-website /etc/nginx/sites-enabled/

# Test Nginx config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Bước 9: Setup SSL với Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d iconiclogs.com -d www.iconiclogs.com

# Certbot sẽ tự động cấu hình HTTPS redirect
# Certificate sẽ tự động renew mỗi 60 ngày

# Test auto-renewal
sudo certbot renew --dry-run
```

### Bước 10: Setup GitHub Actions CI/CD

#### 10.1. Tạo SSH Key cho GitHub Actions

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "github-actions@iconic" -f ~/.ssh/github-actions

# Add public key to authorized_keys
cat ~/.ssh/github-actions.pub >> ~/.ssh/authorized_keys

# Copy private key
cat ~/.ssh/github-actions
# Copy toàn bộ output (bắt đầu với -----BEGIN OPENSSH PRIVATE KEY-----)
```

#### 10.2. Thêm GitHub Secrets

Vào repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Thêm các secrets sau:

| Secret Name | Value | Mô tả |
|------------|-------|-------|
| `SERVER_HOST` | `YOUR_SERVER_IP` | IP hoặc domain của server |
| `SERVER_USER` | `your-username` | SSH username (thường là ubuntu/root) |
| `SERVER_SSH_KEY` | `paste-private-key` | Nội dung file `~/.ssh/github-actions` |
| `SERVER_PORT` | `22` | SSH port (mặc định 22) |
| `DEPLOY_PATH` | `/var/www/iconic-website` | Đường dẫn app trên server |
| `DATABASE_URL` | `postgresql://...` | Connection string |
| `DIRECT_URL` | `postgresql://...` | Direct connection |
| `JWT_SECRET` | `your-secret` | JWT secret key |
| `SITE_URL` | `https://iconiclogs.com` | Production URL |

#### 10.3. Test Deployment

```bash
# Commit và push code
git add .
git commit -m "feat: setup self-hosted deployment"
git push origin main

# Theo dõi deployment tại GitHub Actions tab
```

### Bước 11: Script Deploy Thủ Công

Tạo script để deploy nhanh:

```bash
# Create deploy script
cat > /var/www/iconic-website/deploy.sh << 'DEPLOYEOF'
#!/bin/bash
set -e

echo "🚀 Deploying ICONIC LOGISTICS Website..."

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
pm2 restart iconic-website

echo "✅ Deployment completed successfully!"
DEPLOYEOF

# Make executable
chmod +x /var/www/iconic-website/deploy.sh

# Chạy script khi cần deploy:
./deploy.sh
```

---

## 🐳 PHƯƠNG ÁN 2: Deploy với Docker Compose

### Bước 1: Cài Đặt Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo apt install -y docker-compose-plugin

# Verify installation
docker --version
docker compose version
```

### Bước 2: Clone Repository

```bash
sudo mkdir -p /var/www/iconic-website
sudo chown -R $USER:$USER /var/www/iconic-website
git clone https://github.com/nguyenxtan/ICONIC_WEBSITE.git /var/www/iconic-website
cd /var/www/iconic-website
```

### Bước 3: Cấu Hình Environment

```bash
# Create .env file for Docker Compose
cat > .env << 'ENVEOF'
# Database password
DB_PASSWORD=YOUR_STRONG_DB_PASSWORD

# JWT Secret (generate with: openssl rand -base64 64)
JWT_SECRET=PASTE_GENERATED_SECRET_HERE

# Site URL
SITE_URL=https://iconiclogs.com
ENVEOF

# Generate JWT secret
openssl rand -base64 64
# Copy và paste vào .env
```

### Bước 4: Build và Start Containers

```bash
# Build images
docker compose build

# Start containers
docker compose up -d

# Check container status
docker compose ps

# View logs
docker compose logs -f web
docker compose logs -f db

# Run database migrations
docker compose exec web npx prisma migrate deploy

# Seed initial data
docker compose exec web npm run prisma:seed
```

### Bước 5: Setup Nginx với Docker

Cấu hình Nginx giống phương án 1, nhưng proxy pass vẫn đến `http://localhost:3000` vì Docker expose port 3000.

### Bước 6: Useful Docker Commands

```bash
# Restart all containers
docker compose restart

# Restart specific container
docker compose restart web

# Stop all containers
docker compose down

# Stop and remove volumes (⚠️ XÓA DATA)
docker compose down -v

# View container logs
docker compose logs -f

# Execute command in container
docker compose exec web npm run prisma:studio

# Rebuild and restart
docker compose up -d --build

# Clean old images
docker image prune -a -f
```

### Bước 7: Auto Deploy với Docker

Workflow đã có sẵn trong `.github/workflows/deploy-docker.yml`.

Thêm GitHub Secrets:
- `SERVER_HOST`
- `SERVER_USER`
- `SERVER_SSH_KEY`
- `SERVER_PORT` (optional, default 22)
- `DB_PASSWORD`
- `JWT_SECRET`
- `SITE_URL`

Mỗi lần push code lên `main`, GitHub Actions sẽ tự động:
1. SSH vào server
2. Pull code mới
3. Build Docker image
4. Restart containers

---

## 🔧 Bảo Trì & Troubleshooting

### Backup Database

```bash
# With PM2 deployment
pg_dump -U iconic_user -d iconic_logistics > backup_$(date +%Y%m%d).sql

# With Docker
docker compose exec db pg_dump -U iconic_user iconic_logistics > backup_$(date +%Y%m%d).sql

# Restore
psql -U iconic_user -d iconic_logistics < backup_20240101.sql
# or
docker compose exec -T db psql -U iconic_user iconic_logistics < backup_20240101.sql
```

### Logs Monitoring

```bash
# PM2 logs
pm2 logs iconic-website
pm2 logs iconic-website --lines 100

# Docker logs
docker compose logs -f web
docker compose logs -f --tail=100 web

# Nginx logs
sudo tail -f /var/log/nginx/iconic-website-access.log
sudo tail -f /var/log/nginx/iconic-website-error.log

# PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-16-main.log
```

### Database Reset

```bash
# ⚠️ CHỈ dùng trong development!
npm run prisma:reset
# or
docker compose exec web npm run prisma:reset
```

### Common Issues

#### Port 3000 already in use
```bash
# Find process
sudo lsof -i :3000
# Kill process
sudo kill -9 PID
```

#### PostgreSQL connection refused
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql
```

#### Prisma Client outdated
```bash
npm run prisma:generate
pm2 restart iconic-website
```

#### Out of disk space
```bash
# Check disk usage
df -h

# Clean logs
sudo journalctl --vacuum-time=7d

# Clean Docker (if using Docker)
docker system prune -a -f
```

---

## 📊 Monitoring & Performance

### Setup System Monitoring

```bash
# Install htop
sudo apt install -y htop

# Monitor system resources
htop

# Check memory usage
free -h

# Check disk usage
df -h
du -sh /var/www/iconic-website

# Monitor PostgreSQL
sudo -u postgres psql -c "SELECT * FROM pg_stat_activity;"
```

### PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# Web dashboard (optional)
pm2 web
# Access http://YOUR_SERVER_IP:9615
```

---

## 🔒 Bảo Mật

### Firewall Configuration

```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

### Fail2Ban (chống brute-force)

```bash
# Install
sudo apt install -y fail2ban

# Create config
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Enable and start
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Check status
sudo fail2ban-client status
```

### PostgreSQL Security

```bash
# Edit pg_hba.conf
sudo nano /etc/postgresql/16/main/pg_hba.conf

# Ensure local connections use md5:
# local   all   all   md5
# host    all   all   127.0.0.1/32   md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

---

## 🎯 Performance Tuning

### Next.js Optimization

Already configured:
- ✅ `output: 'standalone'` for minimal Docker image
- ✅ Static asset caching
- ✅ Image optimization with Next.js Image component

### PostgreSQL Tuning

```bash
# Edit PostgreSQL config
sudo nano /etc/postgresql/16/main/postgresql.conf

# Recommended settings for 4GB RAM server:
shared_buffers = 1GB
effective_cache_size = 3GB
maintenance_work_mem = 256MB
work_mem = 16MB
max_connections = 100

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Nginx Caching

Already configured in Nginx config:
- Static files: 365 days cache
- Uploads: 7 days cache

---

## 📞 Support

- **GitHub**: https://github.com/nguyenxtan/ICONIC_WEBSITE
- **Email**: info@iconiclogs.com
- **Phone**: 0986066174

---

## ✅ Checklist Deploy

- [ ] Server đã cài đặt Node.js 20, PostgreSQL 16, Nginx
- [ ] PostgreSQL database và user đã tạo
- [ ] Repository đã clone về `/var/www/iconic-website`
- [ ] File `.env` đã cấu hình đúng
- [ ] Database migrations đã chạy thành công
- [ ] Seed data đã import
- [ ] Application build thành công
- [ ] PM2/Docker đang chạy ổn định
- [ ] Nginx reverse proxy đã cấu hình
- [ ] SSL certificate đã cài đặt
- [ ] DNS A record đã trỏ về server IP
- [ ] GitHub Actions secrets đã thêm đầy đủ
- [ ] Firewall đã cấu hình (port 80, 443, 22)
- [ ] Backup script đã setup
- [ ] Admin password đã đổi

---

Built with ❤️ by ICONIC LOGISTICS
