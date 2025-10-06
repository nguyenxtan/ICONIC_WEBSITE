import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Briefcase, MessageSquare, Eye, TrendingUp } from 'lucide-react'
import Link from 'next/link'

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

  const stats = [
    {
      title: 'Tổng Tin Tức',
      value: postsCount,
      subtitle: `${publishedPostsCount} đã xuất bản`,
      icon: FileText,
      gradient: 'from-orange-500 to-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Dịch Vụ',
      value: servicesCount,
      subtitle: 'Dịch vụ đang hoạt động',
      icon: Briefcase,
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Liên Hệ',
      value: contactFormsCount,
      subtitle: 'Yêu cầu liên hệ',
      icon: MessageSquare,
      gradient: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Lượt Xem',
      value: '-',
      subtitle: 'Sắp tới',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-orange-primary to-brand-orange-dark bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">Chào mừng quay trở lại! Đây là tổng quan hệ thống của bạn.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.title}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full -mr-16 -mt-16`} />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-gray-700">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.iconBg} p-2 rounded-lg`}>
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card className="shadow-lg border-0">
          <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Tin Tức Mới Nhất
              </CardTitle>
              <Link
                href="/admin/posts"
                className="text-sm text-brand-orange-primary hover:text-brand-orange-dark transition-colors"
              >
                Xem tất cả →
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {recentPosts.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Chưa có tin tức nào</p>
            ) : (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/admin/posts/${post.id}/edit`}
                    className="flex items-start justify-between p-3 rounded-lg hover:bg-orange-50 transition-colors group"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm line-clamp-1 group-hover:text-brand-orange-primary transition-colors">
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(post.updatedAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <div
                      className={`text-xs px-3 py-1 rounded-full font-medium ml-3 ${
                        post.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {post.status === 'PUBLISHED' ? 'Xuất bản' : 'Nháp'}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Contacts */}
        <Card className="shadow-lg border-0">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Liên Hệ Mới Nhất
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {recentContacts.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Chưa có liên hệ nào</p>
            ) : (
              <div className="space-y-4">
                {recentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="border-b border-gray-100 pb-4 last:border-0 last:pb-0 hover:bg-blue-50 -mx-3 px-3 py-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium text-sm text-gray-900">{contact.name}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(contact.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                        })}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{contact.email}</div>
                    <div className="text-sm text-gray-700 line-clamp-2">
                      {contact.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
