import { generateMetadata as genMeta } from '@/lib/seo'
import { prisma } from '@/lib/db'
import { Building2, Users, Award, Target, Lightbulb, Compass, CheckCircle2, Zap } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const metadata = genMeta({
  title: 'Về Chúng Tôi',
  description: 'CÔNG TY TNHH ICONIC LOGISTICS - Đối tác logistics đáng tin cậy tại Việt Nam',
  path: '/about',
})

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function AboutPage() {
  const companyInfo = await prisma.companyInfo.findFirst()

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Về Chúng Tôi</h1>

          <div>
            {/* Company Header */}
            <div className="bg-brand-orange-primary/5 border-l-4 border-brand-orange-primary p-6 mb-8">
              <h2 className="text-2xl font-bold text-brand-orange-primary mb-2">
                {companyInfo?.nameVi || 'CÔNG TY TNHH ICONIC LOGISTICS'}
              </h2>
              <p className="text-lg text-gray-700 mb-1">
                {companyInfo?.nameEn || 'ICONIC LOGISTICS VIETNAM COMPANY LIMITED'}
              </p>
              <p className="text-sm text-gray-600">
                ICONIC LOGISTICS VIETNAM CO., LTD
              </p>
            </div>

            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="h-8 w-8 text-brand-orange-primary" />
                <h2 className="text-2xl font-bold">Giới Thiệu</h2>
              </div>
              {companyInfo?.introduction ? (
                <div className="text-gray-700 leading-relaxed space-y-3">
                  {companyInfo.introduction.split('\n\n').map((para, idx) => (
                    <p key={idx} className="text-base">
                      {para.trim()}
                    </p>
                  ))}
                </div>
              ) : null}
            </section>

            {/* Vision */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Compass className="h-8 w-8 text-brand-orange-primary" />
                <h2 className="text-2xl font-bold">Tầm Nhìn</h2>
              </div>
              {companyInfo?.vision ? (
                <div className="text-gray-700 leading-relaxed space-y-3">
                  {companyInfo.vision.split('\n\n').map((para, idx) => (
                    <p key={idx} className="text-base">
                      {para.trim()}
                    </p>
                  ))}
                </div>
              ) : null}
            </section>

            {/* Mission */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-8 w-8 text-brand-orange-primary" />
                <h2 className="text-2xl font-bold">Sứ Mệnh</h2>
              </div>
              {companyInfo?.mission ? (
                <div className="text-gray-700 leading-relaxed space-y-3">
                  {companyInfo.mission.split('\n\n').map((para, idx) => (
                    <p key={idx} className="text-base">
                      {para.trim()}
                    </p>
                  ))}
                </div>
              ) : null}
            </section>

            {/* Core Values */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-8 w-8 text-brand-orange-primary" />
                <h2 className="text-2xl font-bold">Giá Trị Cốt Lõi</h2>
              </div>
              {companyInfo?.coreValues ? (
                <div className="text-gray-700 leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                    p: ({ children }) => <p className="mb-4">{children}</p>,
                    strong: ({ children }) => <strong className="text-brand-orange-primary font-bold">{children}</strong>,
                  }}>
                    {companyInfo.coreValues}
                  </ReactMarkdown>
                </div>
              ) : null}
            </section>

            {/* Goals */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-8 w-8 text-brand-orange-primary" />
                <h2 className="text-2xl font-bold">Mục Tiêu Phát Triển</h2>
              </div>
              {companyInfo?.goals ? (
                <div className="text-gray-700 leading-relaxed space-y-3">
                  {companyInfo.goals.split('\n\n').map((para, idx) => (
                    <p key={idx} className="text-base">
                      {para.trim()}
                    </p>
                  ))}
                </div>
              ) : null}
            </section>

            {/* Commitments */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-8 w-8 text-brand-orange-primary" />
                <h2 className="text-2xl font-bold">Cam Kết Với Khách Hàng</h2>
              </div>
              {companyInfo?.commitments ? (
                <div className="text-gray-700 leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                    p: ({ children }) => <p className="mb-3">{children}</p>,
                    strong: ({ children }) => <strong className="text-brand-orange-primary font-bold">{children}</strong>,
                    ul: ({ children }) => <ul className="list-disc list-inside space-y-2 ml-4">{children}</ul>,
                    li: ({ children }) => <li className="text-gray-700">{children}</li>,
                  }}>
                    {companyInfo.commitments}
                  </ReactMarkdown>
                </div>
              ) : null}
            </section>

            {/* Strengths */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-8 w-8 text-brand-orange-primary" />
                <h2 className="text-2xl font-bold">Năng Lực & Thế Mạnh</h2>
              </div>
              {companyInfo?.strengths ? (
                <div className="text-gray-700 leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                    p: ({ children }) => <p className="mb-4">{children}</p>,
                    strong: ({ children }) => <strong className="text-brand-orange-primary font-bold">{children}</strong>,
                  }}>
                    {companyInfo.strengths}
                  </ReactMarkdown>
                </div>
              ) : null}
            </section>

            {/* Contact */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-brand-orange-primary" />
                <h2 className="text-2xl font-bold">Thông Tin Liên Hệ</h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <p>
                  <strong>Địa chỉ:</strong>{' '}
                  {companyInfo?.address ||
                    '25/49 Đường 6, Khu phố 26, Phường Hiệp Bình, TP.HCM, Việt Nam'}
                </p>
                <p>
                  <strong>Điện thoại:</strong>{' '}
                  <a
                    href={`tel:${companyInfo?.phone || '0986066174'}`}
                    className="text-brand-orange-primary hover:underline"
                  >
                    {companyInfo?.phone || '0986066174'}
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a
                    href={`mailto:${companyInfo?.email || 'info@iconiclogs.com'}`}
                    className="text-brand-orange-primary hover:underline"
                  >
                    {companyInfo?.email || 'info@iconiclogs.com'}
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
