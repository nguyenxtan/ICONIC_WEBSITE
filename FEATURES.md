# Chi Tiết Tính Năng

## 🌐 Public Website

### 1. Trang Chủ (/)
**File**: `src/app/page.tsx`

**Sections**:
- **Hero Section**: Gradient background với CTA buttons
  - "Liên Hệ Ngay" → `/contact`
  - "Tracking Container" → `/services/tracking`
- **Dịch Vụ Nổi Bật**: Grid 3 dịch vụ từ database
  - Icon động theo loại dịch vụ
  - Link đến chi tiết dịch vụ
- **Tin Tức Mới Nhất**: 3 posts gần nhất
  - Cover image
  - Summary
  - Publish date
- **CTA Footer**: Call-to-action với số hotline

**Features**:
- Server-side rendering (SSR)
- Dynamic data từ Prisma
- Responsive design
- SEO optimized

---

### 2. Giới Thiệu (/about)
**File**: `src/app/about/page.tsx`

**Nội dung**:
- Thông tin công ty (nameVi, nameEn)
- Lĩnh vực hoạt động
- Giá trị cốt lõi (4 cards)
- Thông tin liên hệ

**Data Source**: Table `company_info`

---

### 3. Dịch Vụ (/services)
**File**: `src/app/services/page.tsx`

