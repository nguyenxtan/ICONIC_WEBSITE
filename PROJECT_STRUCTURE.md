# Cấu Trúc Dự Án Chi Tiết

## 📂 File Tree

```
ICONIC_CMS/
│
├── 📄 Configuration Files
│   ├── .env.example              # Environment variables template
│   ├── .eslintrc.json            # ESLint configuration
│   ├── .gitignore                # Git ignore rules
│   ├── next.config.js            # Next.js configuration
│   ├── package.json              # Dependencies & scripts
│   ├── postcss.config.mjs        # PostCSS configuration
│   ├── tailwind.config.ts        # Tailwind CSS configuration
│   └── tsconfig.json             # TypeScript configuration
│
├── 📚 Documentation
│   ├── README.md                 # Main documentation
│   ├── QUICKSTART.md             # Quick start guide
│   ├── DEPLOYMENT.md             # Deployment instructions
│   ├── FEATURES.md               # Feature documentation
│   ├── COMMANDS.md               # Command reference
│   └── PROJECT_STRUCTURE.md      # This file
│
├── 🗄️ Database (prisma/)
│   ├── schema.prisma             # Database schema definition
│   ├── seed.ts                   # Seed data script
│   └── migrations/               # Database migrations (auto-generated)
│
└── 💻 Source Code (src/)
    │
    ├── 🎨 Application (app/)
    │   │
    │   ├── 🌐 Public Routes
    │   │   ├── page.tsx                      # Home page [/]
    │   │   ├── layout.tsx                    # Root layout (Header/Footer)
    │   │   ├── globals.css                   # Global styles
    │   │   ├── sitemap.ts                    # Dynamic sitemap [/sitemap.xml]
    │   │   ├── robots.ts                     # Robots.txt [/robots.txt]
    │   │   │
    │   │   ├── about/
    │   │   │   └── page.tsx                  # About page [/about]
    │   │   │
    │   │   ├── services/
    │   │   │   ├── page.tsx                  # Services list [/services]
    │   │   │   └── tracking/
    │   │   │       └── page.tsx              # Container tracking [/services/tracking]
    │   │   │
    │   │   ├── vision-mission/
    │   │   │   └── page.tsx                  # Vision & Mission [/vision-mission]
    │   │   │
    │   │   ├── news/
    │   │   │   ├── page.tsx                  # News list [/news]
    │   │   │   └── [slug]/
    │   │   │       └── page.tsx              # News detail [/news/:slug]
    │   │   │
    │   │   └── contact/
    │   │       └── page.tsx                  # Contact form [/contact]
    │   │
    │   ├── 🔐 Admin Routes (admin/)
    │   │   ├── layout.tsx                    # Admin layout (sidebar)
    │   │   │
    │   │   ├── login/
    │   │   │   └── page.tsx                  # Login page [/admin/login]
    │   │   │
    │   │   ├── dashboard/
    │   │   │   └── page.tsx                  # Dashboard [/admin/dashboard]
    │   │   │
    │   │   ├── posts/
    │   │   │   ├── page.tsx                  # Posts list [/admin/posts]
    │   │   │   ├── new/
    │   │   │   │   └── page.tsx              # Create post [/admin/posts/new]
    │   │   │   └── [id]/
    │   │   │       └── edit/
    │   │   │           └── page.tsx          # Edit post [/admin/posts/:id/edit]
    │   │   │
    │   │   ├── services/
    │   │   │   └── page.tsx                  # Services management [/admin/services]
    │   │   │
    │   │   ├── company-info/
    │   │   │   └── page.tsx                  # Company info [/admin/company-info]
    │   │   │
    │   │   └── media/
    │   │       └── page.tsx                  # Media library [/admin/media]
    │   │
    │   └── 🔌 API Routes (api/)
    │       │
    │       ├── auth/
    │       │   ├── login/
    │       │   │   └── route.ts              # POST /api/auth/login
    │       │   └── logout/
    │       │       └── route.ts              # POST /api/auth/logout
    │       │
    │       ├── admin/
    │       │   └── posts/
    │       │       ├── route.ts              # POST /api/admin/posts
    │       │       └── [id]/
    │       │           └── route.ts          # GET/PATCH/DELETE /api/admin/posts/:id
    │       │
    │       ├── contact/
    │       │   └── route.ts                  # POST /api/contact
    │       │
    │       └── tracking/
    │           └── evergreen/
    │               └── route.ts              # POST /api/tracking/evergreen
    │
    ├── 🧩 Components (components/)
    │   ├── Header.tsx                        # Site header with navigation
    │   ├── Footer.tsx                        # Site footer
    │   │
    │   └── ui/                               # shadcn/ui components
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       ├── textarea.tsx
    │       ├── toast.tsx
    │       ├── toaster.tsx
    │       └── use-toast.ts
    │
    ├── 📚 Libraries (lib/)
    │   ├── db.ts                             # Prisma client instance
    │   ├── auth.ts                           # JWT authentication utilities
    │   ├── seo.ts                            # SEO helpers (metadata, JSON-LD)
    │   ├── utils.ts                          # Common utilities (cn, formatDate, slugify)
    │   │
    │   └── adapters/                         # Tracking adapters (Pattern)
    │       ├── types.ts                      # TypeScript interfaces
    │       ├── evergreen.ts                  # Evergreen Line adapter
    │       └── index.ts                      # Adapter registry
    │
    └── 🔒 Middleware (middleware.ts)         # Auth middleware for /admin/*
```

