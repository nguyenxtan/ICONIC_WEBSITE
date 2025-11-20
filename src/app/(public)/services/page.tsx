import { generateMetadata as genMeta } from '@/lib/seo'
import { prisma } from '@/lib/db'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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
    <div className="bg-white">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-b from-brand-orange-primary/5 to-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Dịch Vụ</h1>
            <p className="text-xl text-gray-600">
              ICONIC LOGISTICS cung cấp giải pháp logistics toàn diện cho doanh nghiệp
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-12">
              {services.map((service) => (
                <div
                  key={service.id}
                  id={service.slug}
                  className="scroll-mt-32 bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-1 rounded-full bg-brand-orange-primary"></div>
                    <h2 className="text-3xl font-bold text-brand-orange-primary">
                      {service.title}
                    </h2>
                  </div>

                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-8">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl font-bold text-gray-900 mb-2 mt-5">{children}</h3>,
                        p: ({ children }) => <p className="text-gray-700 text-base leading-7 mb-3">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2 mb-4 bg-gray-50 p-4 rounded-lg">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-2 mb-4 bg-gray-50 p-4 rounded-lg">{children}</ol>,
                        li: ({ children }) => <li className="text-gray-700">{children}</li>,
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-brand-orange-primary pl-6 py-4 my-4 bg-brand-orange-primary/5 italic text-gray-700 rounded-r-lg">
                            {children}
                          </blockquote>
                        ),
                        code: ({ className, children }) => {
                          const isCodeBlock = className?.startsWith('language-')
                          return isCodeBlock ? (
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono border border-gray-800">
                              <code className={className}>{children}</code>
                            </pre>
                          ) : (
                            <code className="bg-gray-100 text-brand-orange-primary px-2 py-1 rounded text-sm font-mono border border-gray-200">
                              {children}
                            </code>
                          )
                        },
                        a: ({ href, children }) => (
                          <a href={href} className="text-brand-orange-primary hover:text-brand-orange-dark font-medium underline transition-colors">
                            {children}
                          </a>
                        ),
                        img: ({ src, alt }) => (
                          <img src={src} alt={alt} className="w-full h-auto rounded-lg my-6 border border-gray-200 shadow-sm" />
                        ),
                        table: ({ children }) => (
                          <div className="overflow-x-auto my-6 border border-gray-300 rounded-lg">
                            <table className="w-full border-collapse">{children}</table>
                          </div>
                        ),
                        th: ({ children, align }) => (
                          <th className={`border-b-2 border-gray-300 bg-brand-orange-primary/10 px-6 py-3 font-bold text-gray-900 ${
                            align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
                          }`}>
                            {children}
                          </th>
                        ),
                        td: ({ children, align }) => (
                          <td className={`border-b border-gray-200 px-6 py-3 text-gray-700 ${
                            align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
                          }`}>{children}</td>
                        ),
                        hr: () => <hr className="my-8 border-gray-300" />,
                      }}
                    >
                      {service.content || service.description}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commodities Section */}
      {commodities.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-white to-brand-orange-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="h-1 w-1 rounded-full bg-brand-orange-primary"></div>
                  <span className="text-sm font-semibold text-brand-orange-primary uppercase tracking-wider">Mặt Hàng Vận Chuyển</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Mặt Hàng Chủ Lực
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl">
                  Chúng tôi chuyên vận chuyển đa dạng các loại hàng hóa với hệ thống kho bãi hiện đại và quy trình vận hành tối ưu, đảm bảo chất lượng, an toàn và hiệu quả cao nhất.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {commodities.map((commodity) => (
                  <div
                    key={commodity.id}
                    className="group bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-brand-orange-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-brand-orange-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-brand-orange-primary transition-colors">{commodity.nameVi}</p>
                        {commodity.nameEn && (
                          <p className="text-xs text-gray-500 mt-1">{commodity.nameEn}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
