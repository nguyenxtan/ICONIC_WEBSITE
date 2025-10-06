import Link from 'next/link'
import NextImage from 'next/image'
import { LayoutDashboard, FileText, Briefcase, Building2, Image, LogOut } from 'lucide-react'
import { getCurrentUserEdge } from '@/lib/auth-edge'

export const runtime = 'edge'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUserEdge()

  // Login page - render without any wrapper (no Header/Footer from root layout)
  if (!user) {
    return <>{children}</>
  }

  // Admin dashboard - render with sidebar only (no Header/Footer)
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-2xl">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-white to-orange-50">
          <Link href="/admin/dashboard" className="block">
            <NextImage
              src="/logo.png"
              alt="ICONIC LOGISTICS"
              width={220}
              height={66}
              className="w-full h-auto mb-3"
            />
            <div className="flex items-center gap-2 mt-3 p-2 bg-white rounded-lg border border-orange-100">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange-primary to-brand-orange-dark flex items-center justify-center text-white font-bold text-sm">
                {user.email[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-900 truncate">{user.email}</div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
            Quản lý
          </div>
          <Link
            href="/admin/dashboard"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-brand-orange-primary transition-all group relative"
          >
            <LayoutDashboard className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link
            href="/admin/posts"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-brand-orange-primary transition-all group"
          >
            <FileText className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="font-medium">Tin Tức</span>
          </Link>
          <Link
            href="/admin/services"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-brand-orange-primary transition-all group"
          >
            <Briefcase className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="font-medium">Dịch Vụ</span>
          </Link>
          <Link
            href="/admin/company-info"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-brand-orange-primary transition-all group"
          >
            <Building2 className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="font-medium">Thông Tin Công Ty</span>
          </Link>
          <Link
            href="/admin/media"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-brand-orange-primary transition-all group"
          >
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="font-medium">Media</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all w-full text-left group"
            >
              <LogOut className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="font-medium">Đăng Xuất</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