## 📊 Database Schema

```prisma
┌─────────────┐
│    User     │
├─────────────┤
│ id          │──┐
│ email       │  │
│ passwordHash│  │
│ role        │  │
│ createdAt   │  │
│ updatedAt   │  │
└─────────────┘  │
                 │
                 │ 1:N
                 │
┌─────────────┐  │
│    Post     │  │
├─────────────┤  │
│ id          │  │
│ slug        │  │
│ title       │  │
│ summary     │  │
│ coverImage  │  │
│ contentMd   │  │
│ status      │  │
│ publishedAt │  │
│ createdById │──┘
│ createdAt   │
│ updatedAt   │
└─────────────┘

┌─────────────┐
│   Service   │
├─────────────┤
│ id          │
│ slug        │
│ title       │
│ descriptionMd
│ sortOrder   │
│ visible     │
│ createdAt   │
│ updatedAt   │
└─────────────┘

┌─────────────┐
│CompanyInfo  │
├─────────────┤
│ id          │
│ nameVi      │
│ nameEn      │
│ phone       │
│ email       │
│ address     │
│ vision      │
│ mission     │
│ createdAt   │
│ updatedAt   │
└─────────────┘

┌─────────────┐
│    Media    │
├─────────────┤
│ id          │
│ url         │
│ alt         │
│ width       │
│ height      │
│ mimeType    │
│ createdAt   │
└─────────────┘

┌─────────────┐
│ContactForm  │
├─────────────┤
│ id          │
│ name        │
│ email       │
│ phone       │
│ company     │
│ message     │
│ createdAt   │
└─────────────┘
```

## 🎯 Route Map

### Public Routes (SSR)

```
/                           → Home (Hero + Services + News)
/about                      → About company
/services                   → Services list
/services/tracking          → Container tracking (CSR)
/vision-mission             → Vision & Mission
/news                       → News list
/news/[slug]                → News detail
/contact                    → Contact form (CSR)
```

### Admin Routes (Protected)

```
/admin/login                → Login (CSR)
/admin/dashboard            → Stats & overview
/admin/posts                → Posts list
/admin/posts/new            → Create post (CSR)
/admin/posts/[id]/edit      → Edit post (CSR)
/admin/services             → Services list
/admin/company-info         → Company info
/admin/media                → Media library
```

### API Routes

```
POST   /api/auth/login               → Authenticate user
POST   /api/auth/logout              → Clear session

POST   /api/admin/posts              → Create post
GET    /api/admin/posts/[id]         → Get post
PATCH  /api/admin/posts/[id]         → Update post
DELETE /api/admin/posts/[id]         → Delete post

POST   /api/contact                  → Submit contact form
POST   /api/tracking/evergreen       → Track container
```

### SEO Routes

```
GET /sitemap.xml                     → Dynamic sitemap
GET /robots.txt                      → Robots configuration
```

## 🔄 Data Flow Diagrams

### Public Page (SSR)

```
┌──────────┐
│  Browser │
└────┬─────┘
     │ GET /news
     ▼
┌─────────────────┐
│  Next.js Server │
│  (app/news/page)│
└────┬────────────┘
     │ Prisma query
     ▼
┌──────────────┐
│  PostgreSQL  │
└────┬─────────┘
     │ Return posts
     ▼
┌─────────────────┐
│  Render HTML    │
│  (Server)       │
└────┬────────────┘
     │ HTML + Hydration
     ▼
┌──────────┐
│  Browser │
└──────────┘
```

### Admin CRUD (CSR)

