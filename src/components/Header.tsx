import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="ICONIC LOGISTICS VIETNAM"
            width={350}
            height={105}
            className="h-20 w-auto"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-brand-orange-primary"
          >
            Trang Chủ
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-brand-orange-primary"
          >
            Về Chúng Tôi
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium transition-colors hover:text-brand-orange-primary"
          >
            Dịch Vụ
          </Link>
          <Link
            href="/vision-mission"
            className="text-sm font-medium transition-colors hover:text-brand-orange-primary"
          >
            Tầm Nhìn & Sứ Mệnh
          </Link>
          <Link
            href="/news"
            className="text-sm font-medium transition-colors hover:text-brand-orange-primary"
          >
            Tin Tức
          </Link>
          <Link
            href="/services/tracking"
            className="text-sm font-medium px-4 py-2 bg-brand-orange-primary text-white rounded-md hover:bg-brand-orange-dark transition-colors"
          >
            Tracking
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-brand-orange-primary"
          >
            Liên Hệ
          </Link>
        </nav>

        <button className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  )
}
