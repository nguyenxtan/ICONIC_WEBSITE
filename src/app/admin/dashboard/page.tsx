import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Briefcase, MessageSquare, Eye, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const runtime = 'nodejs'

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header Section with Gradient Background */}
      <div className="mb-10 -mx-6 -mt-6 px-6 py-10 bg-gradient-to-r from-brand-orange-primary/5 via-transparent to-brand-orange-dark/5 border-b border-orange-100/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-orange-primary to-brand-orange-dark bg-clip-text text-transparent mb-3">
              Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Chào mừng quay trở lại! Đây là tổng quan hệ thống của bạn.</p>
          </div>
          <div className="hidden lg:block text-6xl opacity-10">
            📊
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.title}
              className="relative overflow-hidden border border-gray-200/50 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-orange-200/50 bg-white/80 backdrop-blur-sm"
            >
              {/* Gradient accent line at top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />

              {/* Background gradient decoration */}
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full -mr-20 -mt-20`} />

              <CardHeader className="pb-2 relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-gray-600 letter-spacing">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.iconBg} p-3 rounded-xl`}>
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-600 font-medium">{stat.subtitle}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card className="shadow-md border border-gray-200/50 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-orange-50/50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">
                  Tin Tức Mới Nhất
                </CardTitle>
              </div>
              <Link
                href="/admin/posts"
                className="text-sm font-semibold text-brand-orange-primary hover:text-brand-orange-dark transition-colors flex items-center gap-1 hover:gap-2"
              >
                Xem tất cả <span>→</span>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {recentPosts.length === 0 ? (
              <p className="text-center text-gray-500 py-12 font-medium">Chưa có tin tức nào</p>
            ) : (
              <div className="space-y-2">
                {recentPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/admin/posts/${post.id}/edit`}
                    className="flex items-start justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-50/30 transition-all duration-300 group border border-transparent hover:border-orange-200/50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-bold text-gray-400 mt-0.5 w-5">{index + 1}.</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm line-clamp-1 group-hover:text-brand-orange-primary transition-colors text-gray-900">
                            {post.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1.5">
                            {new Date(post.updatedAt).toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-xs px-3 py-1.5 rounded-full font-bold ml-3 whitespace-nowrap ${
                        post.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {post.status === 'PUBLISHED' ? '✓ Xuất bản' : '○ Nháp'}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Contacts */}
        <Card className="shadow-md border border-gray-200/50 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg font-bold text-gray-900">
                Liên Hệ Mới Nhất
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {recentContacts.length === 0 ? (
              <p className="text-center text-gray-500 py-12 font-medium">Chưa có liên hệ nào</p>
            ) : (
              <div className="space-y-3">
                {recentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="border border-gray-100 rounded-xl p-4 hover:bg-blue-50/30 hover:border-blue-200/50 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{contact.name}</div>
                        <div className="text-xs text-brand-orange-primary font-medium mt-0.5">{contact.email}</div>
                      </div>
                      <div className="text-xs text-gray-400 font-medium">
                        {new Date(contact.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
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
