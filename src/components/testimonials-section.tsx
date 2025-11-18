'use client'

import { useEffect, useState } from 'react'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  company: string
  position: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    company: 'Công Ty Xuất Nhập Khẩu ABC',
    position: 'Giám đốc Logistics',
    content:
      'ICONIC LOGISTICS đã giúp chúng tôi giảm chi phí vận chuyển 25% và tăng tốc độ giao hàng đáng kể. Đội ngũ chuyên nghiệp và dịch vụ uy tín!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Trần Thị B',
    company: 'Công Ty Thương Mại Điện Tử XYZ',
    position: 'Quản Lý Chuỗi Cung Ứng',
    content:
      'Hệ thống tracking real-time của ICONIC giúp chúng tôi có thể cập nhật khách hàng mọi lúc. Rất hài lòng với dịch vụ!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Lê Văn C',
    company: 'Nhà Máy Sản Xuất DEF',
    position: 'Trưởng Phòng Vận Hành',
    content:
      'Dịch vụ kho bãi và vận chuyển nội địa của ICONIC rất chuyên nghiệp. Họ hiểu được nhu cầu của chúng tôi và luôn hỗ trợ tận tình.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Đánh Giá Của Khách Hàng
          </h2>
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Nghe từ những khách hàng đã tin tưởng ICONIC LOGISTICS
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className={`group relative bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-brand-orange-primary/30 ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${isLoaded ? (150 + idx * 100) : 0}ms`,
              }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -right-4 bg-brand-orange-primary/10 p-3 rounded-full">
                <Quote className="h-6 w-6 text-brand-orange-primary/50" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brand-accent text-brand-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t border-gray-100 pt-6">
                <p className="font-semibold text-gray-900 group-hover:text-brand-orange-primary transition-colors">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
                <p className="text-xs text-gray-500 mt-1">{testimonial.company}</p>
              </div>

              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg -z-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-gray-600 mb-6">
            Hơn 1000+ khách hàng đã tin tưởng ICONIC LOGISTICS
          </p>
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-2 rounded-full bg-brand-orange-primary/30 hover:bg-brand-orange-primary transition-colors"
                style={{
                  width: `${20 + i * 5}px`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
