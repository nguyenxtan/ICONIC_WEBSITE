import { generateMetadata as genMeta } from '@/lib/seo'
import { prisma } from '@/lib/db'
import { Building2, Users, Award, Target } from 'lucide-react'

export const metadata = genMeta({
  title: 'Về Chúng Tôi',
  description: 'CÔNG TY TNHH ICONIC LOGISTICS - Đối tác logistics đáng tin cậy tại Việt Nam',
  path: '/about',
})

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const companyInfo = await prisma.companyInfo.findFirst()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Về Chúng Tôi</h1>

        <div className="prose prose-lg max-w-none">
          <div className="bg-brand-orange-primary/5 border-l-4 border-brand-orange-primary p-6 mb-8">
            <h2 className="text-2xl font-bold text-brand-orange-primary mb-2">
              {companyInfo?.nameVi || 'CÔNG TY TNHH ICONIC LOGISTICS'}
            </h2>
            <p className="text-lg text-gray-700 mb-1">
              {companyInfo?.nameEn || 'ICONIC LOGISTICS VIETNAM COMPANY LIMITED'}
            </p>
            <p className="text-sm text-gray-600">
              ICONIC LOGISTICS VIETNAM CO., LTD
            </p>
          </div>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-8 w-8 text-brand-orange-primary" />
              <h2 className="text-2xl font-bold">Giới Thiệu Công Ty</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              ICONIC LOGISTICS VIETNAM là công ty chuyên cung cấp các dịch vụ logistics
              toàn diện tại Việt Nam. Với đội ngũ nhân viên giàu kinh nghiệm và mạng lưới
              đối tác quốc tế rộng khắp, chúng tôi cam kết mang đến giải pháp vận chuyển
              tối ưu nhất cho khách hàng.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-brand-orange-primary" />
              <h2 className="text-2xl font-bold">Lĩnh Vực Hoạt Động</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-brand-orange-primary mr-2">✓</span>
                <span>Vận chuyển container đường biển (FCL & LCL)</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-orange-primary mr-2">✓</span>
                <span>Khai báo hải quan xuất nhập khẩu</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-orange-primary mr-2">✓</span>
                <span>Dịch vụ kho bãi và quản lý tồn kho</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-orange-primary mr-2">✓</span>
                <span>Vận chuyển nội địa toàn quốc</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-orange-primary mr-2">✓</span>
                <span>Tư vấn giải pháp logistics tối ưu</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-8 w-8 text-brand-orange-primary" />
              <h2 className="text-2xl font-bold">Giá Trị Cốt Lõi</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-brand-orange-primary mb-2">
                  Chuyên Nghiệp
                </h3>
                <p className="text-gray-600">
                  Quy trình làm việc chuẩn mức quốc tế, đội ngũ giàu kinh nghiệm
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-brand-orange-primary mb-2">
                  Uy Tín
                </h3>
                <p className="text-gray-600">
                  Minh bạch trong mọi giao dịch, cam kết đúng hạn
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-brand-orange-primary mb-2">
                  Nhanh Chóng
                </h3>
                <p className="text-gray-600">
                  Xử lý nhanh chóng, tối ưu thời gian vận chuyển
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-brand-orange-primary mb-2">
                  Tận Tâm
                </h3>
                <p className="text-gray-600">
                  Luôn lắng nghe và đáp ứng nhu cầu khách hàng
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8 text-brand-orange-primary" />
              <h2 className="text-2xl font-bold">Thông Tin Liên Hệ</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <p>
                <strong>Địa chỉ:</strong>{' '}
                {companyInfo?.address ||
                  '25/49 Đường 6, Khu phố 26, Phường Hiệp Bình, TP.HCM, Việt Nam'}
              </p>
              <p>
                <strong>Điện thoại:</strong>{' '}
                <a
                  href={`tel:${companyInfo?.phone || '0986066174'}`}
                  className="text-brand-orange-primary hover:underline"
                >
                  {companyInfo?.phone || '0986066174'}
                </a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href={`mailto:${companyInfo?.email || 'info@iconiclogs.com'}`}
                  className="text-brand-orange-primary hover:underline"
                >
                  {companyInfo?.email || 'info@iconiclogs.com'}
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
