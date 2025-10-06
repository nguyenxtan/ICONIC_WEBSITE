# 🔐 GitHub Actions - Hướng Dẫn Setup Secrets

## ⚠️ Hiện Trạng

Workflows đã được **disable tạm thời** vì thiếu server configuration secrets.

**Current status:**
- ✅ Build & Lint: ACTIVE (chạy khi push)
- ⏸️ SSH Deployment: DISABLED (manual trigger only)
- ⏸️ Docker Deployment: DISABLED (manual trigger only)

## 🎯 Khi Nào Cần Enable Workflows?

Khi bạn đã có:
1. ✅ Server Ubuntu/Debian đang chạy
2. ✅ PostgreSQL đã cài đặt và cấu hình
3. ✅ SSH access vào server
4. ✅ Domain đã trỏ về server IP (optional)

---

## 📝 BƯỚC 1: Chuẩn Bị Server

### 1.1. Mua/Chuẩn bị VPS

**Nhà cung cấp gợi ý:**
- DigitalOcean (droplet): $6/tháng
- Vultr: $5/tháng
- Linode: $5/tháng
- AWS Lightsail: $3.5/tháng
- Azure VM: $4/tháng
- Hoặc VPS Việt Nam (BKNS, Viettel IDC, etc.)

**Yêu cầu:**
- OS: Ubuntu 22.04 LTS
- RAM: 2GB+ (khuyến nghị 4GB)
- CPU: 2 cores+
- Disk: 20GB+
- Public IP

### 1.2. SSH vào Server lần đầu

```bash
# Nhận IP và root password từ VPS provider
ssh root@YOUR_SERVER_IP

# Hoặc nếu đã có user
ssh ubuntu@YOUR_SERVER_IP
```

### 1.3. Chạy Auto Setup Script

```bash
# Clone repository
git clone https://github.com/nguyenxtan/ICONIC_WEBSITE.git /var/www/iconic-website
cd /var/www/iconic-website

# Run setup script
chmod +x scripts/server-setup.sh
./scripts/server-setup.sh
```

Script sẽ tự động cài:
- Node.js 20
- PostgreSQL 16
- Nginx
- PM2
- Git, UFW, Certbot

---

## 🔑 BƯỚC 2: Tạo SSH Key cho GitHub Actions

### 2.1. Generate SSH Key trên Server

```bash
# Tạo SSH key riêng cho GitHub Actions
ssh-keygen -t ed25519 -C "github-actions@iconic" -f ~/.ssh/github-actions

# Nhấn Enter để skip passphrase (KHÔNG đặt password)
```

### 2.2. Add Public Key vào Authorized Keys

```bash
# Add public key
cat ~/.ssh/github-actions.pub >> ~/.ssh/authorized_keys

# Set correct permissions
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/github-actions
```

### 2.3. Copy Private Key

```bash
# Show private key
cat ~/.ssh/github-actions
```

**Copy toàn bộ output** (từ `-----BEGIN OPENSSH PRIVATE KEY-----` đến `-----END OPENSSH PRIVATE KEY-----`)

**Lưu ý:** Giữ key này bí mật!

---

## 🗄️ BƯỚC 3: Setup PostgreSQL

### 3.1. Tạo Database

```bash
# Login as postgres user
sudo -u postgres psql
```

### 3.2. Run SQL Commands

```sql
-- Create database user
CREATE USER iconic_user WITH PASSWORD 'YOUR_STRONG_PASSWORD';

-- Create database
CREATE DATABASE iconic_logistics;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE iconic_logistics TO iconic_user;

-- Switch to database
\c iconic_logistics

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO iconic_user;

-- Exit
\q
```

### 3.3. Test Connection

```bash
psql -U iconic_user -d iconic_logistics -h localhost

# Enter password when prompted
# If successful: \q to exit
```

### 3.4. Note Connection String

```
DATABASE_URL="postgresql://iconic_user:YOUR_PASSWORD@localhost:5432/iconic_logistics?schema=public"
```

**Lưu lại string này!**

---

## 🔐 BƯỚC 4: Generate JWT Secret

```bash
# Generate random 64-character string
openssl rand -base64 64
```

**Copy output, lưu lại!**

Example output:
```
mK3pL9xR2vN8qT5wY7uZ1aS4dF6gH0jK2lM5nP8rT1vX4wY7zA0bC3eF6gH9jK2l
```

---

## 🌐 BƯỚC 5: Thêm GitHub Secrets

### 5.1. Vào GitHub Repository Settings

1. Mở: https://github.com/nguyenxtan/ICONIC_WEBSITE
2. Click tab **Settings**
3. Sidebar trái: **Secrets and variables** → **Actions**
4. Click **New repository secret**

### 5.2. Thêm từng Secret

