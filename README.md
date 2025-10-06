# ICONIC LOGISTICS Website

Website giới thiệu và quản lý nội dung cho **CÔNG TY TNHH ICONIC LOGISTICS** - Dịch vụ logistics chuyên nghiệp tại Việt Nam.

## 🚀 Tính Năng

### Public Site
- ✅ Trang chủ với hero section, dịch vụ nổi bật, tin tức mới nhất
- ✅ Giới thiệu công ty
- ✅ Danh sách và chi tiết dịch vụ logistics
- ✅ Tầm nhìn & Sứ mệnh
- ✅ Tin tức và blog (hỗ trợ Markdown)
- ✅ **Container Tracking** - Tra cứu vận đơn Evergreen Line
- ✅ Form liên hệ với lưu database
- ✅ Responsive design cho mobile/tablet/desktop
- ✅ SEO-optimized (metadata, sitemap, robots.txt, JSON-LD)

### Admin Dashboard
- ✅ Đăng nhập bảo mật (JWT + bcrypt)
- ✅ Dashboard với thống kê tổng quan
- ✅ CRUD Tin tức (Draft/Published, Markdown editor)
- ✅ Quản lý dịch vụ
- ✅ Quản lý thông tin công ty
- ✅ Quản lý media
- ✅ Middleware bảo vệ routes admin

### Technical Features
- ✅ Container tracking API với adapter pattern
- ✅ Self-hosted PostgreSQL với Prisma ORM
- ✅ Tailwind CSS v4 + shadcn/ui components
- ✅ TypeScript full-stack
- ✅ Next.js 15 App Router
- ✅ Docker & Docker Compose ready
- ✅ CI/CD với GitHub Actions

## 🛠️ Stack Công Nghệ

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Self-hosted PostgreSQL
- **ORM**: Prisma
- **UI**: Tailwind CSS v4, shadcn/ui, Lucide Icons
- **Authentication**: JWT + bcrypt
- **Markdown**: react-markdown
- **Web Scraping**: Cheerio (cho tracking)
- **Deployment**: Self-hosted (PM2/Docker) + GitHub Actions CI/CD

## 📦 Cài Đặt Development

### 1. Clone Repository

```bash
git clone https://github.com/nguyenxtan/ICONIC_WEBSITE.git
cd ICONIC_WEBSITE
```

### 2. Cài Đặt Dependencies

```bash
npm install
```

### 3. Cấu Hình PostgreSQL Local

```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres psql
```

```sql
CREATE USER iconic_user WITH PASSWORD 'your_password';
CREATE DATABASE iconic_logistics;
GRANT ALL PRIVILEGES ON DATABASE iconic_logistics TO iconic_user;
\c iconic_logistics
GRANT ALL ON SCHEMA public TO iconic_user;
\q
```

### 4. Cấu Hình Environment

```bash
cp .env.example .env
```

Sửa file `.env`:

```env
DATABASE_URL="postgresql://iconic_user:your_password@localhost:5432/iconic_logistics?schema=public"
DIRECT_URL="postgresql://iconic_user:your_password@localhost:5432/iconic_logistics?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
SITE_URL="http://localhost:3000"
NODE_ENV="development"
```

### 5. Setup Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed initial data
npm run prisma:seed
```

### 6. Chạy Development Server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## 👤 Tài Khoản Demo

- **URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email**: admin@iconiclogs.com
- **Password**: admin123

⚠️ **Đổi password ngay khi deploy production!**

## 🚢 Deploy Production

### Phương án 1: PM2 (Traditional)

```bash
# Run automated setup script on Ubuntu server
./scripts/server-setup.sh

# Clone repository
git clone https://github.com/nguyenxtan/ICONIC_WEBSITE.git /var/www/iconic-website
cd /var/www/iconic-website

# Configure .env.production
cp .env.production.example .env
# Edit .env with production values

# Deploy
./scripts/deploy.sh
```

### Phương án 2: Docker Compose

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh

# Clone repository
git clone https://github.com/nguyenxtan/ICONIC_WEBSITE.git
cd ICONIC_WEBSITE

# Configure .env for Docker
cp .env.example .env
# Edit: DB_PASSWORD, JWT_SECRET, SITE_URL

# Start containers
docker compose up -d

# Run migrations
docker compose exec web npx prisma migrate deploy

# Seed data
docker compose exec web npm run prisma:seed
```

### CI/CD với GitHub Actions

Workflow tự động deploy khi push lên `main`:

**Setup GitHub Secrets:**
- `SERVER_HOST` - Server IP/domain
- `SERVER_USER` - SSH username
- `SERVER_SSH_KEY` - Private SSH key
- `SERVER_PORT` - SSH port (default: 22)
- `DEPLOY_PATH` - App path (default: `/var/www/iconic-website`)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT secret key
- `SITE_URL` - Production URL

Xem chi tiết: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📁 Cấu Trúc Dự Án

```
ICONIC_CMS/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (public)/          # Public routes
│   │   ├── admin/             # Admin dashboard
│   │   └── api/               # API routes
│   ├── components/            # React components
│   └── lib/                   # Utilities & adapters
├── scripts/
│   ├── server-setup.sh        # Auto setup script
│   └── deploy.sh              # Deploy script
├── docker-compose.yml         # Docker orchestration
├── Dockerfile                 # Docker image
├── nginx.conf                 # Nginx config template
└── DEPLOYMENT_GUIDE.md        # Chi tiết deploy
```

## 🔧 Scripts

```bash
# Development
npm run dev              # Dev server
npm run build            # Build production
npm run start            # Start production

# Database
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run migrations
npm run prisma:seed      # Seed data
npm run prisma:studio    # Open Prisma Studio

# Lint
npm run lint
```

## 🔍 Container Tracking API

### Endpoint

```
POST /api/tracking/evergreen
```

### Request Body

```json
{
  "type": "BOL",
  "code": "EGLV123456789"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "vessel": "EVER GIVEN",
    "voyage": "0001E",
    "pol": "YANTIAN",
    "pod": "LOS ANGELES",
    "eta": "2024-02-15",
    "containers": [...]
  }
}
```

## 🔒 Bảo Mật

- ✅ JWT tokens với HTTP-only cookies
- ✅ Password hashing với bcrypt (10 rounds)
- ✅ Middleware bảo vệ admin routes
- ✅ Environment variables cho secrets
- ✅ CSRF protection (Next.js built-in)
- ✅ SQL injection protection (Prisma ORM)
- ✅ Security headers (Nginx)

## 🐛 Troubleshooting

### Database Connection Error

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test connection
psql -U iconic_user -d iconic_logistics -h localhost
```

### Prisma Client Not Generated

```bash
npm run prisma:generate
```

### Build Error

```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📈 Roadmap

- [ ] Thêm tracking cho Maersk, COSCO, ONE
- [ ] Upload ảnh lên cloud storage
- [ ] Multi-language (EN/VI)
- [ ] Analytics integration
- [ ] Newsletter subscription

## 📞 Liên Hệ

**CÔNG TY TNHH ICONIC LOGISTICS**

- 📍 25/49 Đường 6, Khu phố 26, Phường Hiệp Bình, TP.HCM, Việt Nam
- 📞 0986066174
- 📧 info@iconiclogs.com
- 🌐 iconiclogs.com

## 📄 License

© 2024 ICONIC LOGISTICS VIETNAM CO., LTD. All rights reserved.

---

Built with ❤️ using Next.js 15, TypeScript, Prisma, and Tailwind CSS
