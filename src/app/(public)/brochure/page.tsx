'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Download, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

export default function BrochurePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'vi'>('vi')
  const [currentPage, setCurrentPage] = useState(0)
  const [isAtBottom, setIsAtBottom] = useState(false)

  const brochures = {
    en: {
      language: 'English',
      pages: 8,
      filePrefix: 'iconic-brochure-en',
    },
    vi: {
      language: 'Tiếng Việt',
      pages: 8,
      filePrefix: 'iconic-brochure-vi',
    },
  }

  const brochure = brochures[selectedLanguage]
  const imageUrl = `/brochures/${brochure.filePrefix}-page-${currentPage + 1}.png`

  useEffect(() => {
    let lastScrollTime = 0
    const scrollCooldown = 800 // 800ms cooldown between pages

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastScrollTime < scrollCooldown) {
        e.preventDefault()
        return
      }

      // Threshold to prevent accidental small scrolls
      if (Math.abs(e.deltaY) < 30) {
        return
      }

      if (e.deltaY > 0) {
        // Scroll down
        if (currentPage < brochure.pages - 1) {
          e.preventDefault()
          lastScrollTime = now
          setCurrentPage((prev) => Math.min(prev + 1, brochure.pages - 1))
        }
      } else {
        // Scroll up
        if (currentPage > 0) {
          e.preventDefault()
          lastScrollTime = now
          setCurrentPage((prev) => Math.max(prev - 1, 0))
        }
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        setCurrentPage((prev) => Math.min(prev + 1, brochure.pages - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setCurrentPage((prev) => Math.max(prev - 1, 0))
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentPage, brochure.pages])

  const switchLanguage = (lang: 'en' | 'vi') => {
    setSelectedLanguage(lang)
    setCurrentPage(0)
  }

  const downloadPage = () => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `${brochure.filePrefix}-page-${currentPage + 1}.png`
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-brand-orange-primary transition-colors duration-200"
          >
            <span className="text-sm font-medium">← {selectedLanguage === 'en' ? 'Back' : 'Quay lại'}</span>
          </Link>
          <h1 className="text-xl font-bold text-white">
            {selectedLanguage === 'en' ? 'Company Brochure' : 'Brochure Công Ty'}
          </h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Main Viewer */}
      <main className="h-screen flex flex-col items-center justify-center pt-20 px-4">
        {/* Language Toggle - Modern Segment Control */}
        <div className="absolute top-24 left-4 sm:left-8 z-30">
          <div className="flex gap-1 bg-slate-700/40 backdrop-blur-md p-1 rounded-lg border border-slate-600/50">
            {Object.entries(brochures).map(([id, data]) => (
              <button
                key={id}
                onClick={() => switchLanguage(id as 'en' | 'vi')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all duration-300 text-xs sm:text-sm ${
                  selectedLanguage === id
                    ? 'bg-brand-orange-primary text-white shadow-lg shadow-brand-orange-primary/50'
                    : 'text-slate-300 hover:text-slate-100'
                }`}
              >
                {id === 'en' ? 'EN' : 'VI'}
              </button>
            ))}
          </div>
        </div>

        {/* Download Button - Top Right */}
        <button
          onClick={downloadPage}
          className="absolute top-24 right-4 sm:right-8 z-30 px-4 py-2 bg-brand-orange-primary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-orange-primary/50 transition-all duration-200 flex items-center gap-2 text-sm"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">{selectedLanguage === 'en' ? 'Download' : 'Tải'}</span>
        </button>

        {/* Image Container - Centered */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="relative bg-slate-800 rounded-2xl overflow-hidden shadow-2xl aspect-[8.5/11]">
            <Image
              src={imageUrl}
              alt={`Page ${currentPage + 1} of ${brochure.pages}`}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 90vw"
            />

            {/* Page Indicator - Bottom Center */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-4">
              <span className="text-white text-sm font-semibold">
                {currentPage + 1} / {brochure.pages}
              </span>
              <div className="h-6 w-1 bg-gradient-to-b from-brand-orange-primary to-transparent"></div>
              <span className="text-slate-300 text-xs">
                {selectedLanguage === 'en' ? 'Scroll to navigate' : 'Cuộn để điều hướng'}
              </span>
            </div>
          </div>
        </div>

        {/* Previous Button - Left Edge */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className={`absolute left-4 sm:left-8 bottom-1/2 transform translate-y-1/2 p-2 rounded-lg transition-all duration-200 z-20 ${
            currentPage === 0
              ? 'text-slate-600 cursor-not-allowed opacity-50'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/40 hover:shadow-lg hover:shadow-brand-orange-primary/20'
          }`}
          aria-label={selectedLanguage === 'en' ? 'Previous page' : 'Trang trước'}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Scroll Indicator - Bottom Center */}
        {currentPage < brochure.pages - 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">
              {selectedLanguage === 'en' ? 'Scroll' : 'Cuộn'}
            </span>
            <ChevronDown className="w-5 h-5 text-brand-orange-primary" />
          </div>
        )}

        {/* Next Button - Right Edge */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, brochure.pages - 1))}
          disabled={currentPage === brochure.pages - 1}
          className={`absolute right-4 sm:right-8 bottom-1/2 transform translate-y-1/2 p-2 rounded-lg transition-all duration-200 z-20 ${
            currentPage === brochure.pages - 1
              ? 'text-slate-600 cursor-not-allowed opacity-50'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/40 hover:shadow-lg hover:shadow-brand-orange-primary/20'
          }`}
          aria-label={selectedLanguage === 'en' ? 'Next page' : 'Trang tiếp theo'}
        >
          <ChevronRight className="w-8 h-8" />
        </button>

      </main>

      {/* Footer Hint */}
      {currentPage === brochure.pages - 1 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 text-sm">
          {selectedLanguage === 'en' ? 'End of brochure' : 'Kết thúc brochure'}
        </div>
      )}
    </div>
  )
}
