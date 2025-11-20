import { generateMetadata as genMeta } from '@/lib/seo'
import { prisma } from '@/lib/db'
import { Eye, Target, Award, Lightbulb, CheckCircle2, Zap } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const metadata = genMeta({
  title: 'Tầm Nhìn & Sứ Mệnh',
  description: 'Tầm nhìn, sứ mệnh, giá trị cốt lõi và cam kết của ICONIC LOGISTICS VIETNAM',
  path: '/vision-mission',
})

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function VisionMissionPage() {
  const companyInfo = await prisma.companyInfo.findFirst()

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Tầm Nhìn & Sứ Mệnh
          </h1>

          <div className="space-y-12">
            {/* Vision */}
            <section className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8 border border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-blue-900">Tầm Nhìn</h2>
              </div>
              <div className="text-lg text-gray-800 leading-relaxed space-y-3">
                {companyInfo?.vision ? (
                  companyInfo.vision.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para.trim()}</p>
                  ))
                ) : (
                  <p>Trở thành đối tác logistics đáng tin cậy hàng đầu tại Việt Nam</p>
                )}
              </div>
            </section>

            {/* Mission */}
            <section className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-8 border border-emerald-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-emerald-600 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-emerald-900">Sứ Mệnh</h2>
              </div>
              <div className="text-lg text-gray-800 leading-relaxed space-y-3">
                {companyInfo?.mission ? (
                  companyInfo.mission.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para.trim()}</p>
                  ))
                ) : (
                  <p>Cung cấp dịch vụ logistics chất lượng cao, an toàn và hiệu quả</p>
                )}
              </div>
            </section>

            {/* Core Values */}
            <section className="bg-white border-2 border-brand-orange-primary/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-full bg-brand-orange-primary flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Giá Trị Cốt Lõi</h2>
              </div>
              {companyInfo?.coreValues ? (
                <div className="text-gray-700 leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className="mb-4">{children}</p>,
                      strong: ({ children }) => (
                        <strong className="text-brand-orange-primary font-bold">{children}</strong>
                      ),
                    }}
                  >
                    {companyInfo.coreValues}
                  </ReactMarkdown>
                </div>
              ) : null}
            </section>

            {/* Goals */}
            <section className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-8 border border-purple-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-purple-900">Mục Tiêu Phát Triển</h2>
              </div>
              <div className="text-lg text-gray-800 leading-relaxed space-y-3">
                {companyInfo?.goals ? (
                  companyInfo.goals.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para.trim()}</p>
                  ))
                ) : null}
              </div>
            </section>

            {/* Commitments */}
            <section className="bg-white border-2 border-brand-orange-primary/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-full bg-brand-orange-primary flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Cam Kết Với Khách Hàng</h2>
              </div>
              {companyInfo?.commitments ? (
                <div className="text-gray-700 leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className="mb-3">{children}</p>,
                      strong: ({ children }) => (
                        <strong className="text-brand-orange-primary font-bold">{children}</strong>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">{children}</ul>
                      ),
                      li: ({ children }) => <li className="text-gray-700">{children}</li>,
                    }}
                  >
                    {companyInfo.commitments}
                  </ReactMarkdown>
                </div>
              ) : null}
            </section>

            {/* Strengths */}
            <section className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-8 border border-orange-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-full bg-orange-600 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-orange-900">Năng Lực & Thế Mạnh</h2>
              </div>
              {companyInfo?.strengths ? (
                <div className="text-gray-700 leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className="mb-4">{children}</p>,
                      strong: ({ children }) => (
                        <strong className="text-orange-700 font-bold">{children}</strong>
                      ),
                    }}
                  >
                    {companyInfo.strengths}
                  </ReactMarkdown>
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
