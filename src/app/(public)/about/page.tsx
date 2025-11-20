import { generateMetadata as genMeta } from '@/lib/seo'
import { prisma } from '@/lib/db'
import { Building2, Phone, Mail, MapPin } from 'lucide-react'

export const metadata = genMeta({
  title: 'Về Chúng Tôi',
  description: 'CÔNG TY TNHH ICONIC LOGISTICS - Đối tác logistics đáng tin cậy tại Việt Nam',
  path: '/about',
})

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function AboutPage() {
  const companyInfo = await prisma.companyInfo.findFirst()

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Về Chúng Tôi</h1>

          <div>
            {/* Company Header */}
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

            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="h-8 w-8 text-brand-orange-primary" />
                <h2 className="text-2xl font-bold">Giới Thiệu</h2>
              </div>
              {companyInfo?.introduction ? (
                <div className="text-gray-700 leading-relaxed space-y-3">
                  {companyInfo.introduction.split('\n\n').map((para, idx) => (
                    <p key={idx} className="text-base">
                      {para.trim()}
                    </p>
                  ))}
                </div>
              ) : null}
            </section>

            {/* Contact Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông Tin Liên Hệ</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Address */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-brand-orange-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Địa Chỉ</h3>
                      <p className="text-gray-600">
                        {companyInfo?.address ||
                          '25/49 Đường 6, Khu phố 26, Phường Hiệp Bình, TP.HCM, Việt Nam'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <Phone className="h-6 w-6 text-brand-orange-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Điện Thoại</h3>
                      <a
                        href={`tel:${companyInfo?.phone || '0986066174'}`}
                        className="text-brand-orange-primary hover:text-brand-orange-dark font-semibold transition-colors"
                      >
                        {companyInfo?.phone || '0986066174'}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <Mail className="h-6 w-6 text-brand-orange-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                      <a
                        href={`mailto:${companyInfo?.email || 'info@iconiclogs.com'}`}
                        className="text-brand-orange-primary hover:text-brand-orange-dark font-semibold transition-colors break-all"
                      >
                        {companyInfo?.email || 'info@iconiclogs.com'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
