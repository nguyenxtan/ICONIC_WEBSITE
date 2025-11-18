'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Eye, Trash2 } from 'lucide-react'

export const runtime = 'nodejs'

interface Props {
  params: Promise<{ id: string }>
}

export default function EditPostPage({ params }: Props) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    coverImageUrl: '',
    contentMd: '',
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED',
  })

  useEffect(() => {
    fetch(`/api/admin/posts/${resolvedParams.id}`)
      .then((res) => res.json())
      .then((post) => {
        setFormData({
          title: post.title,
          slug: post.slug,
          summary: post.summary || '',
          coverImageUrl: post.coverImageUrl || '',
          contentMd: post.contentMd,
          status: post.status,
        })
      })
  }, [resolvedParams.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/posts/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Thành công',
          description: 'Tin tức đã được cập nhật',
        })
        router.push('/admin/posts')
        router.refresh()
      } else {
        throw new Error('Failed to update post')
      }
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể cập nhật tin tức',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc muốn xóa tin tức này?')) return

    try {
      const response = await fetch(`/api/admin/posts/${resolvedParams.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Thành công',
          description: 'Tin tức đã được xóa',
        })
        router.push('/admin/posts')
        router.refresh()
      }
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể xóa tin tức',
        variant: 'destructive',
      })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sửa Tin Tức</h1>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowPreview(true)}
          disabled={!formData.contentMd}
        >
          <Eye className="mr-2 h-4 w-4" />
          Xem trước
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Thông Tin Cơ Bản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
              />
            </div>

            <div>
              <Label htmlFor="summary">Tóm tắt</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, summary: e.target.value }))
                }
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="coverImageUrl">URL Ảnh Bìa</Label>
              <Input
                id="coverImageUrl"
                type="url"
                value={formData.coverImageUrl}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    coverImageUrl: e.target.value,
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Nội Dung (Markdown)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              required
              value={formData.contentMd}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, contentMd: e.target.value }))
              }
              rows={20}
              className="font-mono"
            />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Xuất Bản</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="DRAFT"
                  checked={formData.status === 'DRAFT'}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as 'DRAFT',
                    }))
                  }
                />
                <span>Lưu nháp</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="PUBLISHED"
                  checked={formData.status === 'PUBLISHED'}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as 'PUBLISHED',
                    }))
                  }
                />
                <span>Xuất bản</span>
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Đang lưu...' : 'Cập Nhật'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Hủy
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="ml-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Xóa
          </Button>
        </div>
      </form>

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
                  code: ({ inline, children }) =>
                    inline ? (
                      <code className="bg-gray-100 text-brand-orange-primary px-2 py-1 rounded text-sm font-mono">
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono">
                        <code>{children}</code>
                      </pre>
                    ),
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
