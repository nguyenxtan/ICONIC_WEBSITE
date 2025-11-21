# 🔧 Setup admin.iconiclogs.com - Hướng Dẫn Chi Tiết

> **Tình trạng:** Nginx config đã được cập nhật ✅
> **Cần thực hiện:** DNS setup + reload Nginx trên server

---

## 📋 Tóm Tắt Vấn Đề & Giải Pháp

### Vấn Đề Cũ:
- ❌ `admin.iconiclogs.com` không hoạt động
- ❌ Nginx config chỉ cấu hình cho `iconiclogs.com` và `www.iconiclogs.com`
- ❌ Admin routes chỉ accessible qua `/admin` path

### Giải Pháp (Đã implement):
- ✅ Thêm server block mới trong `nginx.conf` cho `admin.iconiclogs.com`
- ✅ Config proxy `admin.iconiclogs.com` → `http://localhost:3000/admin`
- ✅ Add separate logs cho admin access/errors

---

## 🚀 Các Bước Setup Trên Server Ubuntu

### **Step 1: Tạo DNS Record** (Quan trọng!)

Đăng nhập vào **Hosting/DNS Provider** (Namecheap, GoDaddy, Cloudflare, etc.):

**Thêm A record:**
```
Type:  A
Name:  admin
Value: [IP Server của bạn]
TTL:   3600
```

**Ví dụ:** Nếu iconiclogs.com resolve tới IP `203.0.113.42`, thì admin cũng phải point tới IP này.

**Kiểm tra DNS đã cấu hình đúng:**
```bash
nslookup admin.iconiclogs.com
# Phải output IP của server bạn
```

---

### **Step 2: SSH vào Server & Update Nginx**

```bash
# SSH vào server
ssh root@your-server-ip

# Vào directory project
cd ~/iconic_web/ICONIC_WEBSITE

# Kiểm tra file nginx.conf mới
cat nginx.conf
```

**Copy Nginx config:**
```bash
# Backup cái cũ
sudo cp /etc/nginx/sites-available/iconic-website /etc/nginx/sites-available/iconic-website.bak

# Copy config mới
sudo cp nginx.conf /etc/nginx/sites-available/iconic-website
```

**Kiểm tra syntax:**
```bash
sudo nginx -t
```

Output phải là:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration will be successful
```

**Reload Nginx:**
```bash
sudo systemctl reload nginx
```

---

### **Step 3: Kiểm Tra Hoạt Động**

**Test ngay trên server:**
```bash
# Test qua IP
curl -H "Host: admin.iconiclogs.com" http://localhost/
# Phải output HTML của admin login page

# Hoặc test qua domain (nếu DNS đã propagate)
curl http://admin.iconiclogs.com
```

**Test từ local máy tính:**
```bash
# Nếu DNS đã propagate (chờ 5-30 phút)
curl -I http://admin.iconiclogs.com

# Output phần header phải có:
# HTTP/1.1 200 OK
# Content-Type: text/html
```

**Test trên Browser:**
- Mở `http://admin.iconiclogs.com`
- Phải hiển thị trang login admin
- URL phải không có `/admin` ở cuối

---

### **Step 4: (Optional) Setup HTTPS với Let's Encrypt**

Nếu bạn muốn `https://admin.iconiclogs.com`:

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Generate certificate cho tất cả domains
sudo certbot --nginx -d admin.iconiclogs.com -d iconiclogs.com -d www.iconiclogs.com

# Certbot sẽ tự cập nhật nginx.conf thêm HTTPS config
```

**Sau khi Certbot chạy xong:**
- Tất cả domains sẽ auto-redirect HTTP → HTTPS
- Certificate sẽ auto-renew hàng tháng

---

## 🔍 Troubleshooting

### ❌ "admin.iconiclogs.com refused to connect" hoặc "Network timeout"

**Nguyên nhân:** DNS chưa propagate hoặc Nginx chưa reload

**Fix:**
```bash
# 1. Kiểm tra DNS resolve
nslookup admin.iconiclogs.com
# Phải output: 203.0.113.42 (hoặc IP server bạn)

