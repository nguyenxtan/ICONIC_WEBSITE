# 🏗️ ICONIC LOGISTICS - Kiến Trúc Web & Database

## 📊 Tech Stack

- **Frontend**: Next.js 15 (App Router) + React 19
- **Backend**: Next.js API Routes (TypeScript)
- **Database**: PostgreSQL 16 (self-hosted)
- **ORM**: Prisma
- **UI**: Tailwind CSS v4 + shadcn/ui
- **Authentication**: JWT + bcrypt
- **Deployment**: Docker + Docker Compose

---

## 🗄️ DATABASE SCHEMA

### 1. **User** (Admin users)
```sql
- id (string, primary key)
- email (unique)
- name
- passwordHash
- role (enum: SUPER_ADMIN, ADMIN, EDITOR, VIEWER)
- active (boolean)
- lastLoginAt
- createdAt / updatedAt
```

**Role Permissions:**
- `SUPER_ADMIN`: Manage users + all content
- `ADMIN`: Manage content (posts, services, company info)
- `EDITOR`: Edit posts (draft), services
- `VIEWER`: Read-only access

---

### 2. **Post** (Tin tức / Blog)
```sql
- id (string, primary key)
- slug (unique, for URL)
- title
- summary
- coverImageUrl
- contentMd (Markdown text)
- status (DRAFT, PUBLISHED)
- publishedAt
- createdById (FK to User)
- createdAt / updatedAt
```

**Indexes**: `(status, publishedAt)`, `(slug)`

---

### 3. **Service** (Dịch vụ logistics)
```sql
- id (string, primary key)
- slug (unique)
- title
- description
- content (optional, long text)
- icon (URL)
- sortOrder (for ordering)
- visible (boolean)
- createdAt / updatedAt
```

---

### 4. **CompanyInfo** (Thông tin công ty)
```sql
- id (string, primary key)
- nameVi / nameEn
- phone / email / address
- introduction
- vision (text)
- mission (text)
- coreValues / goals / commitments / strengths
- createdAt / updatedAt
```

**Single record** - chỉ có 1 row trong bảng

---

### 5. **Media** (Thư viện ảnh)
```sql
- id (string, primary key)
- filename
- url
- alt (alternative text)
- width / height / size
- mimeType
- createdAt
```

---

### 6. **ContactForm** (Form liên hệ từ website)
```sql
- id (string, primary key)
- name / email / phone / company
- message (text)
- createdAt
```

**Notes**: Chỉ lưu data, không có admin interface để xem

---

### 7. **Partner** (Đối tác shipping/airline) - *Inactive*
```sql
- id (string, primary key)
- name / port
- logoUrl
- type (SHIPPING, AIRLINE, INTERNATIONAL)
- sortOrder / visible
- createdAt / updatedAt
```

**Status**: Model có nhưng chưa implement feature

---

### 8. **Commodity** (Loại hàng hóa) - *Inactive*
```sql
- id (string, primary key)
- nameVi / nameEn
- sortOrder / visible
- createdAt / updatedAt
```

**Status**: Model có nhưng chưa implement feature

---

## 🌳 FOLDER STRUCTURE

```
src/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public site (grouped routes)
│   │   ├── page.tsx              # Homepage
│   │   ├── about/page.tsx        # About
│   │   ├── services/page.tsx     # Services list
│   │   ├── services/tracking/    # Container tracking
│   │   ├── news/page.tsx         # News listing
│   │   ├── news/[slug]/page.tsx  # News detail
│   │   ├── vision-mission/       # Vision & mission
│   │   ├── partners/page.tsx     # Partners
│   │   ├── commodities/page.tsx  # Commodities
│   │   ├── contact/page.tsx      # Contact form
│   │   └── layout.tsx            # Public layout
│   │
│   ├── admin/                    # Admin dashboard
│   │   ├── login/page.tsx        # Admin login
│   │   ├── dashboard/page.tsx    # Dashboard
│   │   ├── posts/page.tsx        # Posts listing
│   │   ├── posts/new/page.tsx    # Create post
│   │   ├── posts/[id]/edit/      # Edit post
│   │   ├── services/page.tsx     # Services management
│   │   ├── services/[id]/edit/   # Edit service
│   │   ├── users/page.tsx        # User management
│   │   ├── company-info/page.tsx # Company info
│   │   ├── media/page.tsx        # Media library
│   │   ├── layout.tsx            # Admin layout (protected)
│   │   └── styles.ts             # Admin theme colors
│   │
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   │   ├── login/route.ts    # Login endpoint
│   │   │   └── logout/route.ts   # Logout endpoint
│   │   ├── admin/
│   │   │   ├── posts/route.ts    # Posts CRUD
│   │   │   ├── users/route.ts    # Users CRUD
│   │   │   ├── users/[id]/       # User detail
│   │   │   └── users/[id]/password/  # Change password
│   │   ├── tracking/
│   │   │   └── evergreen/route.ts   # Container tracking
│   │   ├── media/
│   │   │   ├── route.ts          # List media
│   │   │   └── upload/route.ts   # Upload file
│   │   ├── contact/route.ts      # Submit contact form
│   │   ├── ai/
│   │   │   └── generate-content/ # AI content (n8n integration)
│   │   └── ...
│   │
│   ├── layout.tsx                # Root layout
│   ├── robots.ts                 # robots.txt
│   └── sitemap.ts                # sitemap.xml
│
├── components/                   # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   ├── Button/
│   ├── Card/
│   ├── Form/
│   ├── Table/
│   └── ...
│
├── lib/                          # Utility functions
│   ├── auth.ts                   # JWT/auth helpers
│   ├── api.ts                    # API client
│   ├── seo.ts                    # SEO utilities
│   ├── adapters/
│   │   └── container-tracking/   # Tracking API adapter
│   ├── db.ts                     # Prisma client
│   └── ...
│
└── middleware.ts                 # Next.js middleware (JWT validation)
```

