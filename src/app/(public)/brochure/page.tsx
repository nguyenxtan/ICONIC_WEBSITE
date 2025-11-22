'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Download, ChevronLeft, ChevronRight, ZoomIn, BookOpen } from 'lucide-react'

export default function BrochurePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'vi'>('en')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const brochures = {
    en: {
      title: 'English Brochure',
      language: 'English',
      flag: 'English',
      description: 'Our company profile and services in English',
      color: 'from-blue-500 to-cyan-600',
      pages: 8,
      filePrefix: 'iconic-brochure-en',
    },
    vi: {
      title: 'Vietnamese Brochure',
      language: 'Tiếng Việt',
      flag: 'Vietnamese',
      description: 'Hồ sơ công ty và các dịch vụ của chúng tôi bằng tiếng Việt',
      color: 'from-red-500 to-orange-600',
      pages: 8,
      filePrefix: 'iconic-brochure-vi',
    },
  }

  const selectedBrochure = brochures[selectedLanguage]
  const currentImagePath = `/brochures/${selectedBrochure.filePrefix}-page-${selectedImageIndex + 1}.png`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-brand-orange-primary/5 to-slate-900">
      {/* Hero Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-brand-orange-primary via-brand-orange-dark to-transparent opacity-20 rounded-full blur-3xl -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-blue-500 via-brand-orange-primary to-transparent opacity-10 rounded-full blur-3xl translate-y-1/2"></div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-brand-orange-primary transition-all duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-semibold">{selectedLanguage === 'en' ? 'Back to Home' : 'Quay lại'}</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-brand-orange-primary to-brand-orange-dark rounded-xl shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-brand-orange-primary to-brand-orange-dark bg-clip-text text-transparent">
                {selectedLanguage === 'en' ? 'Company Brochures' : 'Brochure Công Ty'}
              </h1>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="px-4 py-2 bg-gradient-to-r from-brand-orange-primary/20 to-brand-orange-dark/20 border border-brand-orange-primary/30 rounded-full">
              <p className="text-sm font-semibold text-brand-orange-primary">📖 {selectedLanguage === 'en' ? 'DIGITAL SHOWCASE' : 'TRƯNG BÀY KỸ THUẬT SỐ'}</p>
            </div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {selectedLanguage === 'en' ? 'Discover Our Excellence' : 'Khám Phá Sự Xuất Sắc'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {selectedLanguage === 'en'
              ? 'Explore comprehensive insights into ICONIC LOGISTICS - our mission, services, and commitment to excellence.'
              : 'Khám phá những hiểu biết toàn diện về ICONIC LOGISTICS - sứ mệnh, dịch vụ và cam kết hướng tới sự xuất sắc của chúng tôi.'
            }
          </p>
        </div>

        {/* Language Selection */}
        <div className="flex justify-center gap-4 mb-16">
          {Object.entries(brochures).map(([id, brochure]) => (
            <button
              key={id}
              onClick={() => setSelectedLanguage(id as 'en' | 'vi')}
              className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden ${
                selectedLanguage === id
                  ? `bg-gradient-to-r ${brochure.color} text-white shadow-2xl scale-110`
                  : 'bg-white/10 border-2 border-white/20 text-white hover:bg-white/20 hover:border-white/40'
              }`}
            >
              <span className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity"></span>
              <span className="relative">{brochure.language}</span>
            </button>
          ))}
        </div>

        {/* Brochure Display */}
        {selectedBrochure && (
          <div className="max-w-6xl mx-auto">
            {/* Card with Premium Design */}
            <div className="relative group">
              {/* Glow Background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${selectedBrochure.color} opacity-20 blur-2xl rounded-3xl group-hover:opacity-40 transition-all duration-500 -z-10`}></div>

              <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/40 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                {/* Header */}
                <div className={`bg-gradient-to-br ${selectedBrochure.color} p-10 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-3">
                        {selectedLanguage === 'en' ? 'Document' : 'Tài Liệu'}
                      </p>
                      <h3 className="text-4xl lg:text-5xl font-black mb-3">{selectedBrochure.title}</h3>
                      <p className="text-white/90 text-lg leading-relaxed">{selectedBrochure.description}</p>
                    </div>
                    <BookOpen className="w-24 h-24 opacity-20 flex-shrink-0" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-14">
                  {/* Page Counter & Navigation */}
                  <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200/50">
                    <div className="flex items-center gap-3">
                      <div className="px-4 py-2 bg-gradient-to-r from-brand-orange-primary/20 to-brand-orange-dark/20 border border-brand-orange-primary/30 rounded-full">
                        <p className="text-sm font-bold text-brand-orange-primary">
                          {selectedLanguage === 'en' ? 'Page' : 'Trang'} <span className="text-brand-orange-primary font-black text-lg">{selectedImageIndex + 1}</span> /{selectedBrochure.pages}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                        disabled={selectedImageIndex === 0}
                        className="p-3 rounded-full bg-gray-100 hover:bg-brand-orange-primary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group/btn"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-700 group-hover/btn:text-brand-orange-primary transition-colors" />
                      </button>
                      <button
                        onClick={() => setSelectedImageIndex(Math.min(selectedBrochure.pages - 1, selectedImageIndex + 1))}
                        disabled={selectedImageIndex === selectedBrochure.pages - 1}
                        className="p-3 rounded-full bg-gray-100 hover:bg-brand-orange-primary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group/btn"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-700 group-hover/btn:text-brand-orange-primary transition-colors" />
                      </button>
                    </div>
                  </div>

                  {/* Image Display */}
                  <div className="relative mb-8 group/image">
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedBrochure.color} opacity-10 blur-xl rounded-2xl -z-10`}></div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200/50 overflow-hidden shadow-lg">
                      <div className="relative w-full bg-gray-900 flex items-center justify-center aspect-[8/11] overflow-hidden group/zoom">
                        <Image
                          src={currentImagePath}
                          alt={`${selectedBrochure.title} - Page ${selectedImageIndex + 1}`}
                          width={800}
                          height={1100}
                          priority
                          className="w-full h-full object-contain group-hover/zoom:scale-105 transition-transform duration-500"
                        />
                        <button
                          onClick={() => {}}
                          className="absolute top-4 right-4 p-3 bg-white/20 hover:bg-white/40 rounded-lg opacity-0 group-hover/image:opacity-100 transition-all duration-300 backdrop-blur-sm"
                        >
                          <ZoomIn className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Navigation */}
                  <div className="mb-10">
                    <p className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-widest">
                      {selectedLanguage === 'en' ? 'Page Preview' : 'Xem Trước Trang'}
                    </p>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                      {Array.from({ length: selectedBrochure.pages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`group/thumb relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                            selectedImageIndex === index
                              ? 'border-brand-orange-primary ring-2 ring-offset-2 shadow-lg scale-105'
                              : 'border-gray-200/50 hover:border-gray-300'
                          }`}
                        >
                          <div className="relative overflow-hidden bg-gray-100">
                            <Image
                              src={`/brochures/${selectedBrochure.filePrefix}-page-${index + 1}.png`}
                              alt={`Page ${index + 1}`}
                              width={100}
                              height={140}
                              className="w-full h-auto group-hover/thumb:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <p className={`absolute bottom-1 right-1 px-2 py-1 rounded-lg text-xs font-bold text-white ${selectedImageIndex === index ? 'bg-brand-orange-primary' : 'bg-black/60'}`}>
                            {index + 1}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = currentImagePath
                      link.download = `${selectedBrochure.filePrefix}-page-${selectedImageIndex + 1}.png`
                      link.click()
                    }}
                    className={`w-full flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-to-r ${selectedBrochure.color} text-white font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group/download`}
                  >
                    <Download className="w-6 h-6 group-hover/download:scale-125 group-hover/download:-translate-y-1 transition-transform" />
                    <span>{selectedLanguage === 'en' ? 'Download This Page' : 'Tải Trang Này'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="relative z-10 mt-20 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange-primary via-brand-orange-dark to-brand-orange-primary opacity-20 blur-3xl rounded-3xl -z-10 group-hover:opacity-40 transition-all duration-500"></div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 p-12 lg:p-16 text-center overflow-hidden relative">
              {/* Background Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-orange-primary/20 to-transparent rounded-full blur-3xl -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tl from-blue-500/10 via-brand-orange-primary/10 to-transparent rounded-full blur-3xl -ml-40 -mb-40"></div>

              <div className="relative z-10">
                <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-brand-orange-primary/20 to-brand-orange-dark/20 border border-brand-orange-primary/30 rounded-full">
                  <p className="text-sm font-semibold text-brand-orange-primary">💼 {selectedLanguage === 'en' ? 'NEXT STEP' : 'BƯỚC TIẾP THEO'}</p>
                </div>

                <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                  {selectedLanguage === 'en'
                    ? 'Ready to Transform Your Logistics?'
                    : 'Sẵn Sàng Chuyển Đổi Logistics Của Bạn?'
                  }
                </h3>

                <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                  {selectedLanguage === 'en'
                    ? 'Join hundreds of satisfied clients who trust ICONIC LOGISTICS. Get in touch today to discuss how we can optimize your supply chain.'
                    : 'Tham gia với hàng trăm khách hàng hài lòng tin tưởng ICONIC LOGISTICS. Liên hệ hôm nay để thảo luận cách chúng tôi có thể tối ưu hóa chuỗi cung ứng của bạn.'
                  }
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/contact"
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-orange-primary to-brand-orange-dark text-white font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group/btn"
                  >
                    <span>📞 {selectedLanguage === 'en' ? 'Contact Us Now' : 'Liên Hệ Ngay'}</span>
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/services"
                    className="px-8 py-4 rounded-xl bg-white/10 border-2 border-white/30 hover:border-white/50 text-white font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2 group/btn"
                  >
                    <span>🚀 {selectedLanguage === 'en' ? 'Explore Services' : 'Khám Phá Dịch Vụ'}</span>
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
