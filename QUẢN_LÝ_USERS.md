# 🔐 Hướng Dẫn Quản Lý Users và Phân Quyền

## 📋 Các Role trong Hệ Thống

### 1. **SUPER_ADMIN** (Super Admin)
- ✅ Toàn quyền quản lý users (tạo, sửa, xóa, đổi password)
- ✅ Toàn quyền quản lý nội dung (posts, services, company info, media)
- ✅ Có thể thay đổi role của users khác
- ❌ Không thể tự deactivate hoặc xóa tài khoản của chính mình

### 2. **ADMIN** (Admin)
- ✅ Quản lý toàn bộ nội dung
- ✅ Publish/unpublish posts
- ✅ Quản lý services, company info
- ✅ Upload/delete media
- ❌ Không thể quản lý users

### 3. **EDITOR** (Editor)
- ✅ Tạo và chỉnh sửa posts (chỉ ở trạng thái DRAFT)
- ✅ Chỉnh sửa services
- ✅ Upload media (không xóa được)
- ❌ Không thể publish posts
- ❌ Không thể xóa nội dung

### 4. **VIEWER** (Viewer)
- ✅ Chỉ xem (read-only)
- ❌ Không thể chỉnh sửa gì

## 🚀 Cách Tạo SUPER_ADMIN User Đầu Tiên

### Trên Local Machine:

```bash
npm run create:super-admin
```

Nhập thông tin:
- Email: admin@iconic.vn
- Tên: Admin (tùy chọn)
- Password: ********

### Trên Production Server (VPS):

```bash
# SSH vào server
ssh root@vmi2844236

# Di chuyển vào thư mục project
cd ~/iconic_web/ICONIC_WEBSITE

# Chạy script tạo super admin
docker compose -f docker-compose.production.yml exec web npm run create:super-admin
```

## 📝 Cách Quản Lý Users

### 1. Đăng Nhập với SUPER_ADMIN
- Truy cập: `https://iconic.vn/admin`
- Đăng nhập với tài khoản SUPER_ADMIN vừa tạo

### 2. Truy Cập Trang Quản Lý Users
- Sau khi đăng nhập, click vào **"Quản lý Users"** trong sidebar
- Hoặc truy cập: `https://iconic.vn/admin/users`

### 3. Tạo User Mới
- Click nút **"Thêm User"**
- Nhập thông tin:
  - Email (bắt buộc)
  - Tên (tùy chọn)
  - Password (bắt buộc)
  - Role (chọn: SUPER_ADMIN, ADMIN, EDITOR, hoặc VIEWER)
- Click **"Tạo User"**

### 4. Chỉnh Sửa User
- Click icon **Pencil** (✏️) bên cạnh user cần sửa
- Có thể thay đổi:
  - Email
  - Tên
  - Role
- Click **"Cập Nhật"**

### 5. Đổi Password
- Click icon **Key** (🔑) bên cạnh user cần đổi password
- Nhập password mới (tối thiểu 6 ký tự)
- Click **"Đổi Password"**

### 6. Kích Hoạt/Vô Hiệu Hóa User
- Click icon **CheckCircle** (✓) hoặc **XCircle** (✗) để toggle trạng thái
- User bị vô hiệu hóa không thể đăng nhập

### 7. Xóa User
- Click icon **Trash** (🗑️) để xóa user
- Xác nhận xóa trong dialog
- ⚠️ **Lưu ý**: Không thể xóa chính tài khoản đang đăng nhập

## 🔒 Đổi Password Của Chính Mình

Có 2 cách:

### Cách 1: Từ Trang Quản Lý Users (SUPER_ADMIN)
- Vào **Admin > Quản lý Users**
- Tìm tài khoản của mình
- Click icon **Key** (🔑)
- Nhập password mới

### Cách 2: Sử dụng Script
```bash
# Local
npm run create:super-admin

# Production (trong container)
docker compose -f docker-compose.production.yml exec web npm run create:super-admin
```
Nhập lại email hiện tại, script sẽ cập nhật password mới.

## 📊 Kiểm Tra Permissions

Hệ thống có các permissions:
- `user:read`, `user:create`, `user:update`, `user:delete`
- `post:read`, `post:create`, `post:update`, `post:delete`, `post:publish`
- `service:read`, `service:create`, `service:update`, `service:delete`
- `company:read`, `company:update`
- `media:read`, `media:upload`, `media:delete`

Sử dụng trong code:
```typescript
import { hasPermission } from '@/lib/permissions'

if (hasPermission(user.role, 'user:create')) {
  // Cho phép tạo user
}
```

## 🔄 Migration trên Production

Khi deploy lên production:

```bash
# Pull code mới
git pull origin main

# Rebuild và restart containers
docker compose -f docker-compose.production.yml down
docker compose -f docker-compose.production.yml build --no-cache
docker compose -f docker-compose.production.yml up -d

# Migration sẽ tự động chạy khi container khởi động
```

## ⚠️ Lưu Ý Quan Trọng

1. **Bảo Mật Password**: Luôn dùng password mạnh (ít nhất 8 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt)

2. **Backup Database**: Trước khi migration, nên backup database:
```bash
# Local
pg_dump iconic_logistics > backup.sql

# Production
docker compose -f docker-compose.production.yml exec db pg_dump -U iconic_user iconic_logistics > backup.sql
```

3. **Giới Hạn SUPER_ADMIN**: Chỉ nên có 1-2 tài khoản SUPER_ADMIN để tránh rủi ro bảo mật

4. **Inactive Users**: Thay vì xóa, nên vô hiệu hóa (inactive) users không còn sử dụng

5. **Audit Log**: Trong tương lai nên thêm logging để theo dõi các thao tác quan trọng của users

## 🐛 Troubleshooting

### Lỗi: "Forbidden" khi truy cập /admin/users
- Kiểm tra role của user hiện tại
- Chỉ SUPER_ADMIN mới có quyền truy cập trang này

### Không thể đăng nhập
- Kiểm tra user có bị inactive không
- Reset password bằng script `create:super-admin`

### Lỗi migration
- Kiểm tra database connection
- Xem logs: `docker compose -f docker-compose.production.yml logs -f`
