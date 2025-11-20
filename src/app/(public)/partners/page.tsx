import { generateMetadata as genMeta } from '@/lib/seo'
import { prisma } from '@/lib/db'
import { Ship, Plane, Globe } from 'lucide-react'

export const metadata = genMeta({
  title: 'Đối Tác',
  description: 'Mạng lưới đối tác chiến lược của ICONIC LOGISTICS tại các cảng và hãng tàu hàng đầu',
  path: '/partners',
})

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function PartnersPage() {
  const partners = await prisma.partner.findMany({
    where: { visible: true },
    orderBy: { sortOrder: 'asc' },
  })

  const shippingPartners = partners.filter(p => p.type === 'SHIPPING')
  const airlinePartners = partners.filter(p => p.type === 'AIRLINE')
  const internationalPartners = partners.filter(p => p.type === 'INTERNATIONAL')

  const PartnerCard = ({ partner }: { partner: any }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow flex flex-col items-center justify-center min-h-[200px]">
      {partner.logoUrl ? (
        <img
          src={partner.logoUrl}
          alt={partner.name}
          className="h-20 object-contain mb-4 max-w-full"
        />
      ) : (
        <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-brand-orange-primary/10 to-brand-orange-primary/5 flex items-center justify-center mb-4 border border-brand-orange-primary/20">
          <Globe className="h-8 w-8 text-brand-orange-primary/60" />
        </div>
      )}
      <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">{partner.name}</h3>
      {partner.port && (
        <p className="text-gray-600 text-sm text-center">{partner.port}</p>
      )}
    </div>
  )

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Đối Tác Chiến Lược</h1>
          <p className="text-lg text-gray-600 mb-12">
            ICONIC LOGISTICS vinh dự làm việc với các hãng tàu, hãng hàng không và đối tác quốc tế hàng đầu thế giới
          </p>

          {/* Shipping Lines */}
          {shippingPartners.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Ship className="h-8 w-8 text-brand-orange-primary" />
                <h2 className="text-3xl font-bold">Hãng Tàu & Cảng ({shippingPartners.length})</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shippingPartners.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            </section>
          )}

          {/* Airlines */}
          {airlinePartners.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Plane className="h-8 w-8 text-brand-orange-primary" />
                <h2 className="text-3xl font-bold">Hãng Hàng Không ({airlinePartners.length})</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {airlinePartners.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            </section>
          )}

          {/* International Partners */}
          {internationalPartners.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-8 w-8 text-brand-orange-primary" />
                <h2 className="text-3xl font-bold">Đối Tác Quốc Tế ({internationalPartners.length})</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {internationalPartners.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            </section>
          )}

          {/* Info Box */}
          <section className="bg-brand-orange-primary/5 border-l-4 border-brand-orange-primary p-6 mt-12">
            <h3 className="text-2xl font-bold text-brand-orange-primary mb-3">Hợp Tác Với ICONIC LOGISTICS</h3>
            <p className="text-gray-700 leading-relaxed">
              Với mạng lưới đối tác chiến lược rộng khắp tại các cảng hàng đầu và hãng tàu, hãng hàng không quốc tế,
              ICONIC LOGISTICS cung cấp giải pháp vận chuyển toàn diện, linh hoạt và hiệu quả nhất.
              Liên hệ với chúng tôi để tìm hiểu thêm về các dịch vụ và tìm giải pháp phù hợp nhất cho nhu cầu của bạn.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