# 2. Kiểm tra Nginx chạy không
sudo systemctl status nginx
# Phải show: active (running)

# 3. Nếu Nginx chưa chạy, start
sudo systemctl start nginx

# 4. Reload lại
sudo systemctl reload nginx

# 5. Kiểm tra lỗi Nginx
sudo nginx -t

# 6. Xem logs
sudo tail -50 /var/log/nginx/iconic-admin-error.log
```

### ❌ "502 Bad Gateway"

**Nguyên nhân:** Next.js server (port 3000) không hoạt động

**Fix:**
```bash
# Kiểm tra docker container
docker ps | grep iconic_web
# Phải show: iconic_web container running

# Nếu container chết, restart
docker restart iconic_web

# Xem logs
docker logs -f iconic_web
# Kiểm tra có error gì

# Kiểm tra port 3000
sudo lsof -i :3000
# Phải show: node (hoặc process chạy Next.js)
```

### ❌ "Trang load nhưng styling/CSS broken"

**Nguyên nhân:** Static files (_next/static) không load đúng

**Fix:**
```bash
# Check nginx logs
sudo tail -50 /var/log/nginx/iconic-admin-error.log

# Kiểm tra static files có tồn tại
docker exec iconic_web ls -la public/_next/static/

# Kiểm tra nginx config
sudo nginx -t -v
```

### ❌ "admin.iconiclogs.com loads fine nhưng /dashboard 404"

**Nguyên nhân:** Route path bị sai

**Fix:**
```bash
# Kiểm tra routes có tồn tại
docker exec iconic_web ls -la src/app/admin/

# Restart container
docker restart iconic_web
```

---

## ✅ Verification Checklist

Sau khi setup, kiểm tra từng item:

- [ ] DNS record `admin.iconiclogs.com` tạo thành công
- [ ] `nslookup admin.iconiclogs.com` resolve tới IP server
- [ ] `sudo nginx -t` output "ok"
- [ ] `sudo systemctl reload nginx` hoàn thành không lỗi
- [ ] `curl -I http://admin.iconiclogs.com` return HTTP 200
- [ ] Mở browser vào `http://admin.iconiclogs.com` → thấy login page
- [ ] Click "Remember me" checkbox + login thành công
- [ ] `/dashboard` page load bình thường
- [ ] Logs không show error: `sudo tail -f /var/log/nginx/iconic-admin-error.log`

---

## 📊 Nginx Config Chi Tiết

**Server block mới cho admin subdomain:**

```nginx
# Admin Subdomain (admin.iconiclogs.com)
server {
    listen 80;
    server_name admin.iconiclogs.com;

    # Logs
    access_log /var/log/nginx/iconic-admin-access.log;
    error_log /var/log/nginx/iconic-admin-error.log;

    # Redirect / → /admin (proxy tới Next.js /admin route)
    location / {
        proxy_pass http://localhost:3000/admin;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

---

## 🎯 TL;DR (Quick Setup)

```bash
# 1. Add DNS A record: admin → your-server-ip (tại DNS provider)

# 2. SSH vào server
ssh root@your-server-ip

# 3. Update nginx config
cd ~/iconic_web/ICONIC_WEBSITE
sudo cp nginx.conf /etc/nginx/sites-available/iconic-website

# 4. Test & reload
sudo nginx -t
sudo systemctl reload nginx

# 5. Verify
curl http://admin.iconiclogs.com

# Done! ✅
```

---

## 📞 Notes

- Config đã được update, chỉ cần cập nhật trên server
- Cả 2 domain (`iconiclogs.com` + `admin.iconiclogs.com`) dùng cùng 1 Next.js app (port 3000)
- Admin routes vẫn accessible qua `/admin` path từ main domain
- Logs sẽ separate giữa main website (`iconic-website-*.log`) và admin (`iconic-admin-*.log`)

---

**Lần cập nhật cuối:** 2024-11-21
**File:** `nginx.conf` (updated)
**Status:** Ready to deploy ✅