**Features**:
- List tất cả services (visible = true)
- Sort theo `sort_order`
- Render Markdown content với ReactMarkdown
- Anchor links (#slug) cho navigation

**Services Mẫu**:
1. Vận Chuyển Đường Biển
2. Khai Báo Hải Quan
3. Kho Bãi & Vận Chuyển Nội Địa

---

### 4. Container Tracking (/services/tracking)
**File**: `src/app/services/tracking/page.tsx`

**🔥 Tính Năng Nổi Bật**:
- Client-side interactive form
- 2 loại tracking: BOL | BOOKING
- Real-time API call đến `/api/tracking/evergreen`
- Parse HTML từ ShipmentLink
- Hiển thị:
  - Vessel & Voyage
  - POL & POD
  - ETA & ETD
  - Container list với status

**Tech Stack**:
- Next.js API Route
- Cheerio (HTML parsing)
- Adapter pattern (dễ mở rộng)

**Example Request**:
```typescript
{
  "type": "BOL",
  "code": "EGLV123456789"
}
```

**Example Response**:
```typescript
{
  "success": true,
  "data": {
    "vessel": "EVER GIVEN",
    "voyage": "0001E",
    "pol": "YANTIAN",
    "pod": "LOS ANGELES",
    "eta": "2024-02-15",
    "etd": "2024-01-20",
    "containers": [...]
  }
}
```

---

### 5. Tầm Nhìn & Sứ Mệnh (/vision-mission)
**File**: `src/app/vision-mission/page.tsx`

**Layout**:
- Vision card (cam gradient, Eye icon)
- Mission card (nâu gradient, Target icon)
- Commitment section (4 core values)

**Styling**: Custom gradient backgrounds, icon colors

---

### 6. Tin Tức (/news)
**Files**:
- List: `src/app/news/page.tsx`
- Detail: `src/app/news/[slug]/page.tsx`

**List Page**:
- Grid layout (3 columns)
- Published posts only
- Sort by `publishedAt` DESC
- Hover effects

**Detail Page**:
- Full Markdown rendering
- Cover image
- Metadata (date, author)
- JSON-LD structured data (SEO)
- CTA footer (call/email)

**SEO**:
- Dynamic metadata per post
- Open Graph tags
- Twitter Card
- Article schema

---

### 7. Liên Hệ (/contact)
**File**: `src/app/contact/page.tsx`

**Sections**:
1. **Info Cards** (3 columns):
   - Địa chỉ
   - Điện thoại (với giờ làm việc)
   - Email

2. **Contact Form**:
   - Name (required)
   - Email (required)
   - Phone (optional)
   - Company (optional)
   - Message (required)

**Form Handling**:
- API: `POST /api/contact`
- Save to `contact_forms` table
- Toast notification (success/error)
- Auto clear form on success

---

## 🔐 Admin Dashboard

### 8. Login (/admin/login)
**File**: `src/app/admin/login/page.tsx`

**Features**:
- Email + Password authentication
- JWT token generation
- HTTP-only cookie storage
- bcrypt password hashing
- Redirect to dashboard on success

**API**: `POST /api/auth/login`

**Demo Account**:
- Email: admin@iconiclogs.com
- Password: admin123

---

### 9. Dashboard (/admin/dashboard)
**File**: `src/app/admin/dashboard/page.tsx`

**Stats Cards** (4 cards):
1. Tổng Tin Tức (total + published count)
2. Dịch Vụ (active services)
3. Liên Hệ (contact forms count)
4. Lượt Xem (placeholder)

**Recent Activities**:
- 5 posts mới nhất
- 5 contact forms mới nhất

**Tech**: Server component with Prisma aggregations

---

### 10. Quản Lý Tin Tức (/admin/posts)
**Files**:
- List: `src/app/admin/posts/page.tsx`
- New: `src/app/admin/posts/new/page.tsx`
- Edit: `src/app/admin/posts/[id]/edit/page.tsx`

**CRUD Operations**:
- ✅ Create: Title, slug, summary, cover image, Markdown content
- ✅ Read: List all posts with status badges
- ✅ Update: Edit all fields, change status
- ✅ Delete: Confirmation dialog

**Features**:
- Auto-generate slug from title
- Draft/Published status
- Markdown editor (textarea)
- Toast notifications
- View published post (opens in new tab)

**APIs**:
- `POST /api/admin/posts` - Create
- `GET /api/admin/posts/[id]` - Read
- `PATCH /api/admin/posts/[id]` - Update
- `DELETE /api/admin/posts/[id]` - Delete

---

### 11. Quản Lý Dịch Vụ (/admin/services)
**File**: `src/app/admin/services/page.tsx`

**Current Implementation**:
- Read-only view
- Hiển thị: title, slug, sortOrder, visible

**Recommendation**: Quản lý qua Prisma Studio hoặc seed data

**Future**: CRUD interface tương tự posts

---

### 12. Thông Tin Công Ty (/admin/company-info)
**File**: `src/app/admin/company-info/page.tsx`

**Display**:
- Company names (VI/EN)
- Contact info
- Vision & Mission

**Current Implementation**: Read-only

**Future**: Edit form with API

---

### 13. Media Library (/admin/media)
**File**: `src/app/admin/media/page.tsx`

**Current Implementation**:
- Grid view (4 columns)
- Display uploaded media

**Current Workflow**:
- Paste image URL trong post form
- Use external hosting (Unsplash, Cloudinary, etc.)

**Future Enhancements**:
- File upload to S3/Cloudinary
- Image optimization
- Crop/resize tools

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Clear auth cookie

### Admin - Posts
- `POST /api/admin/posts` - Create post
- `GET /api/admin/posts/[id]` - Get post by ID
- `PATCH /api/admin/posts/[id]` - Update post
- `DELETE /api/admin/posts/[id]` - Delete post

### Public
- `POST /api/contact` - Submit contact form
- `POST /api/tracking/evergreen` - Track container

---

## 🎨 UI Components (shadcn/ui)

**Used Components**:
- Button (variants: default, outline, ghost, link)
- Card (với Header, Content, Footer)
- Input
- Textarea
- Label
- Toast/Toaster (notifications)
- Dialog (future: delete confirmations)

**Custom Components**:
- Header (navigation, logo)
- Footer (company info, links)

---

## 🔒 Security Features

1. **Authentication**:
   - JWT tokens (7-day expiry)
   - HTTP-only cookies (XSS protection)
   - bcrypt password hashing (10 rounds)

2. **Authorization**:
   - Middleware protection for `/admin/*`
   - Server-side auth check with `requireAuth()`

3. **Database**:
   - Prisma ORM (SQL injection protection)
   - Parameterized queries

4. **Environment**:
   - Secrets in `.env` (not committed)
   - Production-specific JWT secret

---

## 📊 SEO Features

1. **Metadata**:
   - Dynamic title/description per page
   - Open Graph tags
   - Twitter Cards

2. **Sitemap** (`/sitemap.xml`):
   - Auto-generated từ database
   - Includes all published posts
   - Priority & changeFrequency

3. **Robots.txt** (`/robots.txt`):
   - Allow all public pages
   - Disallow `/admin` và `/api`

4. **Structured Data**:
   - Organization JSON-LD (footer)
   - Article JSON-LD (news posts)

---

## 🚀 Performance

1. **Server Components**:
   - Default RSC cho tất cả pages
   - Client components chỉ khi cần (forms, interactive)

2. **Data Fetching**:
   - Direct database queries (no API overhead)
   - Prisma query optimization

3. **Caching**:
   - Next.js automatic static optimization
   - Revalidation strategies

4. **Image Optimization**:
   - Next.js Image component
   - Remote patterns configured

---

## 📱 Responsive Design

**Breakpoints** (Tailwind):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Mobile-First**:
- Grid → Stack on mobile
- Hamburger menu (todo)
- Touch-friendly buttons
- Readable font sizes

---

## 🔄 Data Flow

### Public Page Rendering

```
User Request
    ↓
Next.js Server Component
    ↓
Prisma Query (PostgreSQL)
    ↓
Transform Data
    ↓
Render HTML (RSC)
    ↓
Send to Client
```

### Admin CRUD

```
User Action (Form Submit)
    ↓
Client-side Validation
    ↓
API Route (POST/PATCH/DELETE)
    ↓
Auth Check (requireAuth)
    ↓
Prisma Mutation
    ↓
Response (JSON)
    ↓
Toast Notification + Redirect
```

---

## 📦 Dependencies

### Core
- `next@15.0.3` - Framework
- `react@19.0.0` - UI library
- `typescript@5.6.3` - Type safety

### Database
- `@prisma/client@5.22.0` - ORM
- `prisma@5.22.0` - CLI

### UI
- `tailwindcss@4.0.0` - Styling
- `@radix-ui/*` - Unstyled components
- `lucide-react@0.454.0` - Icons

### Auth
- `jsonwebtoken@9.0.2` - JWT
- `bcrypt@5.1.1` - Password hashing

### Content
- `react-markdown@9.0.1` - Markdown rendering
- `cheerio@1.0.0` - HTML parsing

### Utils
- `clsx@2.1.1` - Class names
- `tailwind-merge@2.5.4` - TW conflict resolution
- `zod@3.23.8` - Validation (future)

---

Đây là danh sách đầy đủ tất cả tính năng đã implement! 🎉
