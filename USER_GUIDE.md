# Hướng Dẫn Sử Dụng - ICONIC LOGISTICS Admin

> Dành cho **người dùng cuối** (không cần kiến thức lập trình)

---

## 📋 Mục Lục

1. [Đăng Nhập](#1-đăng-nhập)
2. [Xem Tổng Quan](#2-xem-tổng-quan)
3. [Quản Lý Tin Tức](#3-quản-lý-tin-tức)
4. [Xem Liên Hệ](#4-xem-liên-hệ)
5. [Đăng Xuất](#5-đăng-xuất)

---

## 1. Đăng Nhập

### Bước 1: Mở trang admin
- Truy cập: `https://iconiclogs.com/admin/login`
- Hoặc nhấn vào link "Admin" trên website

### Bước 2: Nhập thông tin
- **Email**: Nhập email được cấp (ví dụ: admin@iconiclogs.com)
- **Mật khẩu**: Nhập mật khẩu

### Bước 3: Đăng nhập
- Nhấn nút **"Đăng nhập"**
- Nếu thành công → Chuyển đến trang Dashboard

❗ **Lưu ý**:
- Bạn sẽ tự động đăng xuất sau 7 ngày
- Không chia sẻ mật khẩu với người khác

---

## 2. Xem Tổng Quan

Sau khi đăng nhập, bạn sẽ thấy **Dashboard** với:

### 📊 Thống Kê (4 ô số liệu)

1. **Tổng Tin Tức**
   - Hiển thị tổng số bài viết
   - Số bài đã xuất bản

2. **Dịch Vụ**
   - Số lượng dịch vụ đang hiển thị

3. **Liên Hệ**
   - Số lượng form liên hệ nhận được

4. **Lượt Xem**
   - Thống kê lượt xem (sắp tới)

### 📝 Hoạt Động Gần Đây

- **Tin Tức Mới Nhất**: 5 bài viết gần nhất
- **Liên Hệ Mới Nhất**: 5 form liên hệ gần nhất

---

## 3. Quản Lý Tin Tức

### 3.1. Xem Danh Sách Tin Tức

**Cách làm**:
1. Click **"Tin Tức"** trên sidebar bên trái
2. Xem danh sách tất cả bài viết

**Mỗi bài viết hiển thị**:
- Tiêu đề
- Tóm tắt
- Trạng thái: `DRAFT` (nháp) hoặc `PUBLISHED` (đã xuất bản)
- Slug (đường dẫn URL)
- Ngày cập nhật
- Tác giả

**Hành động**:
- Nhấn **nút mắt** (👁️) để xem bài viết trên website (nếu đã publish)
- Nhấn **"Sửa"** để chỉnh sửa

---

### 3.2. Thêm Tin Tức Mới

**Cách làm**:

#### Bước 1: Click "Thêm Tin Tức"
- Trên trang Tin Tức, nhấn nút **"+ Thêm Tin Tức"** (màu cam)

#### Bước 2: Điền Thông Tin Cơ Bản

1. **Tiêu đề** *(bắt buộc)*
   - Nhập tiêu đề bài viết
   - Ví dụ: "ICONIC Logistics Ra Mắt Dịch Vụ Mới"

2. **Slug (URL)** *(tự động tạo)*
   - Hệ thống tự động tạo từ tiêu đề
   - Có thể sửa lại nếu muốn
   - Ví dụ: `iconic-logistics-ra-mat-dich-vu-moi`

3. **Tóm tắt** *(không bắt buộc)*
   - Viết 1-2 câu mô tả ngắn về bài viết
   - Hiển thị trong danh sách tin tức

4. **URL Ảnh Bìa** *(không bắt buộc)*
   - Dán link ảnh từ internet
   - Ví dụ: `https://images.unsplash.com/photo-123456`
   - **Mẹo**: Tìm ảnh miễn phí tại [unsplash.com](https://unsplash.com)

#### Bước 3: Viết Nội Dung (Markdown)

**Nội dung** *(bắt buộc)*

Viết nội dung bài viết bằng **Markdown** (định dạng văn bản đơn giản).

**Cú pháp Markdown cơ bản**:

```markdown
# Tiêu đề lớn (Heading 1)
## Tiêu đề vừa (Heading 2)
### Tiêu đề nhỏ (Heading 3)

**Chữ in đậm**
*Chữ in nghiêng*

- Danh sách có dấu đầu dòng
- Mục thứ hai
- Mục thứ ba

1. Danh sách đánh số
2. Mục thứ hai
3. Mục thứ ba

[Text hiển thị](https://link-url.com)

![Mô tả ảnh](https://link-anh.jpg)

> Đoạn trích dẫn
```

**Ví dụ thực tế**:

```markdown
# ICONIC LOGISTICS Ra Mắt Dịch Vụ Tracking

## Giới Thiệu

ICONIC LOGISTICS tự hào giới thiệu **hệ thống tracking container**
tự động, giúp khách hàng theo dõi hàng hóa mọi lúc mọi nơi.

## Tính Năng Nổi Bật

- Tra cứu real-time
- Hỗ trợ nhiều hãng tàu
- Giao diện đơn giản, dễ sử dụng

Liên hệ ngay: **0986066174**

![Container](https://images.unsplash.com/photo-123)
```

#### Bước 4: Chọn Trạng Thái

Chọn một trong hai:

1. ⚪ **Lưu nháp** (DRAFT)
   - Chưa hiển thị trên website
   - Có thể chỉnh sửa sau

2. ⚪ **Xuất bản ngay** (PUBLISHED)
   - Hiển thị ngay trên website
   - Người dùng có thể xem

#### Bước 5: Lưu

- Nhấn nút **"Lưu Tin Tức"** (màu cam)
- Chờ thông báo "Thành công"
- Tự động quay về danh sách tin tức

✅ **Hoàn thành!** Bài viết đã được tạo.

---

### 3.3. Sửa Tin Tức

**Cách làm**:

1. Vào **Tin Tức** → Tìm bài viết cần sửa
2. Nhấn nút **"Sửa"**
3. Chỉnh sửa nội dung (giống như khi thêm mới)
4. Nhấn **"Cập Nhật"**

**Hoặc**:

- Nhấn **nút "Xóa"** (màu đỏ, góc dưới) để xóa bài viết
- Hệ thống sẽ hỏi xác nhận trước khi xóa

⚠️ **Lưu ý**: Xóa bài viết không thể hoàn tác!

---

### 3.4. Thay Đổi Trạng Thái

**Từ DRAFT → PUBLISHED**:
1. Sửa bài viết
2. Chọn ⚪ **Xuất bản**
3. Nhấn **"Cập Nhật"**
→ Bài viết hiện trên website

**Từ PUBLISHED → DRAFT**:
1. Sửa bài viết
2. Chọn ⚪ **Lưu nháp**
3. Nhấn **"Cập Nhật"**
→ Bài viết ẩn khỏi website

---

## 4. Xem Liên Hệ

### 4.1. Xem Danh Sách Liên Hệ

**Cách làm**:
1. Vào **Dashboard**
2. Xem phần **"Liên Hệ Mới Nhất"** (5 form gần nhất)

**Mỗi form hiển thị**:
- Tên người gửi
- Email
- Nội dung tin nhắn (rút gọn)
- Ngày gửi

### 4.2. Xem Chi Tiết

Hiện tại chưa có trang chi tiết. Để xem đầy đủ:

**Option 1**: Dùng Prisma Studio (cần dev)
```bash
npm run prisma:studio
```

**Option 2**: Developer sẽ thêm trang admin/contacts sau

---

## 5. Đăng Xuất

**Cách làm**:
1. Click nút **"Đăng Xuất"** ở cuối sidebar (bên trái)
2. Tự động quay về trang login

⚠️ **Lưu ý**: Luôn nhớ đăng xuất khi dùng máy chung!

---

## 💡 Mẹo & Tricks

### 📸 Tìm Ảnh Miễn Phí

**Nguồn ảnh chất lượng cao**:
- [Unsplash](https://unsplash.com) - Ảnh miễn phí đẹp
- [Pexels](https://pexels.com) - Ảnh & video miễn phí
- [Pixabay](https://pixabay.com) - Hàng triệu ảnh

**Cách lấy link**:
1. Tìm ảnh phù hợp
2. Right-click → "Copy image address"
3. Paste vào ô "URL Ảnh Bìa"

### ✍️ Viết Markdown Nhanh

**Công cụ trợ giúp**:
- [Markdown Cheatsheet](https://www.markdownguide.org/cheat-sheet/)
- [Markdown Live Preview](https://markdownlivepreview.com/) - Test trước khi đăng

**Mẫu template tin tức**:

```markdown
# [Tiêu đề bài viết]

![Ảnh chính](URL-ảnh)

## Tóm Tắt

[1-2 câu giới thiệu ngắn gọn]

## Nội Dung Chính

[Đoạn văn mô tả chi tiết...]

### Điểm Nổi Bật

- ✅ Điểm 1
- ✅ Điểm 2
- ✅ Điểm 3

## Kết Luận

[Tóm tắt và CTA]

---

**Liên hệ ngay**: 📞 0986066174 | 📧 info@iconiclogs.com
```

### 🎯 SEO Tips

**Để bài viết dễ tìm trên Google**:

1. **Tiêu đề**:
   - Ngắn gọn (50-60 ký tự)
   - Chứa từ khóa chính
   - Ví dụ: "Dịch Vụ Vận Chuyển Container TP.HCM"

2. **Tóm tắt**:
   - 150-160 ký tự
   - Mô tả chính xác nội dung
   - Có CTA (call to action)

3. **Slug**:
   - Ngắn, có từ khóa
   - Dùng dấu gạch ngang `-`
   - Ví dụ: `van-chuyen-container-tphcm`

4. **Nội dung**:
   - Tối thiểu 300 từ
   - Chia thành các mục rõ ràng
   - Có hình ảnh minh họa

---

## ❓ FAQ - Câu Hỏi Thường Gặp

### Q: Tôi quên mật khẩu, làm sao?
**A**: Liên hệ với developer để reset password.

### Q: Bài viết đã publish có thể sửa không?
**A**: Có, hoàn toàn có thể. Vào Sửa → Cập Nhật.

### Q: Xóa nhầm bài viết, lấy lại được không?
**A**: Không. Hãy liên hệ developer nếu có database backup.

### Q: Tôi có thể upload ảnh từ máy tính không?
**A**: Hiện tại chưa. Hãy upload lên Unsplash hoặc dùng link ảnh online.

### Q: Làm sao để thêm video vào bài viết?
**A**:
```markdown
[![Video Title](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
```

### Q: Có giới hạn số lượng bài viết không?
**A**: Không giới hạn.

### Q: Dashboard có app mobile không?
**A**: Chưa có. Nhưng website responsive, dùng được trên điện thoại.

---

## 🆘 Liên Hệ Hỗ Trợ

Nếu gặp vấn đề:

1. **Technical Issues**: Liên hệ developer
2. **Content Questions**: Liên hệ marketing team
3. **Urgent**: Gọi 📞 0986066174

---

## ✅ Checklist Đăng Bài

Trước khi publish, kiểm tra:

- [ ] Tiêu đề hấp dẫn, có từ khóa
- [ ] Slug ngắn gọn, dễ nhớ
- [ ] Tóm tắt súc tích (150-160 ký tự)
- [ ] Có ảnh bìa đẹp, liên quan
- [ ] Nội dung tối thiểu 300 từ
- [ ] Chia thành các mục rõ ràng (H2, H3)
- [ ] Có CTA (liên hệ, số điện thoại)
- [ ] Kiểm tra chính tả
- [ ] Preview trên mobile
- [ ] Chọn trạng thái PUBLISHED

---

## 🎓 Training Video (Sắp Tới)

Sẽ có video hướng dẫn chi tiết:
- Screen recording đăng nhập
- Demo tạo bài viết
- Tips & tricks

---

**Chúc bạn quản lý nội dung hiệu quả!** 🚀

---

*Tài liệu được cập nhật: Tháng 1/2024*
*Phiên bản: 1.0*
