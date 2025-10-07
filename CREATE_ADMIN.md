# 🔐 Tạo SUPER_ADMIN User

## Cách 1: Sử dụng PostgreSQL trực tiếp (Khuyến nghị cho Production)

### Bước 1: Tạo password hash

Trên máy local (có Node.js):

```bash
node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD_HERE', 10))"
```

Ví dụ với password `Admin@123456`:
```bash
node -e "console.log(require('bcryptjs').hashSync('Admin@123456', 10))"
```

Kết quả sẽ ra một chuỗi hash như: `$2a$10$abcdef...`

### Bước 2: Kết nối PostgreSQL và chạy SQL

Trên VPS:

```bash
# Kết nối PostgreSQL (n8n_postgres container)
docker exec -it n8n_postgres psql -U iconic_user -d iconic_logistics
```

Hoặc sử dụng pgAdmin tại `http://vmi2844236:8080`

### Bước 3: Chạy SQL Query

Thay `YOUR_EMAIL` và `PASSWORD_HASH` bằng giá trị thực:

```sql
-- Kiểm tra user đã tồn tại chưa
SELECT id, email, role FROM users WHERE email = 'admin@iconiclogs.com';

-- Nếu user chưa tồn tại, tạo mới:
INSERT INTO users (id, email, name, password_hash, role, active, created_at, updated_at)
VALUES (
    gen_random_uuid()::text,
    'admin@iconiclogs.com',
    'Admin ICONIC',
    '$2a$10$YOUR_HASHED_PASSWORD_HERE',
    'SUPER_ADMIN',
    true,
    NOW(),
    NOW()
);

-- Nếu user đã tồn tại, cập nhật:
UPDATE users
SET
    role = 'SUPER_ADMIN',
    password_hash = '$2a$10$YOUR_HASHED_PASSWORD_HERE',
    name = 'Admin ICONIC',
    active = true
WHERE email = 'admin@iconiclogs.com';
```

### Bước 4: Kiểm tra

```sql
SELECT id, email, name, role, active, created_at
FROM users
WHERE role = 'SUPER_ADMIN';
```

## Cách 2: Sử dụng Script trên Local (Development)

Trên máy local (không phải VPS):

```bash
npm run create:super-admin
```

Script sẽ hỏi:
- Email
- Tên
- Password

## Ví dụ Hoàn Chỉnh

### Tạo user `admin@iconiclogs.com` với password `SecurePass123!`

1. **Tạo hash trên local:**
```bash
node -e "console.log(require('bcryptjs').hashSync('SecurePass123!', 10))"
# Output: $2a$10$Ht8VJxGxqF2J.WqC8S7nOeKXdVQF7G5cH8kJ9LmN0pQ1rS2tU3vW4
```

2. **Chạy SQL trên VPS:**
```bash
docker exec -it n8n_postgres psql -U iconic_user -d iconic_logistics
```

```sql
INSERT INTO users (id, email, name, password_hash, role, active, created_at, updated_at)
VALUES (
    gen_random_uuid()::text,
    'admin@iconiclogs.com',
    'Admin ICONIC',
    '$2a$10$Ht8VJxGxqF2J.WqC8S7nOeKXdVQF7G5cH8kJ9LmN0pQ1rS2tU3vW4',
    'SUPER_ADMIN',
    true,
    NOW(),
    NOW()
);
```

3. **Kiểm tra:**
```sql
SELECT email, name, role FROM users;
```

4. **Đăng nhập:**
- Truy cập: https://iconiclogs.com/admin
- Email: admin@iconiclogs.com
- Password: SecurePass123!

## Lưu Ý Bảo Mật

⚠️ **QUAN TRỌNG:**
- Đổi password ngay sau khi đăng nhập lần đầu
- Không share password hash với ai
- Sử dụng password mạnh (ít nhất 12 ký tự, có chữ hoa, thường, số, ký tự đặc biệt)
- Chỉ tạo 1-2 tài khoản SUPER_ADMIN

## Troubleshooting

### Lỗi: "duplicate key value"
User đã tồn tại, dùng UPDATE thay vì INSERT

### Lỗi: "relation users does not exist"
Chạy migration trước:
```bash
docker compose -f docker-compose.production.yml exec web npx prisma migrate deploy
```

### Không đăng nhập được
- Kiểm tra password hash đã đúng chưa
- Kiểm tra user có active = true không
- Clear cookies và thử lại
