import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Ship, FileText, Warehouse, Search, ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'

export const runtime = 'edge'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const services = await prisma.service.findMany({
    where: { visible: true },
    orderBy: { sortOrder: 'asc' },
    take: 3,
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

  const serviceIcons = [Ship, FileText, Warehouse]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-orange-primary via-brand-orange to-brand-orange-dark text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Giải Pháp Logistics
              <br />
              Toàn Diện Tại Việt Nam
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-brand-accent">
              Vận chuyển đường biển, khai báo hải quan, kho bãi và vận chuyển nội địa
              - Chuyên nghiệp, nhanh chóng, đáng tin cậy
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="outline" className="bg-white text-brand-orange-primary hover:bg-brand-accent border-white" asChild>
                <Link href="/contact">
                  Liên Hệ Ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/services/tracking">
                  <Search className="mr-2 h-5 w-5" />
                  Tracking Container
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dịch Vụ Của Chúng Tôi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ICONIC LOGISTICS cung cấp giải pháp logistics toàn diện cho mọi nhu cầu
              vận chuyển của bạn
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = serviceIcons[idx] || Ship
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-brand-orange-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-brand-orange-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="p-0" asChild>
                      <Link href={`/services#${service.slug}`}>
                        Xem chi tiết <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/services">Xem Tất Cả Dịch Vụ</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tin Tức Mới Nhất
            </h2>
            <p className="text-lg text-gray-600">
              Cập nhật thông tin và xu hướng ngành logistics
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
                {post.coverImageUrl && (
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">
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
                    <Button variant="link" className="p-0" asChild>
                      <Link href={`/news/${post.slug}`}>
                        Đọc thêm <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/news">Xem Tất Cả Tin Tức</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-orange-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sẵn Sàng Bắt Đầu?
          </h2>
          <p className="text-xl mb-8 text-brand-accent">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-brand-orange-primary hover:bg-brand-accent border-white" asChild>
              <Link href="/contact">Liên Hệ Ngay</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="tel:0986066174">Gọi: 0986066174</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
