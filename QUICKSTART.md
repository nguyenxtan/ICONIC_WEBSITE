# Quick Start Guide

Hướng dẫn nhanh để chạy website ICONIC LOGISTICS trong **5 phút**.

## ⚡ Quick Setup

### 1. Install Dependencies (1 phút)

```bash
npm install
```

### 2. Setup Environment (30 giây)

```bash
cp .env.example .env
```

Sửa file `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/iconic_logistics"
JWT_SECRET="my-super-secret-jwt-key-for-development"
SITE_URL="http://localhost:3000"
```

### 3. Setup Database (2 phút)

**Option A: Local PostgreSQL** (nếu đã cài sẵn)

```bash
# Tạo database
createdb iconic_logistics

# Chạy migrations + seed
npm run prisma:migrate
npm run prisma:seed
```

**Option B: Neon Cloud** (khuyến nghị nếu chưa có PostgreSQL)

1. Truy cập [neon.tech](https://neon.tech) → Sign up (free)
2. Create new project
3. Copy connection string
4. Paste vào `.env` → `DATABASE_URL`
5. Chạy:

```bash
npm run prisma:migrate
npm run prisma:seed
```

### 4. Start Development Server (10 giây)

```bash
npm run dev
```

## 🎉 Done!

Truy cập:

- **Website**: [http://localhost:3000](http://localhost:3000)
- **Admin**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
  - Email: `admin@iconiclogs.com`
  - Password: `admin123`

## 📱 Features to Try

### Public Site
- ✅ Xem trang chủ với hero section
- ✅ Đọc tin tức mẫu
- ✅ Xem danh sách dịch vụ
- ✅ Test tracking container (sample data)
- ✅ Gửi form liên hệ

### Admin Dashboard
1. Login tại `/admin/login`
2. Xem Dashboard với stats
3. Tạo tin tức mới với Markdown
4. Publish/Unpublish posts
5. Xem form liên hệ đã submit

## 🛠️ Common Commands

```bash
# Development
npm run dev                  # Start dev server

# Database
npm run prisma:studio        # Open database GUI
npm run prisma:migrate       # Run migrations
npm run prisma:seed          # Reset seed data

# Build
npm run build                # Build for production
npm run start                # Run production build
```

## 🔍 Folder Structure

```
src/
├── app/                     # Pages & routes
│   ├── page.tsx            # Home page
│   ├── admin/              # Admin dashboard
│   └── api/                # API endpoints
├── components/             # React components
├── lib/                    # Utilities
│   ├── auth.ts            # Authentication
│   ├── db.ts              # Database
│   └── adapters/          # Tracking adapters
└── ...
```

## 📝 Quick Edit Content

### Sửa Thông Tin Công Ty

```bash
npm run prisma:studio
```

Mở table `company_info` → Edit

### Thêm Tin Tức Mới

1. `/admin/login` → Login
2. **Tin Tức** → **Thêm Tin Tức**
3. Viết nội dung Markdown
4. **Xuất bản ngay**

### Sửa Dịch Vụ

File `prisma/seed.ts` → Edit services array → Run:

```bash
npm run prisma:seed
```

## 🐛 Troubleshooting

### Port 3000 đã sử dụng?

```bash
PORT=3001 npm run dev
```

### Database connection error?

Kiểm tra PostgreSQL đang chạy:

```bash
pg_isready
```

### Prisma Client lỗi?

```bash
npm run prisma:generate
```

## 🚀 Next Steps

- [ ] Đọc [README.md](README.md) đầy đủ
- [ ] Xem [DEPLOYMENT.md](DEPLOYMENT.md) để deploy production
- [ ] Customize màu sắc trong `tailwind.config.ts`
- [ ] Thêm logo công ty
- [ ] Upload ảnh thật cho tin tức

## 📞 Need Help?

- 📖 Xem [README.md](README.md) chi tiết
- 🌐 Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
- 💾 Prisma docs: [prisma.io/docs](https://www.prisma.io/docs)

---

Happy coding! 🎨
