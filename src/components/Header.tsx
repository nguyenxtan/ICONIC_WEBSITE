'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

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

        <nav className="hidden md:flex items-center space-x-1">
          <Link
            href="/"
            className="text-sm font-medium px-3 py-2 transition-colors hover:text-brand-orange-primary"
          >
            Trang Chủ
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium px-3 py-2 transition-colors hover:text-brand-orange-primary"
          >
            Về Chúng Tôi
          </Link>

          {/* Dropdown: Dịch Vụ & Đối Tác */}
          <div
            className="relative group"
            onMouseEnter={() => setOpenDropdown('services')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="text-sm font-medium px-3 py-2 transition-colors hover:text-brand-orange-primary flex items-center gap-1">
              Dịch Vụ & Đối Tác
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/services" className="block px-4 py-2 text-sm hover:bg-brand-orange-primary/10 hover:text-brand-orange-primary first:rounded-t-lg">
                Dịch Vụ Chính
              </Link>
              <Link href="/partners" className="block px-4 py-2 text-sm hover:bg-brand-orange-primary/10 hover:text-brand-orange-primary">
                Đối Tác
              </Link>
              <Link href="/commodities" className="block px-4 py-2 text-sm hover:bg-brand-orange-primary/10 hover:text-brand-orange-primary">
                Mặt Hàng
              </Link>
              <Link href="/brochure" className="block px-4 py-2 text-sm hover:bg-brand-orange-primary/10 hover:text-brand-orange-primary last:rounded-b-lg">
                Brochure
              </Link>
            </div>
          </div>

          <Link
            href="/vision-mission"
            className="text-sm font-medium px-3 py-2 transition-colors hover:text-brand-orange-primary"
          >
            Tầm Nhìn & Sứ Mệnh
          </Link>
          <Link
            href="/news"
            className="text-sm font-medium px-3 py-2 transition-colors hover:text-brand-orange-primary"
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
            className="text-sm font-medium px-3 py-2 transition-colors hover:text-brand-orange-primary"
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
