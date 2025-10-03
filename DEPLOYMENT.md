# Hướng Dẫn Deploy Production

## 🚀 Deploy lên Vercel + Neon

### Bước 1: Setup Database (Neon)

1. Truy cập [neon.tech](https://neon.tech) và đăng ký/đăng nhập
2. Click **Create Project**
3. Chọn region gần Việt Nam nhất (Singapore recommended)
4. Đặt tên project: `iconic-logistics`
5. Copy **Connection String** (dạng: `postgresql://user:pass@host/db?sslmode=require`)

### Bước 2: Push Code lên GitHub

```bash
# Nếu chưa có git repo
git init
git add .
git commit -m "Initial commit: ICONIC LOGISTICS website"

# Tạo repo mới trên GitHub và push
git remote add origin https://github.com/YOUR_USERNAME/iconic-logistics.git
git branch -M main
git push -u origin main
```

### Bước 3: Deploy lên Vercel

1. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng GitHub
2. Click **Add New** → **Project**
3. Import repository `iconic-logistics`
4. **Environment Variables**: Thêm các biến sau:

```
DATABASE_URL=postgresql://...connection-string-from-neon...
JWT_SECRET=your-super-secret-production-key-min-32-chars
SITE_URL=https://iconiclogs.com
NODE_ENV=production
```

5. Click **Deploy**

### Bước 4: Chạy Migrations & Seed

Sau khi deploy thành công, chạy migrations:

**Option A: Từ local**

```bash
# Set DATABASE_URL tạm thời
export DATABASE_URL="postgresql://...neon-connection-string..."

# Chạy migrations
npx prisma migrate deploy

# Seed data
npx prisma db seed
```

**Option B: Từ Vercel CLI**

```bash
npm i -g vercel
vercel login
vercel env pull .env.production
npx prisma migrate deploy
npx prisma db seed
```

### Bước 5: Setup Custom Domain

1. Vào Vercel project → **Settings** → **Domains**
2. Thêm domain: `iconiclogs.com` và `www.iconiclogs.com`
3. Cập nhật DNS records theo hướng dẫn Vercel:
   - Type: `A`, Name: `@`, Value: `76.76.21.21`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`
4. Đợi DNS propagate (~5-30 phút)

### Bước 6: Update SITE_URL

Sau khi domain active, update environment variable:

```
SITE_URL=https://iconiclogs.com
```

Redeploy để apply changes.

## 📊 Monitoring

### Vercel Analytics

Vercel tự động cung cấp:
- Performance metrics
- Error tracking
- Web Vitals

Xem tại: Project → **Analytics**

### Database Monitoring (Neon)

Neon Dashboard cung cấp:
- Query performance
- Connection pooling
- Storage usage
- Backups

## 🔄 CI/CD

Vercel tự động deploy khi:
- Push lên `main` branch → Production
- Push lên feature branch → Preview deployment

## 🔐 Secrets Management

**IMPORTANT**: Không commit `.env` vào Git!

Để update secrets:

```bash
# Vercel dashboard
Project → Settings → Environment Variables

# Hoặc dùng CLI
vercel env add JWT_SECRET
```

## 🐛 Troubleshooting

### Build Failed

Kiểm tra Vercel build logs:
1. Project → Deployments
2. Click deployment bị lỗi
3. Xem **Build Logs**

Common issues:
- Missing environment variables
- TypeScript errors
- Prisma client not generated

Fix:
```bash
# Ensure prisma generate runs in build
# package.json
"scripts": {
  "build": "prisma generate && next build"
}
```

### Database Connection Error

```bash
# Test connection locally
npx prisma db pull
```

Ensure `DATABASE_URL` includes `?sslmode=require` cho Neon.

### Migrations Not Applied

```bash
# Force apply migrations
npx prisma migrate deploy --force
```

## 📈 Scaling

### Neon Scaling

Free tier limits:
- 0.5 GB storage
- 1 active database
- Auto-suspend after inactivity

Upgrade to Pro ($19/mo) for:
- 10 GB storage
- Autoscaling
- Point-in-time recovery

### Vercel Scaling

Free tier (Hobby):
- 100 GB bandwidth/month
- 100 serverless function executions/day
- Unlimited sites

Upgrade to Pro ($20/mo/user) for:
- 1 TB bandwidth
- Advanced analytics
- Team collaboration

## 🔄 Database Backups

### Neon Backups

Neon tự động backup mỗi ngày. Restore:
1. Neon Dashboard → Branches
2. Click **Restore**
3. Chọn timestamp

### Manual Backup

```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

## 🌐 Alternative: Railway Deploy

### Setup Railway

1. Truy cập [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub**
3. Select repository
4. Add **PostgreSQL** plugin
5. Environment variables được tự động inject

### Deploy

Railway tự động detect Next.js và deploy. No configuration needed!

## ✅ Post-Deployment Checklist

- [ ] Website accessible tại production URL
- [ ] Admin login hoạt động (`/admin/login`)
- [ ] Database có seed data
- [ ] Tracking API working
- [ ] Contact form lưu vào DB
- [ ] SEO: Sitemap accessible (`/sitemap.xml`)
- [ ] SEO: Robots.txt accessible (`/robots.txt`)
- [ ] SSL certificate active (HTTPS)
- [ ] Custom domain configured
- [ ] Environment variables set correctly
- [ ] Error monitoring setup

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
1. Vercel build logs
2. Neon database logs
3. Browser console errors
4. Next.js server logs

---

Happy deploying! 🚀
