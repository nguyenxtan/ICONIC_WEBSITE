import { generateMetadata as genMeta } from '@/lib/seo'
import { prisma } from '@/lib/db'
import { Eye, Target } from 'lucide-react'

export const metadata = genMeta({
  title: 'Tầm Nhìn & Sứ Mệnh',
  description: 'Tầm nhìn và sứ mệnh của ICONIC LOGISTICS VIETNAM',
  path: '/vision-mission',
})

export default async function VisionMissionPage() {
  const companyInfo = await prisma.companyInfo.findFirst()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Tầm Nhìn & Sứ Mệnh
        </h1>

        <div className="space-y-12">
          {/* Vision */}
          <div className="bg-gradient-to-br from-brand-orange-primary/10 to-brand-accent/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-brand-orange-primary flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-brand-orange-primary">
                Tầm Nhìn
              </h2>
            </div>
            <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
              {companyInfo?.vision ||
                'Trở thành đối tác logistics đáng tin cậy hàng đầu tại Việt Nam'}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-brand-brown/10 to-brand-brown-secondary/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-brand-brown flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-brand-brown">Sứ Mệnh</h2>
            </div>
            <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
              {companyInfo?.mission ||
                'Cung cấp dịch vụ logistics chất lượng cao, an toàn và hiệu quả'}
            </p>
          </div>

          {/* Core Values */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Cam Kết Của Chúng Tôi
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-brand-orange-primary mt-2" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Chất Lượng Hàng Đầu
                  </h3>
                  <p className="text-gray-600">
                    Cam kết cung cấp dịch vụ chất lượng cao nhất, đáp ứng mọi yêu cầu
                    khắt khe
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-brand-orange-primary mt-2" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Đổi Mới Liên Tục
                  </h3>
                  <p className="text-gray-600">
                    Không ngừng cải tiến quy trình, áp dụng công nghệ mới
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-brand-orange-primary mt-2" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Khách Hàng Là Trung Tâm
                  </h3>
                  <p className="text-gray-600">
                    Luôn đặt lợi ích và sự hài lòng của khách hàng lên hàng đầu
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-brand-orange-primary mt-2" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Phát Triển Bền Vững
                  </h3>
                  <p className="text-gray-600">
                    Xây dựng mối quan hệ lâu dài, cùng phát triển với đối tác
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