```
┌──────────┐
│  Browser │
│  (Form)  │
└────┬─────┘
     │ POST /api/admin/posts
     ▼
┌─────────────────┐
│  API Route      │
│  (route.ts)     │
└────┬────────────┘
     │ requireAuth()
     ▼
┌──────────────┐
│  Check JWT   │
└────┬─────────┘
     │ Valid
     ▼
┌─────────────────┐
│  Prisma Mutation│
└────┬────────────┘
     │ Insert/Update
     ▼
┌──────────────┐
│  PostgreSQL  │
└────┬─────────┘
     │ Success
     ▼
┌─────────────────┐
│  JSON Response  │
└────┬────────────┘
     │ {success: true}
     ▼
┌──────────┐
│  Browser │
│  (Toast) │
└──────────┘
```

### Container Tracking

```
┌──────────┐
│  Browser │
│  (Form)  │
└────┬─────┘
     │ POST /api/tracking/evergreen
     │ {type: "BOL", code: "XXX"}
     ▼
┌─────────────────┐
│  API Route      │
└────┬────────────┘
     │ getAdapter('evergreen')
     ▼
┌─────────────────────┐
│  EvergreenAdapter   │
│  track(type, code)  │
└────┬────────────────┘
     │ POST to ShipmentLink
     ▼
┌──────────────────┐
│  External API    │
│  (ShipmentLink)  │
└────┬─────────────┘
     │ HTML Response
     ▼
┌─────────────────┐
│  Cheerio Parse  │
└────┬────────────┘
     │ Extract data
     ▼
┌─────────────────┐
│  JSON Response  │
│  {vessel, eta}  │
└────┬────────────┘
     │ Return to browser
     ▼
┌──────────┐
│  Browser │
│ (Display)│
└──────────┘
```

## 🎨 Component Hierarchy

```
RootLayout (app/layout.tsx)
│
├── Header
│   ├── Logo
│   ├── Navigation
│   │   ├── Link: Home
│   │   ├── Link: About
│   │   ├── Link: Services
│   │   ├── Link: Vision-Mission
│   │   ├── Link: News
│   │   ├── Button: Tracking
│   │   └── Link: Contact
│   └── MobileMenu (burger)
│
├── Main Content (children)
│   └── [Page-specific components]
│
├── Footer
│   ├── CompanyInfo
│   ├── QuickLinks
│   ├── ServicesLinks
│   ├── ContactInfo
│   └── Copyright
│
└── Toaster (notifications)
```

### Admin Layout Hierarchy

```
AdminLayout (app/admin/layout.tsx)
│
├── Sidebar
│   ├── Logo + User Info
│   ├── Navigation
│   │   ├── Link: Dashboard
│   │   ├── Link: Posts
│   │   ├── Link: Services
│   │   ├── Link: Company Info
│   │   └── Link: Media
│   └── Logout Button
│
└── Main Content
    └── [Admin page components]
```

## 📦 Component Dependencies

```
shadcn/ui components
│
├── Button
│   └── Used in: All pages, forms, CTAs
│
├── Card
│   └── Used in: Home, Services, News, Admin Dashboard
│
├── Input
│   └── Used in: Login, Contact, Post forms
│
├── Textarea
│   └── Used in: Contact, Post editor
│
├── Label
│   └── Used in: All forms
│
└── Toast/Toaster
    └── Used in: Global notifications
```

## 🔒 Authentication Flow

```
Login Page
    │
    │ Submit credentials
    ▼
API: /api/auth/login
    │
    │ 1. Find user (Prisma)
    │ 2. Verify password (bcrypt)
    │ 3. Generate JWT
    │ 4. Set HTTP-only cookie
    ▼
Redirect to /admin/dashboard
    │
    │ User navigates to /admin/posts
    ▼
Middleware (middleware.ts)
    │
    │ 1. Read auth-token cookie
    │ 2. Verify JWT
    │ 3. Check expiry
    ▼
Allow access if valid
OR
Redirect to /admin/login if invalid
```

## 🎯 Key Design Patterns

### 1. Server Components by Default
- All pages use RSC unless interactivity needed
- Direct database access (no API overhead)

### 2. Adapter Pattern (Tracking)
```typescript
interface TrackingAdapter {
  track(type, code): Promise<TrackingResult>
}

class EvergreenAdapter implements TrackingAdapter { }
class MaerskAdapter implements TrackingAdapter { }

const adapter = getAdapter('evergreen')
```

### 3. Repository Pattern (Prisma)
```typescript
// Centralized database access
export const prisma = new PrismaClient()

// Used across app
const posts = await prisma.post.findMany()
```

### 4. Middleware Chain
```
Request → Middleware → Page/API
              ↓
          Auth check
              ↓
       Allow/Redirect
```

---

## 📊 Statistics

```
Total Files:      ~60
Total Lines:      ~8,000
TypeScript:       100%
React Components: 25+
API Routes:       8
Database Tables:  6
Public Pages:     7
Admin Pages:      6
```

---

Này là cấu trúc đầy đủ của dự án! 🏗️