| Secret Name | Value | Ví dụ |
|------------|-------|-------|
| `SERVER_HOST` | Server IP hoặc domain | `123.45.67.89` hoặc `iconiclogs.com` |
| `SERVER_USER` | SSH username | `ubuntu` hoặc `root` |
| `SERVER_SSH_KEY` | Private key từ bước 2.3 | `-----BEGIN OPENSSH...` |
| `SERVER_PORT` | SSH port | `22` |
| `DEPLOY_PATH` | App directory path | `/var/www/iconic-website` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://iconic_user:pass@localhost:5432/iconic_logistics?schema=public` |
| `DIRECT_URL` | Same as DATABASE_URL | `postgresql://iconic_user:pass@localhost:5432/iconic_logistics?schema=public` |
| `JWT_SECRET` | Generated từ bước 4 | `mK3pL9xR2vN8...` |
| `SITE_URL` | Production domain | `https://iconiclogs.com` |

**⚠️ Lưu ý:**
- Mỗi secret phải được add riêng lẻ
- Không có khoảng trắng đầu/cuối
- DATABASE_URL phải có password thật
- SSH key phải bao gồm cả header/footer

---

## 🚀 BƯỚC 6: Enable Workflows

### 6.1. Edit Workflow Files

**File:** `.github/workflows/deploy.yml`

```yaml
# Uncomment these lines (remove # ở đầu dòng):

name: Deploy to Production Server  # Bỏ comment

on:
  push:
    branches:
      - main
  workflow_dispatch:

# ... rest of file
```

### 6.2. Uncomment Deployment Step

Tìm đoạn:
```yaml
# - name: Deploy to Server via SSH
#   uses: appleboy/ssh-action@v1.0.3
```

Bỏ hết dấu `#` để thành:
```yaml
- name: Deploy to Server via SSH
  uses: appleboy/ssh-action@v1.0.3
  with:
    host: ${{ secrets.SERVER_HOST }}
    # ... rest
```

### 6.3. Commit Changes

```bash
git add .github/workflows/deploy.yml
git commit -m "chore: enable GitHub Actions deployment"
git push origin main
```

---

## ✅ BƯỚC 7: Test Deployment

### 7.1. Trigger Manual Deploy

1. Vào GitHub repository
2. Tab **Actions**
3. Chọn workflow **Deploy to Production Server**
4. Click **Run workflow** → **Run workflow**

### 7.2. Xem Logs

- Click vào workflow run
- Xem từng step
- Nếu có lỗi, đọc log để debug

### 7.3. Verify trên Server

```bash
# SSH vào server
ssh ubuntu@YOUR_SERVER_IP

# Check PM2 status
pm2 status

# Check logs
pm2 logs iconic-website

# Check website
curl http://localhost:3000
```

---

## 🐛 Troubleshooting

### Lỗi: "Permission denied (publickey)"

**Nguyên nhân:** SSH key không đúng

**Fix:**
```bash
# Verify public key trong authorized_keys
cat ~/.ssh/authorized_keys | grep github-actions

# Verify private key được copy đúng
cat ~/.ssh/github-actions
# Copy lại và update GitHub Secret SERVER_SSH_KEY
```

### Lỗi: "Host key verification failed"

**Fix:** Add server vào known_hosts
```bash
# On your local machine
ssh-keyscan YOUR_SERVER_IP >> ~/.ssh/known_hosts
```

### Lỗi: "pm2 command not found"

**Fix:**
```bash
# Install PM2 globally
sudo npm install -g pm2
```

### Lỗi: Database connection refused

**Fix:**
```bash
# Check PostgreSQL running
sudo systemctl status postgresql

# Check connection
psql -U iconic_user -d iconic_logistics -h localhost

# Verify DATABASE_URL secret có đúng password
```

### Lỗi: "Cannot find module 'autoprefixer'"

**Fix:**
```bash
# On server
cd /var/www/iconic-website
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📊 Checklist Deploy

- [ ] Server Ubuntu 22.04 đang chạy
- [ ] Đã chạy `server-setup.sh`
- [ ] PostgreSQL database đã tạo
- [ ] SSH key đã generate
- [ ] Public key trong `~/.ssh/authorized_keys`
- [ ] Private key đã copy
- [ ] DATABASE_URL đã note lại
- [ ] JWT_SECRET đã generate
- [ ] 9 GitHub Secrets đã add đủ
- [ ] Workflow file đã uncomment
- [ ] Test manual deploy thành công
- [ ] PM2 status = online
- [ ] Website accessible qua curl
- [ ] Nginx reverse proxy đã setup
- [ ] SSL certificate đã install (optional)
- [ ] Domain DNS đã trỏ về server (optional)

---

## 🎉 Khi Đã Setup Xong

**Workflow tự động:**
1. Push code lên GitHub
2. GitHub Actions tự động:
   - Build Next.js
   - SSH vào server
   - Pull code mới
   - Install dependencies
   - Run migrations
   - Rebuild app
   - Restart PM2
3. Website tự động update!

**Monitor deployment:**
- GitHub: Actions tab
- Server: `pm2 logs iconic-website`

---

## 📞 Support

Nếu gặp vấn đề:
1. Đọc error logs trên GitHub Actions
2. SSH vào server check logs: `pm2 logs`
3. Check PostgreSQL: `sudo systemctl status postgresql`
4. Verify secrets: GitHub → Settings → Secrets

---

Built with ❤️ by ICONIC LOGISTICS