---

## 🔄 FLOW DIAGRAM

### Authentication Flow
```
Login Page (/admin/login)
    ↓
POST /api/auth/login (email, password)
    ↓
Verify email + password hash
    ↓
Generate JWT token
    ↓
Set HTTP-only cookie
    ↓
Redirect to /admin/dashboard
    ↓
Middleware validates token on protected routes
```

### Content Management Flow
```
Admin Page (/admin/posts)
    ↓
GET /api/admin/posts (fetch list)
    ↓
Display with Create/Edit/Delete buttons
    ↓
Click "New Post"
    ↓
POST /api/admin/posts (create)
    ↓
Redirect to /admin/posts/[id]/edit
    ↓
PATCH /api/admin/posts/[id] (update)
    ↓
Revalidate cache + return to list
```

### Public Content Delivery
```
Homepage / Any Public Page
    ↓
Next.js SSR (Server Side Rendering)
    ↓
Fetch from Database:
  - Posts (published only)
  - Services
  - Company Info
  - Contact Forms (from form submission)
    ↓
Render HTML + SEO metadata
    ↓
Return to browser
```

---

## 🔐 Security

- **JWT Authentication**: Tokens in HTTP-only cookies
- **Password Hashing**: bcrypt with 10 rounds
- **Protected Routes**: Middleware validates on `/admin/*`
- **SQL Injection**: Prisma ORM prevents injection
- **CSRF Protection**: Next.js built-in
- **Security Headers**: Set in Nginx config

---

## 📍 Key Routes

### Public Routes
- `/` - Homepage
- `/about` - About company
- `/services` - Services listing
- `/services/tracking` - Container tracking
- `/news` - News listing
- `/news/[slug]` - News detail
- `/vision-mission` - Vision & mission
- `/partners` - Partners
- `/commodities` - Commodities
- `/contact` - Contact form

### Admin Routes (Protected)
- `/admin/login` - Login page
- `/admin/dashboard` - Dashboard
- `/admin/posts` - Manage posts
- `/admin/posts/new` - Create post
- `/admin/posts/[id]/edit` - Edit post
- `/admin/services` - Manage services
- `/admin/services/[id]/edit` - Edit service
- `/admin/users` - Manage users
- `/admin/company-info` - Edit company info
- `/admin/media` - Media library

### API Routes
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET/POST/PATCH/DELETE /api/admin/posts` - Posts CRUD
- `GET/POST/PATCH/DELETE /api/admin/users` - Users CRUD
- `PATCH /api/admin/users/[id]/password` - Change password
- `POST /api/media/upload` - Upload file
- `POST /api/tracking/evergreen` - Container tracking
- `POST /api/contact` - Submit contact form

---

## 🚀 Deployment

### Docker
- **Image**: `Dockerfile` (Next.js standalone)
- **Database**: PostgreSQL container (or external)
- **Orchestration**: `docker-compose.yml`
- **Production**: `docker-compose.production.yml`

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection
- `JWT_SECRET` - Authentication secret
- `SITE_URL` - Public domain
- `NODE_ENV` - development/production

---

## 📌 Key Files

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Database schema definition |
| `src/middleware.ts` | JWT validation middleware |
| `src/lib/auth.ts` | Authentication helpers |
| `src/app/admin/layout.tsx` | Admin layout + protection |
| `nginx.conf` | Nginx reverse proxy config |
| `docker-compose.yml` | Docker setup |

---

## ⚡ Performance

- **ISR (Incremental Static Regeneration)** for public pages
- **Caching**: Static files cached (365 days)
- **Database Indexes**: On frequently queried fields
- **API Optimization**: Only fetch needed fields
- **Image Optimization**: Next.js Image component

---

**Last Updated**: 2024-11-21
