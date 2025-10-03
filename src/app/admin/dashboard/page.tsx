import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Briefcase, MessageSquare, Eye } from 'lucide-react'

export default async function AdminDashboardPage() {
  const [postsCount, servicesCount, contactFormsCount, publishedPostsCount] =
    await Promise.all([
      prisma.post.count(),
      prisma.service.count(),
      prisma.contactForm.count(),
      prisma.post.count({ where: { status: 'PUBLISHED' } }),
    ])

  const recentPosts = await prisma.post.findMany({
    take: 5,
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      status: true,
      updatedAt: true,
    },
  })

  const recentContacts = await prisma.contactForm.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      createdAt: true,
    },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Tin Tức</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postsCount}</div>
            <p className="text-xs text-muted-foreground">
              {publishedPostsCount} đã xuất bản
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dịch Vụ</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{servicesCount}</div>
            <p className="text-xs text-muted-foreground">Dịch vụ đang hoạt động</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Liên Hệ</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contactFormsCount}</div>
            <p className="text-xs text-muted-foreground">Yêu cầu liên hệ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượt Xem</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Sắp tới</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Tin Tức Mới Nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm line-clamp-1">
                      {post.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(post.updatedAt).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded ${
                      post.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {post.status === 'PUBLISHED' ? 'Published' : 'Draft'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Contacts */}
        <Card>
          <CardHeader>
            <CardTitle>Liên Hệ Mới Nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="border-b pb-3 last:border-0">
                  <div className="font-medium text-sm">{contact.name}</div>
                  <div className="text-xs text-gray-500 mb-1">{contact.email}</div>
                  <div className="text-xs text-gray-700 line-clamp-2">
                    {contact.message}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(contact.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
