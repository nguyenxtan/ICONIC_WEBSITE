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
- ✅ PostgreSQL database với Prisma ORM
- ✅ Tailwind CSS v4 + shadcn/ui components
- ✅ TypeScript full-stack
- ✅ Next.js 15 App Router
- ✅ Server-side rendering (SSR)

## 📁 Cấu Trúc Dự Án

```
ICONIC_CMS/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data (demo user, posts, services)
├── src/
│   ├── app/
│   │   ├── (public routes)
│   │   │   ├── page.tsx               # Trang chủ
│   │   │   ├── about/page.tsx         # Giới thiệu
│   │   │   ├── services/
│   │   │   │   ├── page.tsx           # Danh sách dịch vụ
│   │   │   │   └── tracking/page.tsx  # Container tracking
│   │   │   ├── vision-mission/page.tsx
│   │   │   ├── news/
│   │   │   │   ├── page.tsx           # Danh sách tin tức
│   │   │   │   └── [slug]/page.tsx    # Chi tiết tin tức
│   │   │   └── contact/page.tsx       # Liên hệ
│   │   ├── admin/
│   │   │   ├── login/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── posts/                 # CRUD tin tức
│   │   │   ├── services/page.tsx
│   │   │   ├── company-info/page.tsx
│   │   │   └── media/page.tsx
│   │   ├── api/
│   │   │   ├── auth/                  # Login/Logout
│   │   │   ├── admin/                 # Admin APIs
│   │   │   ├── contact/route.ts       # Contact form
│   │   │   └── tracking/
│   │   │       └── evergreen/route.ts # Tracking API
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── sitemap.ts                 # Dynamic sitemap
│   │   └── robots.ts                  # SEO robots.txt
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ui/                        # shadcn/ui components
│   ├── lib/
│   │   ├── db.ts                      # Prisma client
│   │   ├── auth.ts                    # JWT authentication
│   │   ├── seo.ts                     # SEO utilities
│   │   ├── utils.ts                   # Helper functions
│   │   └── adapters/                  # Tracking adapters
│   │       ├── types.ts
│   │       ├── evergreen.ts
│   │       └── index.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🛠️ Stack Công Nghệ

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **UI**: Tailwind CSS v4, shadcn/ui, Lucide Icons
- **Authentication**: JWT + bcrypt
- **Markdown**: react-markdown
- **Web Scraping**: Cheerio (cho tracking)
- **Deployment**: Cloudflare Pages + Supabase

## 📦 Cài Đặt

### 1. Clone Repository

```bash
cd ICONIC_CMS
```

### 2. Cài Đặt Dependencies

```bash
npm install
```

### 3. Cấu Hình Environment

Tạo file `.env`:

```bash
cp .env.example .env
```

Sửa file `.env`:

```env
# Supabase PostgreSQL Connection
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

JWT_SECRET="your-super-secret-jwt-key-change-in-production"
SITE_URL="http://localhost:3000"
NODE_ENV="development"
```

### 4. Setup Database với Supabase

#### Tạo Project Supabase

1. Đăng ký/đăng nhập tại [supabase.com](https://supabase.com)
2. Tạo project mới (chọn region gần Việt Nam: Singapore)
3. Chờ database khởi tạo (khoảng 2-3 phút)
4. Vào **Settings** → **Database**
5. Copy connection string:
   - **Connection pooling** (cho `DATABASE_URL`) - Port `6543`
   - **Direct connection** (cho `DIRECT_URL`) - Port `5432`
6. Thay thế `[YOUR-PASSWORD]` và `[PROJECT-REF]` vào `.env`

#### Chạy Migrations & Seed

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to Supabase (development)
npm run db:push

# Hoặc chạy migrations (production)
npm run prisma:deploy

# Seed data mẫu
npm run prisma:seed
```

**Lưu ý**:
- `DATABASE_URL` sử dụng connection pooling (port `6543`) - dành cho serverless
- `DIRECT_URL` sử dụng direct connection (port `5432`) - dành cho migrations

### 5. Chạy Development Server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

## 👤 Tài Khoản Demo

Sau khi seed data, bạn có thể đăng nhập admin với:

- **URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email**: admin@iconiclogs.com
- **Password**: admin123

## 🔧 Scripts

```bash
# Development
npm run dev              # Chạy dev server

# Build
npm run build            # Build production
npm run start            # Chạy production build

# Database
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Chạy migrations
npm run prisma:seed      # Seed data mẫu
npm run prisma:studio    # Mở Prisma Studio (GUI database)

# Lint
npm run lint             # Chạy ESLint
```

## 🌐 Deploy Production (Cloudflare Pages + Supabase)

### 1. Setup Supabase Production

