'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

export const runtime = 'edge'

interface Props {
  params: Promise<{ id: string }>
}

export default function EditPostPage({ params }: Props) {
  const resolvedParams = use(params)
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sửa Tin Tức</h1>

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
            Xóa
          </Button>
        </div>
      </form>
    </div>
  )
}
