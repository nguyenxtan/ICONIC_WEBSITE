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

  // Create company info with brochure data
  const companyInfo = await prisma.companyInfo.upsert({
    where: { id: 'default' },
    update: {
      introduction: `Iconic Logistics Vietnam là doanh nghiệp hoạt động trong lĩnh vực Logistics quốc tế và nội địa, cung cấp các giải pháp vận tải đa phương thức, kho bãi, khai báo hải quan, và các dịch vụ xuất nhập khẩu chuyên nghiệp.

Chúng tôi không chỉ đơn thuần cung cấp dịch vụ mà còn đồng hành cùng khách hàng trong toàn bộ chuỗi cung ứng, đảm bảo sự an toàn, thời gian vận chuyển nhanh chóng, tối ưu hóa chi phí và nâng cao hiệu quả kinh doanh cho doanh nghiệp.

Với đội ngũ nhân sự trẻ trung, năng động, nhiệt huyết và giàu kinh nghiệm, Iconic Logistics Vietnam luôn sẵn sàng hỗ trợ khách hàng trong mọi hoàn cảnh và mang đến những giải pháp tối ưu nhất.`,
      vision: `Iconic Logistics Vietnam hướng đến trở thành một trong những nhà cung ứng dịch vụ logistics hàng đầu tại Việt Nam và khu vực, với hệ thống kho bãi, mạng lưới vận tải và đối tác chiến lược trải dài trên khắp các tỉnh thành và các quốc gia lớn.

Chúng tôi liên tục mở rộng quy mô, áp dụng công nghệ hiện đại vào quá trình vận hành nhằm mang đến cho khách hàng những trải nghiệm dịch vụ nhanh chóng, hiệu quả và an toàn tuyệt đối.

Iconic Logistics Vietnam cam kết mang đến giải pháp tối ưu nhất, giúp khách hàng và đối tác nâng cao năng lực cạnh tranh và phát triển bền vững.`,
      mission: `Xây dựng hệ thống vận hành Logistics một cách toàn diện, phát triển mạnh mẽ ở trong nước và quốc tế, nhằm đóng góp cho sự phát triển kinh tế – xã hội của Việt Nam trong thời kỳ mới.

Cam kết đem đến những dịch vụ hoàn hảo cho đối tác và khách hàng, đảm bảo mọi lô hàng đều được xử lý nhanh chóng, chính xác và an toàn tuyệt đối.

Sứ mệnh của chúng tôi là trở thành "cánh tay phải" của doanh nghiệp trong mọi hoạt động liên quan đến vận chuyển, kho bãi, xuất nhập khẩu và dịch vụ hỗ trợ logistics.

Iconic Logistics Vietnam tin rằng với sự nỗ lực, chuyên nghiệp và tinh thần trách nhiệm cao, chúng tôi sẽ mang lại giá trị thiết thực, bền vững cho khách hàng và cộng đồng.`,
      coreValues: `**Hướng đến khách hàng (Customer centric)**: Mọi giá trị phục vụ đều hướng đến việc mang lại lợi ích tốt nhất cho khách hàng thông qua chất lượng dịch vụ và hiệu quả vận hành.

**Hợp tác và cùng phát triển (Collaboration)**: Xây dựng mối quan hệ hợp tác chặt chẽ, lâu dài với khách hàng và đối tác để cùng tạo ra giá trị bền vững.

**Năng động & đổi mới (Innovation)**: Không ngừng cải tiến, đổi mới công nghệ và quy trình để tối ưu hóa chi phí và thời gian cho khách hàng.

**Minh bạch & hiệu quả (Efficiency and Transparency)**: Mọi giao dịch, thông tin đều được xử lý minh bạch, rõ ràng với cam kết mang lại hiệu quả cao nhất.

**Giải pháp tối ưu (Best-fit Solutions)**: Luôn đề xuất các giải pháp phù hợp nhất dành cho từng đối tượng khách hàng nhằm tiết kiệm tối đa chi phí và thời gian vận chuyển.`,
      goals: `Mục tiêu của Iconic Logistics trong thời gian tới là không ngừng hoàn thiện, nâng cao năng lực vận hành và dịch vụ để đáp ứng nhu cầu ngày càng cao của khách hàng và thị trường trong và ngoài nước.

Tập trung phát triển hệ thống dịch vụ bền vững và toàn diện, nhằm tối ưu hóa chuỗi cung ứng cho doanh nghiệp.

Xây dựng đội ngũ nhân sự có trình độ chuyên môn cao, tinh thần trách nhiệm lớn, và luôn sẵn sàng đồng hành cùng khách hàng trong mọi hoàn cảnh.

Đến năm 2030, chúng tôi đặt mục tiêu trở thành một trong những đơn vị logistics hàng đầu tại Việt Nam và mở rộng hoạt động ra thị trường khu vực.`,
      commitments: `**Chuyên nghiệp, an toàn, tiết kiệm, công nghệ hiện đại**

Iconic Logistics Vietnam luôn đặt lợi ích khách hàng lên hàng đầu, cam kết cung cấp dịch vụ với chất lượng tốt nhất, đảm bảo đúng tiến độ, tối ưu chi phí và xử lý các vấn đề phát sinh nhanh chóng.

Chúng tôi cam kết:
- Dịch vụ chuyên nghiệp chuẩn quốc tế
- Chi phí hợp lý và tối ưu
- An toàn hàng hóa tuyệt đối
- Ứng dụng công nghệ trong quản lý vận hành
- Hỗ trợ khách hàng 24/7`,
      strengths: `**Đội ngũ nhân sự**: Chuyên nghiệp và giàu kinh nghiệm, được đào tạo bài bản, thành thạo các quy trình vận chuyển quốc tế và nội địa.

**Hệ thống kho bãi & phương tiện**: Rộng khắp, giúp Iconic Logistics có khả năng xử lý đa dạng các loại hàng hóa từ nhỏ lẻ đến hàng siêu trường siêu trọng.

**Quy trình vận hành**: Tối ưu, đảm bảo tốc độ – chính xác – an toàn.

**Công nghệ**: Ứng dụng công nghệ vào công tác quản lý nhằm nâng cao hiệu quả và giảm thiểu rủi ro cho khách hàng.

**Minh bạch**: Đảm bảo toàn bộ quy trình được theo dõi minh bạch, rõ ràng, giúp khách hàng yên tâm trong mọi giao dịch và vận chuyển.`,
    },
    create: {
      id: 'default',
      nameVi: 'CÔNG TY TNHH ICONIC LOGISTICS',
      nameEn: 'ICONIC LOGISTICS VIETNAM COMPANY LIMITED',
      phone: '0986066174',
      email: 'info@iconiclogs.com',
      address: '25/49 Đường 6, Khu phố 26, Phường Hiệp Bình, TP.HCM, Việt Nam',
      introduction: `Iconic Logistics Vietnam là doanh nghiệp hoạt động trong lĩnh vực Logistics quốc tế và nội địa, cung cấp các giải pháp vận tải đa phương thức, kho bãi, khai báo hải quan, và các dịch vụ xuất nhập khẩu chuyên nghiệp.

Chúng tôi không chỉ đơn thuần cung cấp dịch vụ mà còn đồng hành cùng khách hàng trong toàn bộ chuỗi cung ứng, đảm bảo sự an toàn, thời gian vận chuyển nhanh chóng, tối ưu hóa chi phí và nâng cao hiệu quả kinh doanh cho doanh nghiệp.

Với đội ngũ nhân sự trẻ trung, năng động, nhiệt huyết và giàu kinh nghiệm, Iconic Logistics Vietnam luôn sẵn sàng hỗ trợ khách hàng trong mọi hoàn cảnh và mang đến những giải pháp tối ưu nhất.`,
      vision: `Iconic Logistics Vietnam hướng đến trở thành một trong những nhà cung ứng dịch vụ logistics hàng đầu tại Việt Nam và khu vực, với hệ thống kho bãi, mạng lưới vận tải và đối tác chiến lược trải dài trên khắp các tỉnh thành và các quốc gia lớn.

Chúng tôi liên tục mở rộng quy mô, áp dụng công nghệ hiện đại vào quá trình vận hành nhằm mang đến cho khách hàng những trải nghiệm dịch vụ nhanh chóng, hiệu quả và an toàn tuyệt đối.

Iconic Logistics Vietnam cam kết mang đến giải pháp tối ưu nhất, giúp khách hàng và đối tác nâng cao năng lực cạnh tranh và phát triển bền vững.`,
      mission: `Xây dựng hệ thống vận hành Logistics một cách toàn diện, phát triển mạnh mẽ ở trong nước và quốc tế, nhằm đóng góp cho sự phát triển kinh tế – xã hội của Việt Nam trong thời kỳ mới.

Cam kết đem đến những dịch vụ hoàn hảo cho đối tác và khách hàng, đảm bảo mọi lô hàng đều được xử lý nhanh chóng, chính xác và an toàn tuyệt đối.

Sứ mệnh của chúng tôi là trở thành "cánh tay phải" của doanh nghiệp trong mọi hoạt động liên quan đến vận chuyển, kho bãi, xuất nhập khẩu và dịch vụ hỗ trợ logistics.

Iconic Logistics Vietnam tin rằng với sự nỗ lực, chuyên nghiệp và tinh thần trách nhiệm cao, chúng tôi sẽ mang lại giá trị thiết thực, bền vững cho khách hàng và cộng đồng.`,
      coreValues: `**Hướng đến khách hàng (Customer centric)**: Mọi giá trị phục vụ đều hướng đến việc mang lại lợi ích tốt nhất cho khách hàng thông qua chất lượng dịch vụ và hiệu quả vận hành.

**Hợp tác và cùng phát triển (Collaboration)**: Xây dựng mối quan hệ hợp tác chặt chẽ, lâu dài với khách hàng và đối tác để cùng tạo ra giá trị bền vững.

**Năng động & đổi mới (Innovation)**: Không ngừng cải tiến, đổi mới công nghệ và quy trình để tối ưu hóa chi phí và thời gian cho khách hàng.

**Minh bạch & hiệu quả (Efficiency and Transparency)**: Mọi giao dịch, thông tin đều được xử lý minh bạch, rõ ràng với cam kết mang lại hiệu quả cao nhất.

**Giải pháp tối ưu (Best-fit Solutions)**: Luôn đề xuất các giải pháp phù hợp nhất dành cho từng đối tượng khách hàng nhằm tiết kiệm tối đa chi phí và thời gian vận chuyển.`,
      goals: `Mục tiêu của Iconic Logistics trong thời gian tới là không ngừng hoàn thiện, nâng cao năng lực vận hành và dịch vụ để đáp ứng nhu cầu ngày càng cao của khách hàng và thị trường trong và ngoài nước.

Tập trung phát triển hệ thống dịch vụ bền vững và toàn diện, nhằm tối ưu hóa chuỗi cung ứng cho doanh nghiệp.

Xây dựng đội ngũ nhân sự có trình độ chuyên môn cao, tinh thần trách nhiệm lớn, và luôn sẵn sàng đồng hành cùng khách hàng trong mọi hoàn cảnh.

Đến năm 2030, chúng tôi đặt mục tiêu trở thành một trong những đơn vị logistics hàng đầu tại Việt Nam và mở rộng hoạt động ra thị trường khu vực.`,
      commitments: `**Chuyên nghiệp, an toàn, tiết kiệm, công nghệ hiện đại**

Iconic Logistics Vietnam luôn đặt lợi ích khách hàng lên hàng đầu, cam kết cung cấp dịch vụ với chất lượng tốt nhất, đảm bảo đúng tiến độ, tối ưu chi phí và xử lý các vấn đề phát sinh nhanh chóng.

Chúng tôi cam kết:
- Dịch vụ chuyên nghiệp chuẩn quốc tế
- Chi phí hợp lý và tối ưu
- An toàn hàng hóa tuyệt đối
- Ứng dụng công nghệ trong quản lý vận hành
- Hỗ trợ khách hàng 24/7`,
      strengths: `**Đội ngũ nhân sự**: Chuyên nghiệp và giàu kinh nghiệm, được đào tạo bài bản, thành thạo các quy trình vận chuyển quốc tế và nội địa.

**Hệ thống kho bãi & phương tiện**: Rộng khắp, giúp Iconic Logistics có khả năng xử lý đa dạng các loại hàng hóa từ nhỏ lẻ đến hàng siêu trường siêu trọng.

**Quy trình vận hành**: Tối ưu, đảm bảo tốc độ – chính xác – an toàn.

**Công nghệ**: Ứng dụng công nghệ vào công tác quản lý nhằm nâng cao hiệu quả và giảm thiểu rủi ro cho khách hàng.

**Minh bạch**: Đảm bảo toàn bộ quy trình được theo dõi minh bạch, rõ ràng, giúp khách hàng yên tâm trong mọi giao dịch và vận chuyển.`,
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

  // Create partners from brochure
  const partners = [
    // Shipping Lines
    { name: 'MAERSK', port: 'Cảng Vũng Tàu', type: 'SHIPPING', sortOrder: 1 },
    { name: 'MSC', port: 'Cảng Hải Phòng', type: 'SHIPPING', sortOrder: 2 },
    { name: 'CMA', port: 'Cảng Đà Nẵng', type: 'SHIPPING', sortOrder: 3 },
    { name: 'OOCL', port: 'Cảng Hồ Chí Minh', type: 'SHIPPING', sortOrder: 4 },
    { name: 'EVERGREEN', port: 'Cảng Hải Phòng', type: 'SHIPPING', sortOrder: 5 },
    { name: 'HAPAG', port: 'Cảng Hồ Chí Minh', type: 'SHIPPING', sortOrder: 6 },
    { name: 'YANG MING', port: 'Cảng Vũng Tàu', type: 'SHIPPING', sortOrder: 7 },
    { name: 'ONE', port: 'Cảng Vũng Tàu', type: 'SHIPPING', sortOrder: 8 },
    { name: 'HANJIN', port: 'Cảng Hồ Chí Minh', type: 'SHIPPING', sortOrder: 9 },
    { name: 'KLINE', port: 'Cảng Đà Nẵng', type: 'SHIPPING', sortOrder: 10 },
    { name: 'PIL', port: 'Cảng Hải Phòng', type: 'SHIPPING', sortOrder: 11 },
    { name: 'NYK', port: 'Cảng Hồ Chí Minh', type: 'SHIPPING', sortOrder: 12 },
    { name: 'MOL', port: 'Cảng Vũng Tàu', type: 'SHIPPING', sortOrder: 13 },
    { name: 'UASC', port: 'Cảng Hồ Chí Minh', type: 'SHIPPING', sortOrder: 14 },
    { name: 'WANHAI', port: 'Cảng Đà Nẵng', type: 'SHIPPING', sortOrder: 15 },
    { name: 'NAMSUNG', port: 'Cảng Hải Phòng', type: 'SHIPPING', sortOrder: 16 },
    { name: 'HEUNG-A', port: 'Cảng Hồ Chí Minh', type: 'SHIPPING', sortOrder: 17 },
    // Airlines
    { name: 'EMIRATES', port: 'Hàng không', type: 'AIRLINE', sortOrder: 18 },
    { name: 'QATAR', port: 'Hàng không', type: 'AIRLINE', sortOrder: 19 },
    { name: 'VIETJET', port: 'Hàng không', type: 'AIRLINE', sortOrder: 20 },
    { name: 'VIETNAM AIRLINES', port: 'Hàng không', type: 'AIRLINE', sortOrder: 21 },
    { name: 'BAMBOO', port: 'Hàng không', type: 'AIRLINE', sortOrder: 22 },
    // International Partner
    { name: 'WCA', port: 'Đối tác quốc tế', type: 'INTERNATIONAL', sortOrder: 23 },
  ]

  for (const partner of partners) {
    await prisma.partner.upsert({
      where: { id: `${partner.name}-${partner.port}` },
      update: {},
      create: {
        id: `${partner.name}-${partner.port}`,
        ...partner,
      },
    })
  }
  console.log('✅ Created partners')

  // Create commodities from brochure
  const commodities = [
    { nameVi: 'THÉP CUỘN – NHÔM', sortOrder: 1 },
    { nameVi: 'THÉP ĐÚC', sortOrder: 2 },
    { nameVi: 'THÉP CUỘN', sortOrder: 3 },
    { nameVi: 'LỐP XE', sortOrder: 4 },
    { nameVi: 'MAY MẶC', sortOrder: 5 },
    { nameVi: 'PHỤ KIỆN', sortOrder: 6 },
    { nameVi: 'GẠO TIÊU', sortOrder: 7 },
    { nameVi: 'NÔNG SẢN', sortOrder: 8 },
    { nameVi: 'VẢI', sortOrder: 9 },
    { nameVi: 'BỘT BÃ', sortOrder: 10 },
    { nameVi: 'THỨC ĂN GIA SÚC', sortOrder: 11 },
    { nameVi: 'SILICON', sortOrder: 12 },
    { nameVi: 'GẠO', sortOrder: 13 },
    { nameVi: 'CAO SU', sortOrder: 14 },
    { nameVi: 'GIẤY – MỰC', sortOrder: 15 },
    { nameVi: 'HẢI SẢN', sortOrder: 16 },
  ]

  for (const commodity of commodities) {
    await prisma.commodity.upsert({
      where: { id: commodity.nameVi.replace(/\s+/g, '-').toLowerCase() },
      update: {},
      create: {
        id: commodity.nameVi.replace(/\s+/g, '-').toLowerCase(),
        ...commodity,
      },
    })
  }
  console.log('✅ Created commodities')

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
