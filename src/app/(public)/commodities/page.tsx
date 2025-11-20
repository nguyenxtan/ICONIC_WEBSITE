import { generateMetadata as genMeta } from '@/lib/seo'
import { prisma } from '@/lib/db'
import { Package } from 'lucide-react'

export const metadata = genMeta({
  title: 'Mặt Hàng Vận Chuyển',
  description: 'Danh sách các mặt hàng chủ lực mà ICONIC LOGISTICS vận chuyển',
  path: '/commodities',
})

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function CommoditiesPage() {
  const commodities = await prisma.commodity.findMany({
    where: { visible: true },
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mặt Hàng Vận Chuyển</h1>
          <p className="text-lg text-gray-600 mb-12">
            ICONIC LOGISTICS có kinh nghiệm vận chuyển đa dạng loại hàng hóa, từ hàng khô, hàng lạnh đến hàng đặc biệt
          </p>

          {/* Commodities Grid */}
          <section>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {commodities.map((commodity) => (
                <div
                  key={commodity.id}
                  className="bg-gradient-to-br from-brand-orange-primary/10 to-white border border-brand-orange-primary/20 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <Package className="h-6 w-6 text-brand-orange-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{commodity.nameVi}</h3>
                      {commodity.nameEn && (
                        <p className="text-gray-500 text-sm mt-1">{commodity.nameEn}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Info Box */}
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dịch Vụ Chuyên Biệt</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Với kinh nghiệm và hệ thống kho bãi hiện đại, ICONIC LOGISTICS có khả năng xử lý:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Hàng khô:</strong> Các mặt hàng thông thường không yêu cầu điều kiện đặc biệt</li>
                <li><strong>Hàng lạnh:</strong> Thực phẩm đông lạnh, hải sản, rau quả tươi với container lạnh</li>
                <li><strong>Hàng quá khổ:</strong> Máy móc lớn, thiết bị công nghiệp với container đặc biệt</li>
                <li><strong>Hàng nguy hiểm:</strong> Theo quy định an toàn quốc tế (với giấy phép phù hợp)</li>
                <li><strong>Hàng giá trị cao:</strong> Bảo hiểm toàn diện và bảo mật cao</li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-12 bg-brand-orange-primary/5 border-l-4 border-brand-orange-primary p-6">
            <h3 className="text-2xl font-bold text-brand-orange-primary mb-3">Cần Vận Chuyển Mặt Hàng Đặc Biệt?</h3>
            <p className="text-gray-700 mb-4">
              Nếu mặt hàng của bạn không nằm trong danh sách trên, vui lòng liên hệ với chúng tôi.
              Đội ngũ chuyên gia của ICONIC LOGISTICS sẽ đánh giá và cung cấp giải pháp phù hợp nhất.
            </p>
            <a
              href="/contact"
              className="inline-block bg-brand-orange-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-orange-dark transition-colors"
            >
              Liên Hệ Ngay
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
