import Link from 'next/link'
import { generateMetadata as genMeta } from '@/lib/seo'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'


export const metadata = genMeta({
  title: 'Tin Tức',
  description: 'Tin tức và cập nhật mới nhất từ ICONIC LOGISTICS',
  path: '/news',
})

export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    select: {
      slug: true,
      title: true,
      summary: true,
      coverImageUrl: true,
      publishedAt: true,
    },
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tin Tức</h1>
        <p className="text-xl text-gray-600 mb-12">
          Cập nhật thông tin mới nhất về logistics và hoạt động của ICONIC
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Chưa có tin tức nào</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/news/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  {post.coverImageUrl && (
                    <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2 hover:text-brand-orange-primary">
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
        )}
      </div>
    </div>
  )
}
