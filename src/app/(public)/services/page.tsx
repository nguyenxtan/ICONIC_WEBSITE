import { generateMetadata as genMeta } from '@/lib/seo'
import { prisma } from '@/lib/db'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package } from 'lucide-react'

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

  const commodities = await prisma.commodity.findMany({
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
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-6">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-5">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-xl font-bold text-gray-900 mb-2 mt-4">{children}</h3>,
                      p: ({ children }) => <p className="text-gray-700 text-base leading-7">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-2">{children}</ol>,
                      li: ({ children }) => <li className="text-gray-700">{children}</li>,
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-brand-orange-primary pl-4 py-2 my-3 bg-brand-orange-primary/5 italic text-gray-700">
                          {children}
                        </blockquote>
                      ),
                      code: ({ className, children }) => {
                        const isCodeBlock = className?.startsWith('language-')
                        return isCodeBlock ? (
                          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto my-3 text-sm font-mono">
                            <code className={className}>{children}</code>
                          </pre>
                        ) : (
                          <code className="bg-gray-100 text-brand-orange-primary px-2 py-1 rounded text-sm font-mono">
                            {children}
                          </code>
                        )
                      },
                      a: ({ href, children }) => (
                        <a href={href} className="text-brand-orange-primary hover:text-brand-orange-dark underline transition-colors">
                          {children}
                        </a>
                      ),
                      img: ({ src, alt }) => (
                        <img src={src} alt={alt} className="w-full h-auto rounded-lg my-4 border border-gray-200" />
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-6 border border-gray-300 rounded-lg">
                          <table className="w-full border-collapse">{children}</table>
                        </div>
                      ),
                      th: ({ children, align }) => (
                        <th className={`border-b-2 border-gray-300 bg-brand-orange-primary/10 px-6 py-4 font-bold text-gray-900 ${
                          align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
                        }`}>
                          {children}
                        </th>
                      ),
                      td: ({ children, align }) => (
                        <td className={`border-b border-gray-200 px-6 py-4 text-gray-700 ${
                          align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
                        }`}>{children}</td>
                      ),
                      hr: () => <hr className="my-6 border-gray-300" />,
                    }}
                  >
                    {service.content || service.description}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Commodities Section */}
          {commodities.length > 0 && (
            <div className="mt-16 pt-12 border-t-2 border-gray-200">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Mặt Hàng Chủ Lực
                </h2>
                <p className="text-gray-600 text-lg">
                  Chúng tôi chuyên vận chuyển các loại hàng hóa sau:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {commodities.map((commodity) => (
                  <div
                    key={commodity.id}
                    className="flex items-center gap-3 p-4 bg-gradient-to-br from-brand-orange-primary/10 to-white border border-brand-orange-primary/20 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <Package className="h-5 w-5 text-brand-orange-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{commodity.nameVi}</p>
                      {commodity.nameEn && (
                        <p className="text-xs text-gray-500">{commodity.nameEn}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
