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
      nameVi: 'CÔNG TY TNHH ICONIC LOGISTICS',
      nameEn: 'ICONIC LOGISTICS VIETNAM COMPANY LIMITED',
      phone: '0839037568',
      email: 'Info@iconiclogs.com',
      address: '25/49 Đường 6, Khu phố 26, Phường Hiệp Bình, TP.HCM, Việt Nam',
      introduction: `Iconic Logistics Vietnam là doanh nghiệp hoạt động trong lĩnh vực dịch vụ Logistics quốc tế và nội địa, cung cấp các giải pháp vận chuyển hàng hóa nhanh chóng, an toàn và hiệu quả. Với đội ngũ nhân sự chuyên nghiệp, áp dụng kĩ thuật công nghệ Logistics tiên tiến cùng mạng lưới đối tác rộng khắp thế giới, chúng tôi mang đến dịch vụ đa dạng từ vận tải đường biển quốc tế đa phương thức, đường hàng không, vận tải nội địa, khai báo Hải Quan đến dịch vụ kho vận. Chúng tôi luôn tối ưu vận tải và chất lượng làm nền tảng, cam kết đồng hành cùng khách hàng trong việc tối ưu chi phí, nâng cao hiệu quả chuỗi cung ứng và tạo dựng giá trị bền vững.`,
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
      commitments: `**Uy tín**: Luôn đặt lợi ích và sự hài lòng của khách hàng làm trọng tâm trong mọi hoạt động.

**Chất lượng**: Cung cấp dịch vụ logistics nhanh chóng, chính xác, an toàn và tiết kiệm.

**Đồng hành**: Trở thành đối tác tin cậy, cùng khách hàng phát triển lâu dài.

**Đổi mới**: Liên tục cập nhật, ứng dụng công nghệ hiện đại để tối ưu hiệu quả dịch vụ.

**Trách nhiệm**: Cam kết minh bạch, tuân thủ pháp luật và đồng góp tích cực cho công đồng, xã hội.`,
      strengths: `**Là đối tác nhiều năm** cùng với mối quan hệ gắn kết, thân thiết với các hãng tàu lớn trên thế giới cũng như các Depot, ICDs, Cảng vụ Hải diện tại các trung tâm Logistics hàng đầu Việt Nam

**Nền tảng Icontech** - Iconic Logistics Vietnam tự tin khẳng định rằng ra đời nhằm đem đến những giải pháp Logistics độc quyền tại Việt Nam, một nền tảng quản lý Logistics toàn diện, giúp doanh nghiệp kiểm soát mọi hoạt động từ số liệu, vận tải, đến theo dõi đơn hàng: chứng từ, tracking... từ các trong một hệ thống truy cập quan và thông minh giúp doanh nghiệp theo dõi được chi tiết của mọi tuyến hàng, thính truyền thông phân tập, báo cáo tự động, tích hợp dễ dàng... tối ưu chuỗi cung ứng, tiết kiệm thời gian, chi phí, nâng cao hiệu quả công việc cho khách hàng của Iconic Logistics

**Đội ngũ nhân sự** với kinh nghiệm nhiều năm trong ngành Logistics được đào tạo bài bản và tư duy xử lí hàng hoá chuyên nghiệp, xử lí tối đa được các rủi ro hàng từ các đề đơn phức tạp.

**Mạng lưới đối tác toàn cầu** - Iconic đang là đối tác chiến lược của các hãng tàu, hãng hàng không, và như vận ta trền khắp thế giới, mang lưới đối tác y phía sống trên khắp các quốc gia. Tin rằng, chính vì thế Iconic là nơi mà nhiều khách hàng tin tưởng giao phó, đặt trọn tâm huyết cho thẻ mỗi chuyến hàng.

**Hệ thống cơ sở hạ tầng** ở các vị trí chiến lược: An Độ, Trung Quốc, Úc, Thái Lan, Nhật Bản, Hàn Quốc, Indonesia, Bangladesh, Hà Lan, Ba Lan, Pháp, Canada, Brazil, Mexico...

**Lợi thế cạnh tranh**: Nhanh chóng, linh hoạt, chi phí tối ưu`,
    },
    create: {
      id: 'default',
      nameVi: 'CÔNG TY TNHH ICONIC LOGISTICS',
      nameEn: 'ICONIC LOGISTICS VIETNAM COMPANY LIMITED',
      phone: '0839037568',
      email: 'Info@iconiclogs.com',
      address: '25/49 Đường 6, Khu phố 26, Phường Hiệp Bình, TP.HCM, Việt Nam',
      introduction: `Iconic Logistics Vietnam là doanh nghiệp hoạt động trong lĩnh vực dịch vụ Logistics quốc tế và nội địa, cung cấp các giải pháp vận chuyển hàng hóa nhanh chóng, an toàn và hiệu quả. Với đội ngũ nhân sự chuyên nghiệp, áp dụng kĩ thuật công nghệ Logistics tiên tiến cùng mạng lưới đối tác rộng khắp thế giới, chúng tôi mang đến dịch vụ đa dạng từ vận tải đường biển quốc tế đa phương thức, đường hàng không, vận tải nội địa, khai báo Hải Quan đến dịch vụ kho vận. Chúng tôi luôn tối ưu vận tải và chất lượng làm nền tảng, cam kết đồng hành cùng khách hàng trong việc tối ưu chi phí, nâng cao hiệu quả chuỗi cung ứng và tạo dựng giá trị bền vững.`,
      vision: `Iconic Logistics Vietnam ra đời trong bối cảnh đất nước bước vào kỷ nguyên vươn mình, chính vì thế là động lực thúc đẩy cho một "biểu tượng" mới của ngành Logistics ra đời, trở thành đối tác Logistics mang tính biểu tượng hàng đầu tại Việt Nam, trung tâm kết nối hàng hóa Việt Nam với thị trường toàn cầu mang lại giá trị vượt trội thông qua mạng lưới logistics tối ưu, công nghệ tiên tiến và dịch vụ tận tâm — để mỗi hành trình hàng hóa đều hoàn hảo cam kết các giá trị cốt lõi cùng chuỗi cung ứng hiệu quả và bền trệ, góp phần xây dựng thương hiệu Iconic tiếp cận thêm nhiều khách hàng và vươn xa quốc tế.

Xây dựng Iconic Logistics Việt Nam trở thành biểu tượng trong ngành dịch vụ vận tải nội địa mở rộng chất lượng, đổi mới kinh doanh và sự phát triển bền vững được ưu tiên hàng đầu.`,
      mission: `Xây dựng biểu tượng tiêu biểu trong ngành Logistics với một mạng lưới dịch vụ Logistics đa phương thức, uy tín, thông minh, nhanh chóng, tối ưu và minh bạch, giúp doanh nghiệp mở rộng thị trường xuất nhập khẩu sang các trung tâm kinh tế trọng điểm của thế giới.

Con người: đội ngũ nhân sự của Iconic đã và đang góp một phần nhỏ vào sự thành công của các doanh nghiệp khách hàng, nhà máy, khu công nghiệp, chế xuất...với các tiêu chí chuyên nghiệp, đoàn kết, tận tâm, đạo đức cùng tinh thần trách nhiệm tạo ra giá trị bền vững, không ngừng đổi mới quy trình vận tải, ứng dụng công nghệ tiên tiến từ sự sáng lập bởi đội ngũ của Iconic, bồi xịp xu hướng thời đại từ đội ngũ có khả năng linh hoạt, ứng dụng linh hoạt mang lại giải pháp vận chuyển nhanh chóng — an toàn — hiệu quả.

Xã hội: đồng góp vào sự phát triển thương mại quốc tế, thúc đẩy dòng chảy hàng hóa và nâng tầm vị thế Logistics Việt Nam trên bản đồ thế giới.`,
      coreValues: `**Hướng khách hàng (Customer orientation)**: Xây dựng giải pháp Logistics dựa trên nhu cầu thật sự của doanh nghiệp, là người bạn đồng hành đáng tin cậy của khách hàng khi nhắc đến Logistics.

**Hướng thị trường quốc tế (Market orientation)**: Đã và đang handle với mong muốn mở rộng mạng lưới vận tải giữa Việt Nam với các nền kinh tế lớn của Châu Á, Châu Âu, Châu Phi, Châu Đại Dương và Nam Mỹ.

**Hướng đổi mới (Innovation orientation)**: Luôn cập nhật và bắt kịp xu hướng thời đại, ứng dụng công nghệ tiên tiến độc quyền tại Việt Nam để quản lý chuỗi cung ứng minh bạch, tối ưu chi phí và thời gian.

**Hướng quan hệ đối tác (Partnership orientation)**: Iconic đang là đối tác chiến lược của các hãng tàu, hãng hàng không lớn, và nhà vận tải trên khắp thế giới, mang lại lợi ích song phương trên khắp các quốc gia. Tin rằng, chính vì thế Iconic là nơi mà nhiều khách hàng tin tưởng gửi gắm, đặt trọn tâm huyết cho mỗi chuyến hàng.`,
      goals: `Một biểu tượng Logistics được ra đời trong kỷ nguyên mới của đất nước, mang trong mình mục tiêu trở thành đơn vị Logistics uy tín, chuyên nghiệp, đáp ứng toàn diện nhu cầu vận chuyển và chuỗi cung ứng của khách hàng.

Ứng dụng công nghệ hiện đại để tối ưu hóa quá trình vận hành, tiết kiệm chi phí và rút ngắn thời gian giao nhận.

Xây dựng đội ngũ nhân sự chất lượng cao, giàu kinh nghiệm, mang đến dịch vụ nhanh chóng – chính xác – an toàn.

Phát triển bền vững, mở rộng mạng lưới trong nước và quốc tế, hướng tới vị thế cạnh tranh hàng đầu trong ngành logistics.

Trụ sở chính, văn phòng đại diện đặt tại trung tâm Logistics hàng đầu Việt Nam là thành phố Hồ Chí Minh và chi nhánh tại các điểm đầu tàu như Hà Nội, Hải Phòng, Đà Nẵng…`,
      commitments: `**Uy tín**: Luôn đặt lợi ích và sự hài lòng của khách hàng làm trọng tâm trong mọi hoạt động.

**Chất lượng**: Cung cấp dịch vụ logistics nhanh chóng, chính xác, an toàn và tiết kiệm.

**Đồng hành**: Trở thành đối tác tin cậy, cùng khách hàng phát triển lâu dài.

**Đổi mới**: Liên tục cập nhật, ứng dụng công nghệ hiện đại để tối ưu hiệu quả dịch vụ.

**Trách nhiệm**: Cam kết minh bạch, tuân thủ pháp luật và đồng góp tích cực cho công đồng, xã hội.`,
      strengths: `**Là đối tác nhiều năm** cùng với mối quan hệ gắn kết, thân thiết với các hãng tàu lớn trên thế giới cũng như các Depot, ICDs, Cảng vụ Hải diện tại các trung tâm Logistics hàng đầu Việt Nam

**Nền tảng Icontech** - Iconic Logistics Vietnam tự tin khẳng định rằng ra đời nhằm đem đến những giải pháp Logistics độc quyền tại Việt Nam, một nền tảng quản lý Logistics toàn diện, giúp doanh nghiệp kiểm soát mọi hoạt động từ số liệu, vận tải, đến theo dõi đơn hàng: chứng từ, tracking... từ các trong một hệ thống truy cập quan và thông minh giúp doanh nghiệp theo dõi được chi tiết của mọi tuyến hàng, thính truyền thông phân tập, báo cáo tự động, tích hợp dễ dàng... tối ưu chuỗi cung ứng, tiết kiệm thời gian, chi phí, nâng cao hiệu quả công việc cho khách hàng của Iconic Logistics

**Đội ngũ nhân sự** với kinh nghiệm nhiều năm trong ngành Logistics được đào tạo bài bản và tư duy xử lí hàng hoá chuyên nghiệp, xử lí tối đa được các rủi ro hàng từ các đề đơn phức tạp.

**Mạng lưới đối tác toàn cầu** - Iconic đang là đối tác chiến lược của các hãng tàu, hãng hàng không, và như vận ta trền khắp thế giới, mang lưới đối tác y phía sống trên khắp các quốc gia. Tin rằng, chính vì thế Iconic là nơi mà nhiều khách hàng tin tưởng giao phó, đặt trọn tâm huyết cho thẻ mỗi chuyến hàng.

**Hệ thống cơ sở hạ tầng** ở các vị trí chiến lược: An Độ, Trung Quốc, Úc, Thái Lan, Nhật Bản, Hàn Quốc, Indonesia, Bangladesh, Hà Lan, Ba Lan, Pháp, Canada, Brazil, Mexico...

**Lợi thế cạnh tranh**: Nhanh chóng, linh hoạt, chi phí tối ưu`,
    },
  })
  console.log('✅ Created company info')

  // Create services
  const services = [
    {
      slug: 'van-chuyen-duong-bo',
      title: 'Vận Chuyển Đường Bộ',
      description: 'Dịch vụ vận chuyển đường bộ nội địa và quốc tế với mạng lưới xe tải hiện đại, đảm bảo hàng hóa đến đúng hạn và an toàn.',
      content: `# Dịch Vụ Vận Chuyển Đường Bộ

## Tổng Quan
ICONIC LOGISTICS cung cấp dịch vụ vận chuyển đường bộ chuyên nghiệp cho các tuyến nội địa và quốc tế, với đội xe hiện đại và đội lái kinh nghiệm.

## Dịch Vụ Bao Gồm
- **Vận chuyển nội địa**: Toàn quốc Việt Nam với mạng lưới phủ sóng rộng khắp
- **Vận chuyển quốc tế**: Các nước trong khu vực Đông Nam Á
- **Xe tải đa loại**: Từ xe tải nhẹ đến xe container, xe lạnh
- **Dịch vụ bốc xếp chuyên nghiệp**: Bốc xếp, dán nhãn, kiểm đếm

## Ưu Điểm
- ✅ Mạng lưới giao hàng rộng khắp toàn quốc
- ✅ Tracking GPS real-time
- ✅ Giá cước cạnh tranh và linh hoạt
- ✅ Bảo hiểm hàng hóa toàn diện
- ✅ Thời gian giao hàng nhanh chóng`,
      icon: 'Truck',
      sortOrder: 1,
      visible: true,
    },
    {
      slug: 'van-chuyen-duong-hang-khong',
      title: 'Vận Chuyển Đường Hàng Không',
      description: 'Dịch vụ vận chuyển hàng hóa đường hàng không nhanh chóng, an toàn, phù hợp cho hàng hóa giá trị cao và cấp tốc.',
      content: `# Dịch Vụ Vận Chuyển Đường Hàng Không

## Tổng Quan
ICONIC LOGISTICS hợp tác với các hãng hàng không hàng đầu thế giới, cung cấp dịch vụ vận chuyển hàng không toàn cầu với tốc độ nhanh nhất.

## Dịch Vụ Bao Gồm
- **Hàng không quốc tế (International Air Freight)**: Kết nối các sân bay chính trên thế giới
- **Hàng không nội địa (Domestic Air Freight)**: Các tuyến bay chính tại Việt Nam
- **Express Air Service**: Dịch vụ gửi cấp tốc với thời gian ngắn nhất
- **Consolidation Service**: Tổng hợp các lô hàng nhỏ để tối ưu chi phí

## Ưu Điểm
- ✅ Thời gian vận chuyển nhanh nhất (1-3 ngày quốc tế)
- ✅ Phù hợp hàng hóa giá trị cao, hạn chế thời gian
- ✅ An toàn tuyệt đối với quy trình kiểm tra chặt chẽ
- ✅ Hỗ trợ 24/7 từ booking đến giao nhận
- ✅ Minh bạch giá cước và không phí ẩn`,
      icon: 'Plane',
      sortOrder: 2,
      visible: true,
    },
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
      sortOrder: 3,
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
      sortOrder: 4,
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
      sortOrder: 5,
      visible: true,
    },
    {
      slug: 'phan-phoi-hang-hoa',
      title: 'Phân Phối Hàng Hóa',
      description: 'Dịch vụ phân phối hàng hóa toàn quốc với mạng lưới rộng khắp, đảm bảo hàng đến tay người tiêu dùng nhanh chóng và an toàn.',
      content: `# Dịch Vụ Phân Phối Hàng Hóa

## Tổng Quan
ICONIC LOGISTICS cung cấp dịch vụ phân phối hàng hóa toàn diện với mạng lưới phân phối rộng khắp Việt Nam, đảm bảo hàng hóa đến đúng hạn, đúng địa chỉ và đúng số lượng.

## Dịch Vụ Bao Gồm
- **Phân phối nội địa**: Phân phối sản phẩm từ kho tập kết đến các địa phương
- **Phân phối B2B**: Vận chuyển hàng hóa đến các cửa hàng bán lẻ, kho trung gian
- **Phân phối B2C**: Giao hàng trực tiếp đến tay khách hàng cuối cùng
- **Return logistics**: Xử lý hàng hoàn, hàng lỗi, hàng trả lại
- **Dịch vụ last-mile delivery**: Giao hàng tận cửa với thời gian nhanh

## Ưu Điểm
- ✅ Mạng lưới phân phối rộng khắp toàn quốc
- ✅ Tracking chi tiết từ kho đến tay khách hàng
- ✅ Giao hàng đúng hạn, đúng địa chỉ
- ✅ Xử lý phàn nàn nhanh chóng
- ✅ Tích hợp với hệ thống quản lý ERP của khách hàng`,
      icon: 'Package',
      sortOrder: 6,
      visible: true,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        title: service.title,
        description: service.description,
        content: service.content,
        icon: service.icon,
        sortOrder: service.sortOrder,
        visible: service.visible,
      },
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

