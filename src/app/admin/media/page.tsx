'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Upload, Trash2, Copy, ImageIcon } from 'lucide-react'
import Image from 'next/image'

export const runtime = 'edge'

interface Media {
  id: string
  filename: string
  url: string
  alt: string | null
  size: number | null
  mimeType: string | null
  createdAt: string
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchMedia()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchMedia() {
    try {
      const res = await fetch('/api/media')
      const data = await res.json()
      setMedia(data.media || [])
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể tải danh sách media',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', files[0])

      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        toast({
          title: 'Thành công',
          description: 'Upload file thành công!',
        })
        fetchMedia()
      } else {
        toast({
          title: 'Lỗi',
          description: data.error || 'Không thể upload file',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Có lỗi xảy ra khi upload',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bạn có chắc muốn xóa file này?')) return

    try {
      const res = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        toast({
          title: 'Đã xóa',
          description: 'Xóa file thành công',
        })
        fetchMedia()
      } else {
        toast({
          title: 'Lỗi',
          description: 'Không thể xóa file',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Có lỗi xảy ra',
        variant: 'destructive',
      })
    }
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    toast({
      title: 'Đã copy',
      description: 'URL đã được copy vào clipboard',
    })
  }

  function formatSize(bytes: number | null) {
    if (!bytes) return 'N/A'
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản Lý Media</h1>
        <div>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
          />
          <label htmlFor="file-upload">
            <Button
              className="bg-brand-orange-primary hover:bg-brand-orange-dark cursor-pointer"
              disabled={uploading}
              asChild
            >
              <span>
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Đang upload...' : 'Upload Hình Ảnh'}
              </span>
            </Button>
          </label>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thư Viện Hình Ảnh ({media.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8 text-gray-500">Đang tải...</p>
          ) : media.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">
                Chưa có hình ảnh nào. Upload hình ảnh đầu tiên!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item) => (
                <div
                  key={item.id}
                  className="group relative border rounded-lg overflow-hidden hover:border-brand-orange-primary transition-colors"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    <Image
                      src={item.url}
                      alt={item.alt || item.filename}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <p className="text-sm font-medium truncate" title={item.filename}>
                      {item.filename}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatSize(item.size)}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs"
                        onClick={() => copyUrl(item.url)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy URL
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Hướng dẫn sử dụng</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click &ldquo;Upload Hình Ảnh&rdquo; để upload file mới (tối đa 5MB)</li>
          <li>• Hỗ trợ định dạng: JPG, PNG, GIF, WebP</li>
          <li>• Click &ldquo;Copy URL&rdquo; để copy đường dẫn hình ảnh</li>
          <li>• Sử dụng URL này trong bài viết, dịch vụ, v.v.</li>
        </ul>
      </div>
    </div>
  )
}
