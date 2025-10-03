import Link from 'next/link'
import NextImage from 'next/image'
import { LayoutDashboard, FileText, Briefcase, Building2, Image, LogOut } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  // Don't show sidebar on login page - just render children without redirect
  // Middleware handles authentication redirects
  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <Link href="/admin/dashboard" className="flex flex-col space-y-2">
            <NextImage
              src="/logo.png"
              alt="ICONIC LOGISTICS"
              width={220}
              height={66}
              className="h-14 w-auto brightness-0 invert"
            />
            <div className="text-xs text-gray-400">{user.email}</div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/posts"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FileText className="h-5 w-5" />
            <span>Tin Tức</span>
          </Link>
          <Link
            href="/admin/services"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Briefcase className="h-5 w-5" />
            <span>Dịch Vụ</span>
          </Link>
          <Link
            href="/admin/company-info"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Building2 className="h-5 w-5" />
            <span>Thông Tin Công Ty</span>
          </Link>
          <Link
            href="/admin/media"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Image className="h-5 w-5" />
            <span>Media</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors w-full text-left"
            >
              <LogOut className="h-5 w-5" />
              <span>Đăng Xuất</span>
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
