import { notFound } from 'next/navigation'
import { generateMetadata as genMeta, generateArticleJsonLd } from '@/lib/seo'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import { Calendar, User } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug },
    select: {
      title: true,
      summary: true,
      coverImageUrl: true,
    },
  })

  if (!post) return {}

  return genMeta({
    title: post.title,
    description: post.summary || undefined,
    path: `/news/${slug}`,
    image: post.coverImageUrl || undefined,
    type: 'article',
  })
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug, status: 'PUBLISHED' },
    include: {
      createdBy: {
        select: {
          email: true,
        },
      },
    },
  })

  if (!post) {
    notFound()
  }

  const jsonLd = generateArticleJsonLd({
    title: post.title,
    description: post.summary || '',
    image: post.coverImageUrl || undefined,
    publishedTime: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    slug: post.slug,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Cover Image */}
          {post.coverImageUrl && (
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-8">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            {post.summary && (
              <p className="text-xl text-gray-600 mb-6">{post.summary}</p>
            )}

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>ICONIC LOGISTICS</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{post.contentMd}</ReactMarkdown>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t">
            <div className="bg-brand-orange-primary/5 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">Liên Hệ Với Chúng Tôi</h3>
              <p className="text-gray-700 mb-4">
                Bạn cần tư vấn về dịch vụ logistics? Hãy liên hệ ngay với ICONIC
                LOGISTICS để được hỗ trợ tốt nhất!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:0986066174"
                  className="inline-flex items-center justify-center px-6 py-3 bg-brand-orange-primary text-white rounded-md hover:bg-brand-orange-dark transition-colors"
                >
                  Gọi: 0986066174
                </a>
                <a
                  href="mailto:info@iconiclogs.com"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-brand-orange-primary text-brand-orange-primary rounded-md hover:bg-brand-accent transition-colors"
                >
                  Email: info@iconiclogs.com
                </a>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </>
  )
}
