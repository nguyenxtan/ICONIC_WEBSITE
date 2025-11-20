import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Ship, FileText, Warehouse, Search, ArrowRight, Anchor, Truck, Package, Globe, Plane } from 'lucide-react'
import { HeroSection } from '@/components/hero-section'
import { AnimatedCounter } from '@/components/animated-counter'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'


export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const services = await prisma.service.findMany({
    where: { visible: true },
    orderBy: { sortOrder: 'asc' },
    take: 3,
  })

  const partners = await prisma.partner.findMany({
    where: { visible: true },
    orderBy: { sortOrder: 'asc' },
  })

  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 3,
    select: {
      slug: true,
      title: true,
      summary: true,
      coverImageUrl: true,
      publishedAt: true,
    },
  })

  const shippingPartners = partners.filter(p => p.type === 'SHIPPING').slice(0, 8)
  const airlinePartners = partners.filter(p => p.type === 'AIRLINE').slice(0, 5)
  const internationalPartners = partners.filter(p => p.type === 'INTERNATIONAL')

  const serviceIcons = [Ship, FileText, Warehouse]

  // Statistics data
  const stats = [
    { label: 'Routes Hoạt Động', value: '50+', icon: Anchor },
    { label: 'Khách Hàng Tin Tưởng', value: '1000+', icon: Package },
    { label: 'Năm Kinh Nghiệm', value: '15+', icon: Truck },
  ]

  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Statistics Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              const numValue = parseInt(stat.value)
              return (
                <div
                  key={stat.label}
                  className="group flex items-center gap-4 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:shadow-md"
                >
                  <div className="p-3 bg-brand-orange-primary/10 rounded-lg group-hover:bg-brand-orange-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-brand-orange-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900 group-hover:text-brand-orange-primary transition-colors">
                      <AnimatedCounter end={numValue} suffix="+" />
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Dịch Vụ Của Chúng Tôi
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              ICONIC LOGISTICS cung cấp giải pháp logistics toàn diện cho mọi nhu cầu vận chuyển của bạn
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service, idx) => {
              const serviceImages = [
                'https://images.unsplash.com/photo-1703977883249-d959f2b0c1ae?w=500&h=300&fit=crop',
                'https://images.unsplash.com/photo-1571175419967-b8cff792febd?w=500&h=300&fit=crop',
                'https://images.unsplash.com/photo-1645736315000-6f788915923b?w=500&h=300&fit=crop',
              ]
              return (
                <div
                  key={service.id}
                  className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="h-48 bg-gray-300 overflow-hidden">
                    <img
                      src={serviceImages[idx]}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    <Link
                      href={`/services#${service.slug}`}
                      className="inline-flex items-center text-brand-orange-primary hover:text-brand-orange-dark font-medium text-sm transition-colors"
                    >
                      Xem chi tiết
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button size="lg" className="bg-brand-orange-primary hover:bg-brand-orange-dark text-white" asChild>
              <Link href="/services">Xem Tất Cả Dịch Vụ</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Đối Tác Chiến Lược
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                ICONIC LOGISTICS vinh dự hợp tác với các hãng tàu, hãng hàng không và đối tác quốc tế hàng đầu thế giới
              </p>
            </div>

            <div className="space-y-16">
              {/* Shipping Partners */}
              {shippingPartners.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg">
                      <Ship className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Hãng Tàu & Cảng</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {shippingPartners.map((partner) => (
                      <div
                        key={partner.id}
                        className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                          {partner.logoUrl ? (
                            <img
                              src={partner.logoUrl}
                              alt={partner.name}
                              className="max-w-full max-h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <span className="text-gray-400 text-sm">{partner.name}</span>
                          )}
                        </div>
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors text-center">{partner.name}</p>
                        {partner.port && (
                          <p className="text-xs text-gray-500 mt-2 text-center">{partner.port}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Airline Partners */}
              {airlinePartners.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg">
                      <Plane className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Hãng Hàng Không</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {airlinePartners.map((partner) => (
                      <div
                        key={partner.id}
                        className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                          {partner.logoUrl ? (
                            <img
                              src={partner.logoUrl}
                              alt={partner.name}
                              className="max-w-full max-h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <span className="text-gray-400 text-sm">{partner.name}</span>
                          )}
                        </div>
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-purple-600 transition-colors text-center">{partner.name}</p>
                        {partner.port && (
                          <p className="text-xs text-gray-500 mt-2 text-center">{partner.port}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* International Partners */}
              {internationalPartners.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-lg">
                      <Globe className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Đối Tác Quốc Tế</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {internationalPartners.map((partner) => (
                      <div
                        key={partner.id}
                        className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-green-300 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                          {partner.logoUrl ? (
                            <img
                              src={partner.logoUrl}
                              alt={partner.name}
                              className="max-w-full max-h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <span className="text-gray-400 text-sm">{partner.name}</span>
                          )}
                        </div>
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-green-600 transition-colors text-center">{partner.name}</p>
                        {partner.port && (
                          <p className="text-xs text-gray-500 mt-2 text-center">{partner.port}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <div className="text-center mt-16">
              <Button size="lg" className="bg-brand-orange-primary hover:bg-brand-orange-dark text-white" asChild>
                <Link href="/partners">Xem Tất Cả Đối Tác</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tin Tức Mới Nhất
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Cập nhật thông tin mới nhất về logistics và hoạt động của ICONIC
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <Link key={post.slug} href={`/news/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                    {post.coverImageUrl ? (
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img
                          src={post.coverImageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-brand-orange-primary/20 to-brand-orange/20 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-brand-orange-primary/50" />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2 hover:text-brand-orange-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      {post.summary && (
                        <CardDescription className="line-clamp-3">
                          {post.summary}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {post.publishedAt && formatDate(post.publishedAt)}
                        </span>
                        <ArrowRight className="h-4 w-4 text-brand-orange-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-brand-orange-primary hover:bg-brand-orange-dark" asChild>
                <Link href="/news">Xem Tất Cả Tin Tức</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-orange-primary to-brand-orange-dark text-white overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 30% 70%, white, transparent 50%), radial-gradient(circle at 70% 30%, white, transparent 50%)',
            backgroundSize: '400px 400px',
          }}></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Sẵn Sàng Bắt Đầu?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-brand-accent max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí về giải pháp logistics tối ưu cho doanh nghiệp của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-brand-orange-primary hover:bg-brand-accent shadow-lg font-semibold" asChild>
              <Link href="/contact">
                Gửi Yêu Cầu Tư Vấn
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 backdrop-blur font-semibold" asChild>
              <Link href="tel:0986066174">
                Gọi: 0986066174
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