📞 0839037568
📧 Info@iconiclogs.com`,
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

📞 **0839037568**
📧 **Info@iconiclogs.com**

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

  // Create partners from brochure (31 companies)
  const partners = [
    // Shipping Lines - using company name only (no port suffix in ID to avoid duplicates)
    { name: 'MAERSK', port: 'Đan Mạch', type: 'SHIPPING', sortOrder: 1, logoUrl: 'https://logo.clearbit.com/maersk.com' },
    { name: 'MSC', port: 'Thuỵ Sĩ', type: 'SHIPPING', sortOrder: 2, logoUrl: 'https://logo.clearbit.com/msc.com' },
    { name: 'CMA CGM', port: 'Pháp', type: 'SHIPPING', sortOrder: 3, logoUrl: 'https://logo.clearbit.com/cma-cgm.com' },
    { name: 'COSCO', port: 'Trung Quốc', type: 'SHIPPING', sortOrder: 4, logoUrl: 'https://logo.clearbit.com/cosco.com' },
    { name: 'HAPAG LLOYD', port: 'Đức', type: 'SHIPPING', sortOrder: 5, logoUrl: 'https://logo.clearbit.com/hapag-lloyd.com' },
    { name: 'YANGMING', port: 'Đài Loan', type: 'SHIPPING', sortOrder: 6, logoUrl: 'https://logo.clearbit.com/yangming.com' },
    { name: 'ONE', port: 'Nhật Bản', type: 'SHIPPING', sortOrder: 7, logoUrl: 'https://logo.clearbit.com/one-line.com' },
    { name: 'WANHAI', port: 'Đài Loan', type: 'SHIPPING', sortOrder: 8, logoUrl: 'https://logo.clearbit.com/wanhai.com' },
    { name: 'RCL', port: 'Thái Lan', type: 'SHIPPING', sortOrder: 9, logoUrl: '' },
    { name: 'KMTC', port: 'Hàn Quốc', type: 'SHIPPING', sortOrder: 10, logoUrl: '' },
    { name: 'PIL', port: 'Singapore', type: 'SHIPPING', sortOrder: 11, logoUrl: 'https://logo.clearbit.com/pilship.com' },
    { name: 'SAMUDERA', port: 'Indonesia', type: 'SHIPPING', sortOrder: 12, logoUrl: 'https://logo.clearbit.com/samudera.co.id' },
    { name: 'EVERGREEN', port: 'Đài Loan', type: 'SHIPPING', sortOrder: 13, logoUrl: 'https://logo.clearbit.com/evergreen-line.com' },
    { name: 'IAL', port: 'Nhật Bản', type: 'SHIPPING', sortOrder: 14, logoUrl: '' },
    { name: 'SJJ', port: 'Trung Quốc', type: 'SHIPPING', sortOrder: 15, logoUrl: '' },
    { name: 'TS LINE', port: 'Đài Loan', type: 'SHIPPING', sortOrder: 16, logoUrl: '' },
    { name: 'CK LINE', port: 'Hàn Quốc', type: 'SHIPPING', sortOrder: 17, logoUrl: '' },
    { name: 'OOCL', port: 'Hongkong', type: 'SHIPPING', sortOrder: 18, logoUrl: 'https://logo.clearbit.com/oocl.com' },
    { name: 'ZIM', port: 'Israel', type: 'SHIPPING', sortOrder: 19, logoUrl: 'https://logo.clearbit.com/zim.com' },
    { name: 'HMM', port: 'Hàn Quốc', type: 'SHIPPING', sortOrder: 20, logoUrl: 'https://logo.clearbit.com/hmm21.com' },
    { name: 'CU LINE', port: 'Đài Loan', type: 'SHIPPING', sortOrder: 21, logoUrl: '' },
    { name: 'EMIRATE', port: 'UAE', type: 'SHIPPING', sortOrder: 22, logoUrl: 'https://logo.clearbit.com/uasc.ae' },
    { name: 'SITC', port: 'Trung Quốc', type: 'SHIPPING', sortOrder: 23, logoUrl: '' },
    { name: 'SINOKOR', port: 'Hàn Quốc', type: 'SHIPPING', sortOrder: 24, logoUrl: '' },
    { name: 'NAMSUNG', port: 'Hàn Quốc', type: 'SHIPPING', sortOrder: 25, logoUrl: '' },
    { name: 'PANCON', port: 'Hàn Quốc', type: 'SHIPPING', sortOrder: 26, logoUrl: '' },
    { name: 'DONG YOUNG', port: 'Hàn Quốc', type: 'SHIPPING', sortOrder: 27, logoUrl: '' },
    { name: 'TAILWIND', port: 'Đức', type: 'SHIPPING', sortOrder: 28, logoUrl: '' },
    { name: 'SINOTRANS', port: 'Trung Quốc', type: 'SHIPPING', sortOrder: 29, logoUrl: '' },
    { name: 'BENLINE', port: 'Scotland', type: 'SHIPPING', sortOrder: 30, logoUrl: '' },
    { name: 'VIMC', port: 'Việt Nam', type: 'SHIPPING', sortOrder: 31, logoUrl: '' },
  ]

  // First, delete all existing partners to avoid duplicates
  await prisma.partner.deleteMany({})

  for (const partner of partners) {
    await prisma.partner.create({
      data: {
        id: partner.name.toLowerCase().replace(/\s+/g, '-'),
        name: partner.name,
        logoUrl: partner.logoUrl,
        port: partner.port,
        type: partner.type,
        sortOrder: partner.sortOrder,
        visible: true,
      },
    })
  }
  console.log('✅ Created partners')

  // Create commodities from brochure (16 items)
  const commodities = [
    { nameVi: 'THÉP CUỘN - NHÔM', nameEn: 'Steel Coils - Aluminum', sortOrder: 1, visible: true },
    { nameVi: 'THÉP ỐNG', nameEn: 'Steel Pipes', sortOrder: 2, visible: true },
    { nameVi: 'THÉP CUỘN', nameEn: 'Steel Coils', sortOrder: 3, visible: true },
    { nameVi: 'LỐP XE', nameEn: 'Tires', sortOrder: 4, visible: true },
    { nameVi: 'MÁY MÓC', nameEn: 'Machinery', sortOrder: 5, visible: true },
    { nameVi: 'HOÁ CHẤT', nameEn: 'Chemicals', sortOrder: 6, visible: true },
    { nameVi: 'HẠT ĐIỀU', nameEn: 'Cashew Nuts', sortOrder: 7, visible: true },
    { nameVi: 'NÔNG SẢN', nameEn: 'Agricultural Products', sortOrder: 8, visible: true },
    { nameVi: 'VẢI', nameEn: 'Fabrics', sortOrder: 9, visible: true },
    { nameVi: 'BỘT ĐÁ', nameEn: 'Limestone', sortOrder: 10, visible: true },
    { nameVi: 'THỨC ĂN GIA SÚC', nameEn: 'Livestock Feed', sortOrder: 11, visible: true },
    { nameVi: 'SILICON', nameEn: 'Silicon', sortOrder: 12, visible: true },
    { nameVi: 'GẠO', nameEn: 'Rice', sortOrder: 13, visible: true },
    { nameVi: 'CAO SU', nameEn: 'Rubber', sortOrder: 14, visible: true },
    { nameVi: 'GIẤY - XỐP', nameEn: 'Paper - Pulp', sortOrder: 15, visible: true },
    { nameVi: 'HẢI SẢN', nameEn: 'Seafood', sortOrder: 16, visible: true },
  ]

  for (const commodity of commodities) {
    await prisma.commodity.upsert({
      where: { id: commodity.nameVi.replace(/\s+/g, '-').toLowerCase() },
      update: {
        nameEn: commodity.nameEn,
        sortOrder: commodity.sortOrder,
        visible: commodity.visible,
      },
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
