import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Briefcase, MessageSquare, Eye, TrendingUp, ArrowUpRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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
    <div className="space-y-8">
      {/* Premium Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-orange-primary via-brand-orange-dark to-orange-900 p-8 text-white shadow-2xl">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -ml-40 -mb-40" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-3 flex items-center gap-3">
                <span>📊</span> Dashboard
              </h1>
              <p className="text-orange-100 text-lg font-medium">Chào mừng! Đây là tổng quan hệ thống của bạn</p>
            </div>
            <div className="hidden lg:block">
              <div className="text-7xl opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}>
                📈
              </div>
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Stats Cards - Premium Design */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.title}
              href={
                stat.title === 'Tổng Tin Tức' ? '/admin/posts' :
                stat.title === 'Dịch Vụ' ? '/admin/services' :
                stat.title === 'Liên Hệ' ? '/admin/posts' :
                '#'
              }
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-200/50 cursor-pointer">
                {/* Gradient accent line at top */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Animated background decoration */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-full transition-opacity duration-300 blur-2xl`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`${stat.iconBg} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{stat.subtitle}</p>
                  <div className="mt-3 flex items-center gap-1 text-brand-orange-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recent Content Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="border-b border-gray-100 bg-gradient-to-r from-orange-50/50 via-white to-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Tin Tức Mới Nhất</h3>
                <p className="text-xs text-gray-500 mt-1">{recentPosts.length} bài viết</p>
              </div>
            </div>
            <Link
              href="/admin/posts"
              className="p-2 hover:bg-orange-50 rounded-lg text-brand-orange-primary hover:text-brand-orange-dark transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="p-6">
            {recentPosts.length === 0 ? (
              <p className="text-center text-gray-500 py-12 font-medium">Chưa có tin tức nào</p>
            ) : (
              <div className="space-y-3">
                {recentPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/admin/posts/${post.id}/edit`}
                    className="group flex items-start justify-between p-4 rounded-xl hover:bg-orange-50/50 transition-all duration-300 border border-transparent hover:border-orange-200/50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-bold text-gray-300 mt-1 w-4">{index + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm line-clamp-1 group-hover:text-brand-orange-primary transition-colors text-gray-900">
                            {post.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(post.updatedAt).toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-xs px-3 py-1 rounded-full font-bold ml-3 whitespace-nowrap ${
                        post.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {post.status === 'PUBLISHED' ? '✓' : '○'}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50/50 via-white to-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Liên Hệ Mới Nhất</h3>
                <p className="text-xs text-gray-500 mt-1">{recentContacts.length} yêu cầu</p>
              </div>
            </div>
            <Link
              href="/admin/posts"
              className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="p-6">
            {recentContacts.length === 0 ? (
              <p className="text-center text-gray-500 py-12 font-medium">Chưa có liên hệ nào</p>
            ) : (
              <div className="space-y-3">
                {recentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="border border-gray-100 rounded-xl p-4 hover:border-blue-200/50 hover:bg-blue-50/30 transition-all duration-300 hover:shadow-sm group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-sm text-gray-900 group-hover:text-brand-orange-primary transition-colors">
                          {contact.name}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">{contact.email}</p>
                      </div>
                      <p className="text-xs text-gray-400 font-medium whitespace-nowrap ml-2">
                        {new Date(contact.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                        })}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed mt-2">
                      {contact.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
