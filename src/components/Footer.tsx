import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="ICONIC LOGISTICS VIETNAM"
                width={250}
                height={75}
                className="h-16 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm">
              Đối tác logistics đáng tin cậy hàng đầu tại Việt Nam
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-brand-orange-primary">
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-orange-primary">
                  Dịch Vụ
                </Link>
              </li>
              <li>
                <Link href="/vision-mission" className="hover:text-brand-orange-primary">
                  Tầm Nhìn & Sứ Mệnh
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-brand-orange-primary">
                  Tin Tức
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-orange-primary">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Dịch Vụ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="hover:text-brand-orange-primary">
                  Vận Chuyển Đường Biển
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-orange-primary">
                  Khai Báo Hải Quan
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-orange-primary">
                  Kho Bãi & Vận Chuyển Nội Địa
                </Link>
              </li>
              <li>
                <Link
                  href="/services/tracking"
                  className="hover:text-brand-orange-primary"
                >
                  Tracking Container
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Liên Hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-brand-orange-primary" />
                <span>
                  25/49 Đường 6, Khu phố 26, Phường Hiệp Bình, TP.HCM, Việt Nam
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-brand-orange-primary" />
                <a href="tel:0986066174" className="hover:text-brand-orange-primary">
                  0986066174
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-brand-orange-primary" />
                <a
                  href="mailto:info@iconiclogs.com"
                  className="hover:text-brand-orange-primary"
                >
                  info@iconiclogs.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            © {new Date().getFullYear()} CÔNG TY TNHH ICONIC LOGISTICS. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
