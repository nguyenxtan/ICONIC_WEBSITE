import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const runtime = 'nodejs'

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      createdBy: {
        select: {
          email: true,
        },
      },
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản Lý Tin Tức</h1>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Thêm Tin Tức
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Tin Tức ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        post.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  {post.summary && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                      {post.summary}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>Slug: {post.slug}</span>
                    <span>Cập nhật: {formatDate(post.updatedAt)}</span>
                    <span>Tác giả: {post.createdBy.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {post.status === 'PUBLISHED' && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/news/${post.slug}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/posts/${post.id}/edit`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Sửa
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
