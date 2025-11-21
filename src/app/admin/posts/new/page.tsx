'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Sparkles,
  Eye,
  Save,
  ArrowLeft,
  Loader2,
  FileText,
  Wand2,
  Lightbulb,
} from 'lucide-react'

export default function NewPostPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showAiDialog, setShowAiDialog] = useState(false)

  const [aiPrompt, setAiPrompt] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    coverImageUrl: '',
    contentMd: '',
    status: 'DRAFT',
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: generateSlug(value),
    })
  }

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập prompt',
        variant: 'destructive',
      })
      return
    }

    setAiLoading(true)

    try {
      const response = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          type: 'blog',
          language: 'vi',
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate content')
      }

      const data = await response.json()

      // Update form with AI generated content
      setFormData({
        title: data.title || formData.title,
        slug: data.slug || generateSlug(data.title || formData.title),
        summary: data.summary || formData.summary,
        coverImageUrl: data.coverImageUrl || formData.coverImageUrl,
        contentMd: data.content || data.contentMd || formData.contentMd,
        status: 'DRAFT',
      })

      toast({
        title: 'Thành công',
        description: 'Đã tạo nội dung với AI!',
      })

      setShowAiDialog(false)
      setAiPrompt('')
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message || 'Không thể tạo nội dung với AI',
        variant: 'destructive',
      })
    } finally {
      setAiLoading(false)
    }
  }

  const handleSubmit = async (publishNow = false) => {
    if (!formData.title || !formData.slug || !formData.contentMd) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng điền đầy đủ thông tin bắt buộc',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: publishNow ? 'PUBLISHED' : 'DRAFT',
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create post')
      }

      toast({
        title: 'Thành công',
        description: publishNow
          ? 'Đã tạo và xuất bản tin tức!'
          : 'Đã lưu tin tức dưới dạng nháp!',
      })

      router.push('/admin/posts')
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message || 'Không thể tạo tin tức',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Button
            variant="ghost"
            onClick={() => router.push('/admin/posts')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Tạo Tin Tức Mới</h1>
          <p className="text-gray-600 mt-1">
            Sử dụng AI để tạo nội dung hoặc viết thủ công
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(true)}
            disabled={!formData.contentMd}
          >
            <Eye className="mr-2 h-4 w-4" />
            Xem trước
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowAiDialog(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Tạo bằng AI
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Thông Tin Cơ Bản</CardTitle>
            <CardDescription>
              Nhập tiêu đề và các thông tin chính của bài viết
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">
                Tiêu đề <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Nhập tiêu đề bài viết..."
              />
            </div>

            <div>
              <Label htmlFor="slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="url-cua-bai-viet"
              />
              <p className="text-xs text-gray-500 mt-1">
                URL: /news/{formData.slug || 'url-cua-bai-viet'}
              </p>
            </div>

            <div>
              <Label htmlFor="summary">Mô tả ngắn</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                placeholder="Mô tả ngắn gọn về bài viết (hiển thị trong danh sách)..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="coverImage">Ảnh bìa URL</Label>
              <Input
                id="coverImage"
                value={formData.coverImageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, coverImageUrl: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
              />
              {formData.coverImageUrl && (
                <div className="mt-2">
                  <img
                    src={formData.coverImageUrl}
                    alt="Cover preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = ''
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Nội dung bài viết</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAiDialog(true)}
              >
                <Wand2 className="mr-2 h-4 w-4" />
                AI Magic
              </Button>
            </CardTitle>
            <CardDescription>
              Viết nội dung bằng Markdown hoặc dùng AI để tạo tự động
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="content">
                Nội dung (Markdown) <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="content"
                value={formData.contentMd}
                onChange={(e) =>
                  setFormData({ ...formData, contentMd: e.target.value })
                }
                placeholder="# Tiêu đề chính&#10;&#10;Nội dung bài viết ở đây...&#10;&#10;## Tiêu đề phụ&#10;&#10;Đoạn văn..."
                rows={20}
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                <a
                  href="https://www.markdownguide.org/basic-syntax/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Hướng dẫn Markdown →
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => router.push('/admin/posts')}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSubmit(false)}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Lưu nháp
              </>
            )}
          </Button>
          <Button
            onClick={() => handleSubmit(true)}
            disabled={loading}
            className="bg-gradient-to-r from-brand-orange-primary to-brand-orange-dark"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xuất bản...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Xuất bản ngay
              </>
            )}
          </Button>
        </div>
      </div>

      {/* AI Generate Dialog */}
      <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Tạo Nội Dung Với AI
            </DialogTitle>
            <DialogDescription>
              Mô tả nội dung bạn muốn tạo, AI sẽ viết bài cho bạn
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="ai-prompt">Yêu cầu của bạn</Label>
              <Textarea
                id="ai-prompt"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ví dụ: Viết bài về xu hướng logistics xanh tại Việt Nam năm 2024, tập trung vào công nghệ và giải pháp bền vững..."
                rows={6}
                className="mt-2"
              />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 flex-shrink-0" />
                <span><strong>Mẹo:</strong> Càng mô tả chi tiết, AI càng tạo ra
                nội dung chất lượng cao. Hãy nêu rõ:</span>
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
                <li>Chủ đề chính của bài viết</li>
                <li>Các điểm cần đề cập</li>
                <li>Phong cách viết (chuyên nghiệp, dễ hiểu, ...)</li>
                <li>Độ dài mong muốn</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAiDialog(false)}
              disabled={aiLoading}
            >
              Hủy
            </Button>
            <Button
              onClick={handleAiGenerate}
              disabled={aiLoading || !aiPrompt.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              {aiLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang tạo...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Tạo nội dung
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Xem Trước Bài Viết</DialogTitle>
            <DialogDescription>
              Đây là cách bài viết sẽ hiển thị cho người đọc
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            {formData.coverImageUrl && (
              <img
                src={formData.coverImageUrl}
                alt={formData.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <h1 className="text-4xl font-bold mb-4">{formData.title}</h1>
            {formData.summary && (
              <p className="text-lg text-gray-600 mb-6">{formData.summary}</p>
            )}
            <div className="text-gray-700 leading-relaxed space-y-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-6">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-5">{children}</h3>,
                  h4: ({ children }) => <h4 className="text-xl font-bold text-gray-900 mb-2 mt-4">{children}</h4>,
                  p: ({ children }) => <p className="text-gray-700 text-base leading-8">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 text-gray-700">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-gray-700">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-700 ml-2">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-brand-orange-primary pl-6 py-2 my-4 bg-brand-orange-primary/5 italic text-gray-700">
                      {children}
                    </blockquote>
                  ),
                  code: ({ className, children }) => {
                    const isCodeBlock = className?.startsWith('language-')
                    return isCodeBlock ? (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono">
                        <code className={className}>{children}</code>
                      </pre>
                    ) : (
                      <code className="bg-gray-100 text-brand-orange-primary px-2 py-1 rounded text-sm font-mono">
                        {children}
                      </code>
                    )
                  },
                  a: ({ href, children }) => (
                    <a href={href} className="text-brand-orange-primary hover:text-brand-orange-dark underline transition-colors">
                      {children}
                    </a>
                  ),
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt} className="w-full h-auto rounded-lg my-6 border border-gray-200" />
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6 border border-gray-300 rounded-lg">
                      <table className="w-full border-collapse">{children}</table>
                    </div>
                  ),
                  th: ({ children, align }) => (
                    <th className={`border-b-2 border-gray-300 bg-brand-orange-primary/10 px-6 py-4 font-bold text-gray-900 ${
                      align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
                    }`}>
                      {children}
                    </th>
                  ),
                  td: ({ children, align }) => (
                    <td className={`border-b border-gray-200 px-6 py-4 text-gray-700 ${
                      align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
                    }`}>{children}</td>
                  ),
                  hr: () => <hr className="my-8 border-gray-300" />,
                }}
              >
                {formData.contentMd}
              </ReactMarkdown>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
