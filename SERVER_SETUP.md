# 🚀 Setup ICONIC LOGISTICS trên Server với PostgreSQL có sẵn

## 📍 Tình huống

Server đã có PostgreSQL đang chạy (container `n8n_postgres` ở port 5432).

## ✅ Giải pháp

Dùng luôn PostgreSQL có sẵn, không tạo container PostgreSQL mới.

---

## BƯỚC 1: Tạo Database cho ICONIC LOGISTICS

```bash
# Connect vào PostgreSQL container
docker exec -it n8n_postgres psql -U postgres

# Trong psql:
CREATE USER iconic_user WITH PASSWORD 'YOUR_STRONG_PASSWORD';
CREATE DATABASE iconic_logistics;
GRANT ALL PRIVILEGES ON DATABASE iconic_logistics TO iconic_user;

-- Switch to new database
\c iconic_logistics

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO iconic_user;

-- Exit
\q
```

**Lưu lại password của `iconic_user`!**

---

## BƯỚC 2: Tạo file .env

```bash
cd ~/iconic_web/ICONIC_WEBSITE

cat > .env << 'ENVEOF'
# Database password (thay YOUR_PASSWORD bằng password thật)
DB_PASSWORD=YOUR_STRONG_PASSWORD

# JWT Secret (generate with: openssl rand -base64 64)
JWT_SECRET=PASTE_YOUR_GENERATED_SECRET_HERE

# Site URL
SITE_URL=https://iconiclogs.com
ENVEOF

# Generate JWT secret
openssl rand -base64 64
# Copy output và paste vào .env
```

---

## BƯỚC 3: Build và Start với docker-compose.production.yml

```bash
# Build Docker image
docker compose -f docker-compose.production.yml build

# Start container
docker compose -f docker-compose.production.yml up -d

# Check logs
docker compose -f docker-compose.production.yml logs -f
```

---

## BƯỚC 4: Verify

```bash
# Check container status
docker ps | grep iconic_web

# Test website
curl http://localhost:3000

# Check database
docker exec -it n8n_postgres psql -U iconic_user -d iconic_logistics -c "\dt"
```

---

## 🔧 Các lệnh hữu ích

```bash
# Restart container
docker compose -f docker-compose.production.yml restart

# Stop container
docker compose -f docker-compose.production.yml down

# Rebuild and restart
docker compose -f docker-compose.production.yml up -d --build

# View logs
docker compose -f docker-compose.production.yml logs -f web

# Run migrations manually
docker compose -f docker-compose.production.yml exec web npx prisma migrate deploy

# Seed data
docker compose -f docker-compose.production.yml exec web npm run prisma:seed
```

---

## 🌐 Setup Nginx Reverse Proxy

```bash
# Create nginx config
sudo nano /etc/nginx/sites-available/iconic-website
```

Paste:

```nginx
server {
    listen 80;
    server_name iconiclogs.com www.iconiclogs.com;

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
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/iconic-website /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

---

## 🔒 Setup SSL (Let's Encrypt)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d iconiclogs.com -d www.iconiclogs.com
```

---

## 🐛 Troubleshooting

### Container không start

```bash
# Check logs
docker compose -f docker-compose.production.yml logs web

# Check if database accessible
docker exec -it iconic_web ping host.docker.internal
```

### Database connection refused

```bash
# Verify PostgreSQL running
docker ps | grep postgres

# Test connection from host
psql -U iconic_user -d iconic_logistics -h localhost

# Check DATABASE_URL in .env
cat .env
```

### Port 3000 already in use

```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill process
sudo kill -9 <PID>

# Or change port in docker-compose.production.yml
ports:
  - "3001:3000"  # Use port 3001 instead
```

---

## ✅ Checklist

- [ ] Database `iconic_logistics` đã tạo
- [ ] User `iconic_user` có quyền
- [ ] File `.env` đã cấu hình đúng
- [ ] Docker image build thành công
- [ ] Container `iconic_web` đang chạy
- [ ] Website accessible tại `http://localhost:3000`
- [ ] Nginx reverse proxy đã setup
- [ ] SSL certificate đã install
- [ ] DNS trỏ về server IP

---

Built with ❤️ by ICONIC LOGISTICS
