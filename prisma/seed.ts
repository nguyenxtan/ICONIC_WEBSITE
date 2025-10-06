import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@iconiclogs.com' },
    update: {},
    create: {
      email: 'admin@iconiclogs.com',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Created admin user:', admin.email)

  // Create company info
  const companyInfo = await prisma.companyInfo.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      nameVi: 'CÔNG TY TNHH ICONIC LOGISTICS',
      nameEn: 'ICONIC LOGISTICS VIETNAM COMPANY LIMITED',
      phone: '0986066174',
      email: 'info@iconiclogs.com',
      address: '25/49 Đường 6, Khu phố 26, Phường Hiệp Bình, TP.HCM, Việt Nam',
      vision: `Trở thành đối tác logistics đáng tin cậy hàng đầu tại Việt Nam, mang đến giải pháp vận chuyển
và kho bãi toàn diện cho khách hàng trong và ngoài nước. Chúng tôi cam kết không ngừng đổi mới,
áp dụng công nghệ hiện đại để tối ưu hóa quy trình và nâng cao trải nghiệm khách hàng.`,
      mission: `Sứ mệnh của ICONIC LOGISTICS là cung cấp dịch vụ logistics chất lượng cao, an toàn và hiệu quả.
Chúng tôi luôn đặt lợi ích khách hàng lên hàng đầu, xây dựng mối quan hệ đối tác bền vững thông qua
sự chuyên nghiệp, minh bạch và tận tâm trong từng dịch vụ.`,
    },
  })
  console.log('✅ Created company info')

  // Create services
  const services = [
    {
      slug: 'van-chuyen-duong-bien',
      title: 'Vận Chuyển Đường Biển',
      description: 'Dịch vụ vận chuyển container quốc tế đường biển với mạng lưới toàn cầu, giá cả cạnh tranh.',
      content: `# Dịch Vụ Vận Chuyển Đường Biển

## Tổng Quan
ICONIC LOGISTICS cung cấp dịch vụ vận chuyển container đường biển toàn cầu với mạng lưới đối tác uy tín.

## Dịch Vụ Bao Gồm
- **FCL (Full Container Load)**: Vận chuyển nguyên container
- **LCL (Less than Container Load)**: Vận chuyển hàng lẻ
- **Reefer Container**: Container lạnh cho hàng đông lạnh
- **Special Equipment**: Thiết bị đặc biệt (Open Top, Flat Rack, Tank)

## Ưu Điểm
- ✅ Giá cước cạnh tranh
- ✅ Tracking real-time
- ✅ Hỗ trợ 24/7
- ✅ Bảo hiểm hàng hóa
- ✅ Thủ tục hải quan nhanh chóng`,
      icon: 'Ship',
      sortOrder: 1,
      visible: true,
    },
    {
      slug: 'khai-bao-hai-quan',
      title: 'Khai Báo Hải Quan',
      description: 'Hỗ trợ thủ tục hải quan xuất nhập khẩu nhanh chóng, chính xác với đội ngũ chuyên viên giàu kinh nghiệm.',
      content: `# Dịch Vụ Khai Báo Hải Quan

## Giới Thiệu
Đội ngũ chuyên viên hải quan giàu kinh nghiệm của ICONIC LOGISTICS sẽ hỗ trợ bạn hoàn tất mọi thủ tục xuất nhập khẩu.

## Dịch Vụ
- 📋 Tư vấn HS Code và thuế suất
- 📋 Khai báo hải quan xuất/nhập khẩu
- 📋 Giải quyết thông quan nhanh
- 📋 Xử lý hồ sơ chứng từ
- 📋 Kiểm tra chất lượng hàng hóa

## Quy Trình
1. Tiếp nhận hồ sơ và hàng hóa
2. Phân loại và khai báo
3. Nộp hồ sơ lên hải quan
4. Theo dõi và giải quyết vướng mắc
5. Thông quan và giao hàng`,
      icon: 'FileCheck',
      sortOrder: 2,
      visible: true,
    },
    {
      slug: 'kho-bai-va-van-chuyen-noi-dia',
      title: 'Kho Bãi & Vận Chuyển Nội Địa',
      description: 'Dịch vụ kho bãi hiện đại và vận chuyển nội địa toàn quốc với hệ thống quản lý thông minh.',
      content: `# Kho Bãi & Vận Chuyển Nội Địa

## Hệ Thống Kho
ICONIC LOGISTICS sở hữu hệ thống kho bãi hiện đại, đáp ứng đa dạng nhu cầu lưu trữ.

## Dịch Vụ Kho Bãi
- 🏢 Kho tiêu chuẩn & kho lạnh
- 🏢 Quản lý tồn kho real-time
- 🏢 Dịch vụ đóng gói, dán nhãn
- 🏢 Cross-docking
- 🏢 Bảo hiểm hàng tồn kho

## Vận Chuyển Nội Địa
- 🚚 Xe tải các loại tải trọng
- 🚚 Giao hàng nhanh trong ngày
- 🚚 Theo dõi lộ trình GPS
- 🚚 Bốc xếp chuyên nghiệp
- 🚚 Phủ sóng toàn quốc`,
      icon: 'Warehouse',
      sortOrder: 3,
      visible: true,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    })
  }
  console.log('✅ Created services')

  // Create sample posts
  const posts = [
    {
      slug: 'iconic-logistics-ra-mat-dich-vu-tracking-container',
      title: 'ICONIC LOGISTICS Ra Mắt Dịch Vụ Tracking Container Tự Động',
      summary: 'Hệ thống tracking container real-time giúp khách hàng theo dõi hành trình hàng hóa mọi lúc mọi nơi',
      coverImageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200',
      contentMd: `# ICONIC LOGISTICS Ra Mắt Dịch Vụ Tracking Container Tự Động

![Container Tracking](https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200)

## Tin Mới Nhất

ICONIC LOGISTICS Vietnam tự hào công bố ra mắt hệ thống **tracking container tự động** trên website chính thức iconiclogs.com. Đây là bước tiến quan trọng trong việc ứng dụng công nghệ số hóa vào dịch vụ logistics.

## Tính Năng Nổi Bật

### 🔍 Tra Cứu Real-time
- Nhập Bill of Lading (B/L) hoặc Booking Number
- Kết quả hiển thị ngay lập tức
- Thông tin chi tiết về tàu, chuyến, cảng

### 📊 Thông Tin Đầy Đủ
- Tên tàu & số chuyến (Vessel & Voyage)
- Cảng đi - Cảng đến (POL - POD)
- ETA/ETD dự kiến
- Trạng thái container
- Danh sách container trong lô hàng

### 🌐 Hỗ Trợ Nhiều Hãng Tàu
Hiện tại hệ thống hỗ trợ tracking cho:
- Evergreen Line
- *(Sắp tới: Maersk, COSCO, ONE...)*

## Lợi Ích Cho Khách Hàng

✅ **Tiết kiệm thời gian**: Không cần liên hệ qua email/điện thoại
✅ **Chủ động**: Theo dõi hàng 24/7
✅ **Minh bạch**: Thông tin chính xác, cập nhật liên tục
✅ **Lập kế hoạch tốt hơn**: Biết trước thời gian hàng về để sắp xếp nhân lực, kho bãi

## Hướng Dẫn Sử Dụng

1. Truy cập [iconiclogs.com/services/tracking](https://iconiclogs.com/services/tracking)
2. Chọn loại tracking: BOL hoặc Booking
3. Nhập mã số
4. Nhấn "Tra cứu"
5. Xem kết quả chi tiết

---

**Liên hệ ngay với ICONIC LOGISTICS để trải nghiệm dịch vụ!**

📞 0986066174
📧 info@iconiclogs.com`,
      status: 'PUBLISHED',
      publishedAt: new Date('2024-01-15'),
      createdById: admin.id,
    },
    {
      slug: 'huong-dan-chon-loai-container-phu-hop',
      title: 'Hướng Dẫn Chọn Loại Container Phù Hợp Cho Hàng Hóa',
      summary: 'Tìm hiểu các loại container phổ biến và cách lựa chọn phù hợp với từng loại hàng hóa',
      coverImageUrl: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1200',
      contentMd: `# Hướng Dẫn Chọn Loại Container Phù Hợp

![Containers](https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1200)

Việc lựa chọn đúng loại container là yếu tố quan trọng quyết định đến **an toàn** và **chi phí** vận chuyển hàng hóa. ICONIC LOGISTICS xin chia sẻ hướng dẫn chi tiết.

## 1. Dry Container (Container Khô)

### 📦 20' DC & 40' DC & 40' HC
- **Kích thước phổ biến nhất**
- Phù hợp: hàng khô, đóng thùng, pallet
- Không kiểm soát nhiệt độ
- Giá cước hợp lý nhất

**Ví dụ**: Hàng may mặc, điện tử, đồ nội thất, hàng tiêu dùng

## 2. Reefer Container (Container Lạnh)

### ❄️ 20' RF & 40' RF
- Kiểm soát nhiệt độ -25°C đến +25°C
- Phù hợp: thực phẩm đông lạnh, dược phẩm
- Chi phí cao hơn Dry Container

**Ví dụ**: Hải sản, thịt đông lạnh, rau quả tươi, vắc-xin

## 3. Open Top Container

### 🔓 Container Không Nóc
- Mui phủ bạt có thể tháo rời
- Phù hợp: hàng quá khổ chiều cao
- Dễ bốc xếp bằng cần cẩu

**Ví dụ**: Máy móc lớn, kính xây dựng, cẩm thạch

## 4. Flat Rack Container

### 📐 Container Sàn Phẳng
- Không thành bên, có thể gập
- Phù hợp: hàng siêu trường, siêu trọng
- Đòi hỏi gia cố chuyên nghiệp

**Ví dụ**: Xe nâng, thuyền, ống thép lớn, thiết bị công nghiệp

## 5. Tank Container

### 🛢️ Container Bồn
- Chứa chất lỏng, khí nén
- Tiêu chuẩn an toàn cao
- Cần giấy phép đặc biệt

**Ví dụ**: Hóa chất, dầu thực vật, rượu vang số lượng lớn

## Bảng So Sánh Nhanh

| Loại | Giá | Phù hợp | Lưu ý |
|------|-----|---------|-------|
| Dry | ⭐ | Hàng thông thường | Rẻ nhất |
| Reefer | ⭐⭐⭐⭐ | Hàng lạnh | Cần nguồn điện |
| Open Top | ⭐⭐ | Hàng cao | Tính phụ phí |
| Flat Rack | ⭐⭐⭐ | Hàng quá khổ | Cần tính toán kỹ |
| Tank | ⭐⭐⭐⭐⭐ | Chất lỏng | Giấy phép nghiêm ngặt |

## Tư Vấn Miễn Phí

ICONIC LOGISTICS cung cấp **dịch vụ tư vấn miễn phí** để giúp bạn chọn loại container tối ưu nhất. Liên hệ ngay:

📞 **0986066174**
📧 **info@iconiclogs.com**

Đội ngũ chuyên gia của chúng tôi sẽ đánh giá hàng hóa và đề xuất giải pháp phù hợp nhất!`,
      status: 'PUBLISHED',
      publishedAt: new Date('2024-01-10'),
      createdById: admin.id,
    },
  ]

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    })
  }
  console.log('✅ Created posts')

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
