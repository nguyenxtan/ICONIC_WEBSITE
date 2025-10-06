import { generateMetadata as genMeta } from '@/lib/seo'
import { prisma } from '@/lib/db'
import ReactMarkdown from 'react-markdown'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const runtime = 'nodejs'

export const metadata = genMeta({
  title: 'Dịch Vụ',
  description: 'Dịch vụ logistics chuyên nghiệp: vận chuyển đường biển, khai báo hải quan, kho bãi',
  path: '/services',
})

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { visible: true },
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Dịch Vụ</h1>
        <p className="text-xl text-gray-600 mb-12">
          ICONIC LOGISTICS cung cấp giải pháp logistics toàn diện cho doanh nghiệp
        </p>

        <div className="space-y-12">
          {services.map((service) => (
            <Card key={service.id} id={service.slug} className="scroll-mt-20">
              <CardHeader>
                <CardTitle className="text-2xl text-brand-orange-primary">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown>{service.content || service.description}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
