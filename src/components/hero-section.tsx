'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, ArrowRight, ChevronDown } from 'lucide-react'

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true)

  useEffect(() => {
    setIsLoaded(true)

    // Hide scroll indicator when user scrolls
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicatorVisible(false)
      } else {
        setScrollIndicatorVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1557551776-37ca64949ad4?w=1600&h=600&fit=crop"
          alt="Docked Cargo Vessel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-orange-primary/90 via-brand-orange/85 to-brand-orange-dark/80"></div>
      </div>

      {/* Content */}
      <div className="relative py-24 md:py-48">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {/* Badge with fade-in animation */}
            <div className={`mb-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-brand-accent font-semibold text-sm md:text-base tracking-wide uppercase bg-white/10 px-4 py-2 rounded-full inline-block border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors">
                Dịch Vụ Logistics Hàng Đầu
              </span>
            </div>

            {/* Main Heading with staggered animation */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className={`block transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Giải Pháp
              </span>
              <span className={`block transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Logistics
              </span>
              <span className={`block text-brand-accent transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Toàn Diện Tại Việt Nam
              </span>
            </h1>

            {/* Description with fade-in animation */}
            <p className={`text-lg md:text-xl mb-10 text-white/95 leading-relaxed max-w-2xl transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Vận chuyển đường biển, khai báo hải quan, kho bãi và vận chuyển nội địa.
              Chúng tôi cam kết mang lại giải pháp logistics chuyên nghiệp, nhanh chóng và đáng tin cậy.
            </p>

            {/* CTA Buttons with animation and enhanced styling */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Button
                size="lg"
                className="bg-white text-brand-orange-primary hover:bg-brand-accent border-white shadow-lg font-semibold group relative overflow-hidden"
                asChild
              >
                <Link href="/contact">
                  <span className="relative z-10 flex items-center">
                    Liên Hệ Ngay
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-brand-accent/20 transform -skew-x-12 group-hover:skew-x-0 transition-transform duration-300 -z-0"></span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20 backdrop-blur font-semibold group relative overflow-hidden"
                asChild
              >
                <Link href="/services/tracking">
                  <span className="relative z-10 flex items-center">
                    <Search className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Tracking Container
                  </span>
                  <span className="absolute inset-0 bg-white/10 -z-0"></span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${scrollIndicatorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/70 text-sm font-medium tracking-wider">Khám phá thêm</span>
          <ChevronDown className="h-6 w-6 text-brand-accent" />
        </div>
      </div>
    </section>
  )
}
