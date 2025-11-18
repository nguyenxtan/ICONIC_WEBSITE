import { notFound } from 'next/navigation'
import { generateMetadata as genMeta, generateArticleJsonLd } from '@/lib/seo'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Calendar, User } from 'lucide-react'

export const runtime = 'nodejs'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

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
          <div className="text-gray-700 leading-relaxed space-y-6">
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-6">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-5">{children}</h3>,
                  h4: ({ children }) => <h4 className="text-xl font-bold text-gray-900 mb-2 mt-4">{children}</h4>,
                  p: ({ children }) => <p className="text-gray-700 text-base leading-8">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 text-gray-700">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-gray-700">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-700 ml-2">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-brand-orange-primary pl-6 py-2 my-4 bg-brand-orange-primary/5 italic text-gray-700">
                      {children}
                    </blockquote>
                  ),
                  code: ({ inline, children }) =>
                    inline ? (
                      <code className="bg-gray-100 text-brand-orange-primary px-2 py-1 rounded text-sm font-mono">
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono">
                        <code>{children}</code>
                      </pre>
                    ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-brand-orange-primary hover:text-brand-orange-dark underline transition-colors">
                      {children}
                    </a>
                  ),
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt} className="w-full h-auto rounded-lg my-6 border border-gray-200" />
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
                  hr: () => <hr className="my-8 border-gray-300" />,
                }}
              >
                {post.contentMd}
              </ReactMarkdown>
            </div>
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