1. Tạo project tại [supabase.com](https://supabase.com)
2. Lấy connection strings từ **Settings** → **Database**
3. Lưu lại:
   - `DATABASE_URL` (Connection pooling - port 6543)
   - `DIRECT_URL` (Direct connection - port 5432)

### 2. Setup GitHub Secrets

Vào repository Settings → Secrets and variables → Actions, thêm:

```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:6543/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres
JWT_SECRET=your-production-secret-key-min-32-characters
SITE_URL=https://iconiclogs.com
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
```

### 3. Tạo Cloudflare Pages Project

1. Đăng nhập [dash.cloudflare.com](https://dash.cloudflare.com)
2. Vào **Workers & Pages** → **Create application** → **Pages**
3. Connect GitHub repository
4. Cấu hình build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
5. Thêm Environment Variables (same as GitHub Secrets)

### 4. Lấy Cloudflare API Token

1. Vào **My Profile** → **API Tokens**
2. Tạo token mới với template **Edit Cloudflare Workers**
3. Copy và thêm vào GitHub Secrets: `CLOUDFLARE_API_TOKEN`

### 5. Lấy Account ID

1. Vào Cloudflare dashboard
2. Copy Account ID từ sidebar
3. Thêm vào GitHub Secrets: `CLOUDFLARE_ACCOUNT_ID`

### 6. Deploy

```bash
# Push code to main branch
git add .
git commit -m "chore(db): migrate project from SQLite to Supabase (Postgres) for Cloudflare deployment"
git push origin main
```

GitHub Actions sẽ tự động:
- Chạy Prisma migrations
- Build Next.js
- Deploy lên Cloudflare Pages

### 7. Kiểm Tra Deployment

- Xem logs tại **Actions** tab trên GitHub
- Truy cập URL Cloudflare Pages sau khi deploy xong
- Login admin: `https://your-site.pages.dev/admin/login`

### Troubleshooting

**Migration failed?**
```bash
# Chạy migration thủ công từ local
DATABASE_URL="your-supabase-direct-url" npx prisma migrate deploy
```

**Build failed?**
- Kiểm tra environment variables đã đủ chưa
- Xem build logs trên Cloudflare Pages dashboard

**Database connection error?**
- Kiểm tra Supabase project có đang active
- Verify connection strings (pooling vs direct)
- Check IP allowlist nếu có bật

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

hoặc

```json
{
  "type": "BOOKING",
  "code": "BOOKING123456"
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
    "etd": "2024-01-20",
    "status": "In Transit",
    "containers": [
      {
        "number": "TEMU1234567",
        "type": "40HC",
        "size": "40",
        "status": "Loaded"
      }
    ]
  }
}
```

### Adapter Pattern

Dễ dàng thêm hãng tàu mới:

```typescript
// src/lib/adapters/maersk.ts
export class MaerskAdapter implements TrackingAdapter {
  async track(type: 'BOL' | 'BOOKING', code: string) {
    // Implement Maersk tracking logic
  }
}

// src/lib/adapters/index.ts
import { MaerskAdapter } from './maersk'

export const adapters = {
  evergreen: new EvergreenAdapter(),
  maersk: new MaerskAdapter(),
  // ...
}
```

## 📝 Quản Lý Nội Dung

### Thêm Tin Tức Mới

1. Đăng nhập admin: `/admin/login`
2. Vào **Tin Tức** → **Thêm Tin Tức**
3. Điền thông tin:
   - Tiêu đề (auto-generate slug)
   - Tóm tắt
   - URL ảnh bìa
   - Nội dung Markdown
4. Chọn **Lưu nháp** hoặc **Xuất bản ngay**

### Markdown Support

Hỗ trợ đầy đủ Markdown syntax:

```markdown
# Tiêu đề H1
## Tiêu đề H2

**Bold text**
*Italic text*

- Bullet point 1
- Bullet point 2

1. Numbered list
2. Item 2

[Link text](https://example.com)

![Alt text](https://example.com/image.jpg)

> Blockquote

` ``javascript
code block
` ``
```

### Chỉnh Sửa Dịch Vụ

Dịch vụ được quản lý qua database. Sử dụng Prisma Studio:

```bash
npm run prisma:studio
```

Hoặc chỉnh sửa trong `prisma/seed.ts` và re-seed.

## 🎨 Màu Thương Hiệu

```css
/* Cam chủ đạo */
--brand-orange: #FF4500
--brand-orange-primary: #FE4B00
--brand-orange-dark: #B23400

/* Accent */
--brand-accent: #FFD2BF
--brand-accent-secondary: #FFA580

/* Phụ */
--brand-brown: #C28331
--brand-brown-secondary: #BB6325
--brand-brown-dark: #801C18
```

## 🔒 Bảo Mật

- ✅ JWT tokens với HTTP-only cookies
- ✅ Password hashing với bcrypt (10 rounds)
- ✅ Middleware bảo vệ admin routes
- ✅ Environment variables cho secrets
- ✅ CSRF protection (Next.js built-in)
- ✅ SQL injection protection (Prisma ORM)

## 📊 Database Schema

### Bảng Chính

- **users**: Admin users (email, password_hash, role)
- **posts**: Tin tức (title, slug, content_md, status, published_at)
- **services**: Dịch vụ (title, description_md, sort_order, visible)
- **company_info**: Thông tin công ty (name, phone, email, vision, mission)
- **media**: Thư viện media (url, alt, width, height, mime_type)
- **contact_forms**: Form liên hệ (name, email, phone, company, message)

## 🐛 Troubleshooting

### Database Connection Error

```bash
# Kiểm tra PostgreSQL đang chạy
pg_isready

# Kiểm tra DATABASE_URL
echo $DATABASE_URL
```

### Prisma Client Not Generated

```bash
npm run prisma:generate
```

### Build Error

```bash
# Clear cache
rm -rf .next
npm run build
```

### Port Already in Use

```bash
# Thay đổi port
PORT=3001 npm run dev
```

## 📈 Roadmap

- [ ] Thêm tracking cho Maersk, COSCO, ONE
- [ ] Upload ảnh lên cloud storage (Cloudinary/S3)
- [ ] Multi-language (EN/VI)
- [ ] Analytics integration
- [ ] Newsletter subscription
- [ ] Advanced search
- [ ] Export data (PDF/Excel)

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
