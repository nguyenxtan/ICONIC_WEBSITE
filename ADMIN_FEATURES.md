# 🔧 ICONIC LOGISTICS - Admin Panel Features

**Access**: `iconiclogs.com/admin`

**Demo Credentials:**
- Email: `admin@iconiclogs.com`
- Password: `admin123`

---

## 📋 Admin Pages Overview

### 1. **Login** (`/admin/login`)
- Email + password authentication
- JWT token stored in HTTP-only cookie
- Auto-redirect to dashboard if already logged in
- "Remember me" option

---

### 2. **Dashboard** (`/admin/dashboard`)
- **Quick Stats:**
  - Total posts (published count)
  - Total services
  - Recent contacts
  - Admin users count

- **Quick Actions:**
  - Create new post
  - View recent posts
  - Check contact forms

- **Stats Visible To:** All authenticated users

---

### 3. **Posts Management** (`/admin/posts`)

#### Features:
- ✅ **List View**: All posts with status + date
- ✅ **Search/Filter**: By title, status, date
- ✅ **Status Badges**: DRAFT (gray) / PUBLISHED (green)
- ✅ **Bulk Actions**: Edit, delete, publish
- ✅ **Pagination**: 10 posts per page

#### Actions:
- **Create**: Click "New Post" → `/admin/posts/new`
- **Edit**: Click post title → `/admin/posts/[id]/edit`
- **Delete**: Click delete icon (with confirmation)
- **Publish**: Change status from DRAFT → PUBLISHED

---

### 4. **Create/Edit Post** (`/admin/posts/new` or `/admin/posts/[id]/edit`)

#### Fields:
- **Title** (required) - Post heading
- **Slug** (required) - URL-friendly identifier (auto-generate from title)
- **Summary** (optional) - Short description
- **Cover Image** - Upload or paste URL
- **Content** - Markdown editor with live preview
- **Status** - DRAFT or PUBLISHED
- **Publish Date** - Auto-set to now when published

#### Editor Features:
- 📝 **Markdown Editor**: Full markdown support
- 👁️ **Live Preview**: See rendered HTML in real-time
- 📸 **Image Upload**: Upload cover image
- ✅ **Auto-save**: Saves every 30 seconds
- 🤖 **AI Content**: Generate content using n8n integration

#### Save Options:
- **Save as Draft**: Keeps status = DRAFT
- **Publish**: Sets status = PUBLISHED + publishedAt = now

---

### 5. **Services Management** (`/admin/services`)

#### Features:
- ✅ **List View**: All services with sort order
- ✅ **Drag-to-Reorder**: Reorder services by dragging
- ✅ **Visibility Toggle**: Show/hide service
- ✅ **Bulk Edit**: Edit multiple services

#### Actions:
- **Create**: Click "New Service"
- **Edit**: Click service name → edit form
- **Delete**: Delete service
- **Reorder**: Drag service to new position

---

### 6. **Edit Service** (`/admin/services/[id]/edit`)

#### Fields:
- **Title** (required)
- **Slug** (auto-generate)
- **Description** (short text)
- **Content** (long text, optional)
- **Icon** (URL)
- **Sort Order** (integer for positioning)
- **Visible** (toggle: show/hide)

#### Appears on Public Site:
- `/services` page (all visible services)
- Shown in order by `sortOrder`

---

### 7. **Company Info** (`/admin/company-info`)

#### Single-Record Form
Only 1 company info record exists in database.

#### Fields:
- **Company Name (VI/EN)** - Vietnamese + English names
- **Contact Info**: Phone, email, address
- **Company Description**: Introduction text
- **Vision** (text area) - Company vision statement
- **Mission** (text area) - Company mission
- **Core Values** (optional)
- **Goals** (optional)
- **Commitments** (optional)
- **Strengths** (optional)

#### Displays On:
- Homepage hero section
- `/about` page
- `/vision-mission` page
- Footer (phone, email, address)

---

### 8. **Users Management** (`/admin/users`)

#### Features:
- ✅ **List View**: All admin users
- ✅ **User Info**: Name, email, role, status
- ✅ **Last Login**: Track user activity
- ✅ **Status Toggle**: Activate/deactivate users

#### User Roles:
1. **SUPER_ADMIN**
   - Manage all users (create, edit, delete)
   - Manage all content (posts, services, company info)
   - View all admin functions

2. **ADMIN**
   - Create/edit/delete posts, services, company info
   - Cannot manage users
   - Read-only access to user list

3. **EDITOR**
   - Create/edit posts (can only save as DRAFT)
   - View published posts
   - Cannot publish posts
   - Cannot edit services

4. **VIEWER**
   - Read-only access to all content
   - Cannot create or edit anything

#### Actions:
- **Create User**: Click "New User"
  - Set email, name, role
  - System generates temporary password

- **Edit User**: Click user email
  - Change name, email, role, status

- **Change Password**:
  - Click "Change Password" button
  - User must confirm old password first

- **Deactivate**: Toggle "Active" status
  - User cannot login if inactive

- **Delete**: Permanently remove user

---

### 9. **Media Library** (`/admin/media`)

#### Features:
- ✅ **Upload**: Drag-drop or click to upload images
- ✅ **Gallery View**: Thumbnail preview of all images
- ✅ **Copy URL**: Click image to copy public URL
- ✅ **Delete**: Remove unused images
- ✅ **Filter**: By upload date

