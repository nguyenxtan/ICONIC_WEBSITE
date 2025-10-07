'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { slugify } from '@/lib/utils'

export const runtime = 'nodejs'

export default function NewPostPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    coverImageUrl: '',
    contentMd: '',
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED',
  })

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: slugify(title),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Thành công',
          description: 'Tin tức đã được tạo',
        })
        router.push('/admin/posts')
        router.refresh()
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create post')
      }
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: error instanceof Error ? error.message : 'Không thể tạo tin tức',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Thêm Tin Tức Mới</h1>

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
                onChange={(e) => handleTitleChange(e.target.value)}
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
                placeholder="https://example.com/image.jpg"
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
              placeholder="# Tiêu đề&#10;&#10;Nội dung markdown..."
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
                <span>Xuất bản ngay</span>
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu Tin Tức'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  )
}
