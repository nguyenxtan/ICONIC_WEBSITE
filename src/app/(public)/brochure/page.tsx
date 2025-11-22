'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FileText, Download, Globe, Flag, ArrowLeft, ZoomIn } from 'lucide-react'

export default function BrochurePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'vi'>('en')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const brochures = {
    en: {
      title: 'English Brochure',
      language: 'English',
      flag: '🇬🇧',
      description: 'Our company profile and services in English',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      pages: 8,
      filePrefix: 'iconic-brochure-en',
    },
    vi: {
      title: 'Vietnamese Brochure',
      language: 'Tiếng Việt',
      flag: '🇻🇳',
      description: 'Hồ sơ công ty và các dịch vụ của chúng tôi bằng tiếng Việt',
      color: 'from-red-500 to-orange-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      pages: 8,
      filePrefix: 'iconic-brochure-vi',
    },
  }

  const selectedBrochure = brochures[selectedLanguage]
  const currentImagePath = `/brochures/${selectedBrochure.filePrefix}-page-${selectedImageIndex + 1}.png`

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-brand-orange-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-orange-primary to-brand-orange-dark bg-clip-text text-transparent flex items-center gap-2">
              <FileText className="w-8 h-8 text-brand-orange-primary" />
              Brochures
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Company Brochures
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Download our comprehensive brochures to learn more about ICONIC LOGISTICS and our services.
          </p>
        </div>

        {/* Language Selection */}
        <div className="flex justify-center gap-4 mb-12">
          {(Object.entries(brochures) as Array<[keyof typeof brochures, typeof brochures['en']]>).map(([id, brochure]) => (
            <button
              key={id}
              onClick={() => setSelectedLanguage(id as 'en' | 'vi')}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedLanguage === id
                  ? `bg-gradient-to-r ${brochure.color} text-white shadow-lg scale-105`
                  : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="text-xl">{brochure.flag}</span>
              <span>{brochure.language}</span>
            </button>
          ))}
        </div>

        {/* Brochure Display */}
        {selectedBrochure && (
          <div className="max-w-5xl mx-auto">
            {/* Card */}
            <div className={`${selectedBrochure.bgColor} rounded-2xl border border-gray-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}>
              {/* Header */}
              <div className={`bg-gradient-to-r ${selectedBrochure.color} p-8 text-white`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{selectedBrochure.title}</h3>
                    <p className="text-white/90 text-lg">{selectedBrochure.description}</p>
                  </div>
                  <FileText className="w-16 h-16 opacity-20" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12">
                {/* Page Counter */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm font-semibold text-gray-600">
                    Page <span className="text-brand-orange-primary font-bold">{selectedImageIndex + 1}</span> of <span className="font-bold">{selectedBrochure.pages}</span>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                      disabled={selectedImageIndex === 0}
                      className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(Math.min(selectedBrochure.pages - 1, selectedImageIndex + 1))}
                      disabled={selectedImageIndex === selectedBrochure.pages - 1}
                      className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                    >
                      Next →
                    </button>
                  </div>
                </div>

                {/* Image Display */}
                <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden mb-6 shadow-sm">
                  <div className="relative w-full bg-gray-100 flex items-center justify-center min-h-96">
                    <Image
                      src={currentImagePath}
                      alt={`${selectedBrochure.title} - Page ${selectedImageIndex + 1}`}
                      width={800}
                      height={1100}
                      priority
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                <div className="mb-8">
                  <p className="text-sm font-semibold text-gray-600 mb-3">Quick Navigation</p>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {Array.from({ length: selectedBrochure.pages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                          selectedImageIndex === index
                            ? `border-${selectedBrochure.color.split('-')[1]}-500 ring-2 ring-offset-1`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={`/brochures/${selectedBrochure.filePrefix}-page-${index + 1}.png`}
                          alt={`Page ${index + 1}`}
                          width={100}
                          height={140}
                          className="w-full h-auto"
                        />
                        <p className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
                          {index + 1}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Download Button */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = currentImagePath
                      link.download = `${selectedBrochure.filePrefix}-page-${selectedImageIndex + 1}.png`
                      link.click()
                    }}
                    className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r ${selectedBrochure.color} text-white font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}
                  >
                    <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span>Download This Page</span>
                  </button>
                </div>

                {/* Features */}
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${selectedBrochure.bgColor} mb-4`}>
                      <FileText className={`w-6 h-6 ${selectedBrochure.iconColor}`} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Comprehensive</h4>
                    <p className="text-sm text-gray-600">{selectedBrochure.pages} pages of detailed content</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${selectedBrochure.bgColor} mb-4`}>
                      <Globe className={`w-6 h-6 ${selectedBrochure.iconColor}`} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Professional</h4>
                    <p className="text-sm text-gray-600">High-quality documentation of our operations</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${selectedBrochure.bgColor} mb-4`}>
                      <ZoomIn className={`w-6 h-6 ${selectedBrochure.iconColor}`} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Clear & Readable</h4>
                    <p className="text-sm text-gray-600">High-resolution images for easy viewing</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
              <p className="text-gray-700">
                <span className="font-semibold text-blue-600">Note:</span> You can browse through all pages using the navigation buttons or click on the thumbnails below to jump to a specific page. Each page can be downloaded individually.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Interested in Our Services?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Download our brochure and contact us to learn how ICONIC LOGISTICS can help your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-brand-orange-primary to-brand-orange-dark text-white font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
}