#### Upload Support:
- **Formats**: JPG, PNG, WebP, GIF
- **Max Size**: 10MB per file
- **Storage**: `/public/uploads/` directory
- **URL Format**: `iconiclogs.com/uploads/[filename]`

#### Use Cases:
- Cover images for posts
- Service icons
- Company photos
- General media

---

## 🔐 Permissions Matrix

| Feature | SUPER_ADMIN | ADMIN | EDITOR | VIEWER |
|---------|-------------|-------|--------|--------|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| **Posts** | | | | |
| View list | ✅ | ✅ | ✅ | ✅ |
| Create | ✅ | ✅ | ✅ | ❌ |
| Edit draft | ✅ | ✅ | ✅ | ❌ |
| Publish | ✅ | ✅ | ❌ | ❌ |
| Delete | ✅ | ✅ | ❌ | ❌ |
| **Services** | | | | |
| View list | ✅ | ✅ | ✅ | ✅ |
| Create/Edit | ✅ | ✅ | ❌ | ❌ |
| Delete | ✅ | ✅ | ❌ | ❌ |
| **Company Info** | ✅ | ✅ | ❌ | ❌ |
| **Users** | | | | |
| View list | ✅ | ✅ | ❌ | ❌ |
| Create/Edit | ✅ | ❌ | ❌ | ❌ |
| Delete | ✅ | ❌ | ❌ | ❌ |
| **Media** | ✅ | ✅ | ✅ | ✅ |
| Upload | ✅ | ✅ | ✅ | ❌ |
| Delete | ✅ | ✅ | ❌ | ❌ |

---

## 🌐 Public Site Content Driven By Admin

### Homepage
- Company introduction (from CompanyInfo)
- Featured services
- Recent news posts (3 latest published)
- Company vision & mission links

### Services Page
- List of all visible services
- Ordered by `sortOrder`
- Clickable for details

### News/Blog
- List of published posts
- Pagination (10 per page)
- Click post to view full content

### About Page
- Company info (vision, mission, values)
- Services
- Contact form

### Vision & Mission
- CompanyInfo vision + mission fields
- Core values, goals, commitments, strengths

### Contact Form
- Form on `/contact` page
- Submits to `POST /api/contact`
- Data saved to `ContactForm` table
- **Note**: No admin interface to view submissions yet

---

## 🔌 API Endpoints for Admin

### Posts
```
GET    /api/admin/posts              # List all posts
POST   /api/admin/posts              # Create post
PATCH  /api/admin/posts/[id]         # Update post
DELETE /api/admin/posts/[id]         # Delete post
```

### Users
```
GET    /api/admin/users              # List users
POST   /api/admin/users              # Create user
GET    /api/admin/users/[id]         # Get user detail
PATCH  /api/admin/users/[id]         # Update user
DELETE /api/admin/users/[id]         # Delete user
PATCH  /api/admin/users/[id]/password # Change password
GET    /api/admin/users/me           # Get current user
```

### Media
```
GET    /api/media                    # List media
POST   /api/media/upload             # Upload file
DELETE /api/media/[id]               # Delete media
```

### Authentication
```
POST   /api/auth/login               # Login
POST   /api/auth/logout              # Logout
```

---

## 🎨 Admin UI Components

Built with:
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component library
- **Lucide Icons** - Icons
- **React Markdown** - Post preview

#### Key Components:
- Tables (posts, users, services)
- Forms (create/edit)
- Modals (confirmations)
- Alerts (success/error messages)
- Upload area (drag-drop)
- Status badges
- Pagination

---

## 🚀 Features Not Yet Implemented

### Contact Forms Inbox
- View all contact form submissions
- Search/filter submissions
- Mark as read/unread
- Delete old submissions
- Export submissions to CSV

### Partner Management
- CRUD for shipping partners
- Display on partners page
- Model exists but UI not built

### Commodity Management
- CRUD for cargo types
- Model exists but UI not built

### Analytics
- Page views
- Popular posts
- User activity logs
- Admin login history

### Content Scheduling
- Schedule posts for future publish
- Auto-publish at scheduled time

### SEO Tools
- Meta title/description editor
- OpenGraph preview
- SEO score calculator

---

## 💡 Common Tasks

### Create a Blog Post
1. Go to `/admin/posts`
2. Click "New Post"
3. Fill title, summary, content
4. Upload cover image
5. Click "Publish" to make live

### Add a Service
1. Go to `/admin/services`
2. Click "New Service"
3. Fill title, description, icon
4. Set visibility + sort order
5. Save

### Update Company Info
1. Go to `/admin/company-info`
2. Edit vision, mission, contact info
3. Save changes
4. Changes appear on public site

### Manage Admin Users
1. Go to `/admin/users`
2. Create: Click "New User" → set role
3. Edit: Click user email → modify
4. Delete: Click delete icon (warning!)
5. Change password: User must change on first login

### Upload Images
1. Go to `/admin/media`
2. Drag-drop images or click "Upload"
3. Images appear in gallery
4. Click image to copy URL
5. Paste URL in posts, services, etc.

---

## 🔒 Security Notes

- **Login**: JWT token in HTTP-only cookie
- **Protected Routes**: Middleware validates every request
- **Passwords**: Hashed with bcrypt (not stored in plain text)
- **SQL Injection**: Prisma ORM prevents injection
- **CSRF**: Next.js built-in protection
- **Session Timeout**: Token expires after 7 days (configurable)

---

**Last Updated**: 2024-11-21
