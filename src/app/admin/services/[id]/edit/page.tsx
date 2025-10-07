import { prisma } from '@/lib/db'
import { notFound, redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const runtime = 'nodejs'

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const service = await prisma.service.findUnique({
    where: { id },
  })

  if (!service) {
    notFound()
  }

  async function updateService(formData: FormData) {
    'use server'

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
    const content = formData.get('content') as string
    const icon = formData.get('icon') as string
    const sortOrder = parseInt(formData.get('sortOrder') as string)
    const visible = formData.get('visible') === 'on'

    await prisma.service.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        content,
        icon,
        sortOrder,
        visible,
      },
    })

    redirect('/admin/services')
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/services"
          className="inline-flex items-center text-sm text-gray-600 hover:text-brand-orange-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Quay lại danh sách
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Chỉnh Sửa Dịch Vụ: {service.title}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Thông Tin Dịch Vụ</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateService} className="space-y-6">
            <div>
              <Label htmlFor="title">Tiêu đề *</Label>
              <Input
                id="title"
                name="title"
                defaultValue={service.title}
                required
                placeholder="Vận Chuyển Đường Biển"
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug (URL) *</Label>
              <Input
                id="slug"
                name="slug"
                defaultValue={service.slug}
                required
                placeholder="van-chuyen-duong-bien"
              />
              <p className="text-xs text-gray-500 mt-1">
                Đường dẫn URL: /services/{service.slug}
              </p>
            </div>

            <div>
              <Label htmlFor="description">Mô tả ngắn *</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={service.description}
                required
                rows={3}
                placeholder="Mô tả ngắn về dịch vụ..."
              />
            </div>

            <div>
              <Label htmlFor="content">Nội dung chi tiết</Label>
              <Textarea
                id="content"
                name="content"
                defaultValue={service.content || ''}
                rows={10}
                placeholder="Nội dung chi tiết về dịch vụ..."
              />
            </div>

            <div>
              <Label htmlFor="icon">Icon (tên Lucide icon)</Label>
              <Input
                id="icon"
                name="icon"
                defaultValue={service.icon || ''}
                placeholder="Ship, Truck, Package..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Xem danh sách icon tại:{' '}
                <a
                  href="https://lucide.dev/icons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange-primary hover:underline"
                >
                  lucide.dev/icons
                </a>
              </p>
            </div>

            <div>
              <Label htmlFor="sortOrder">Thứ tự sắp xếp</Label>
              <Input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue={service.sortOrder}
                min={0}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="visible"
                name="visible"
                defaultChecked={service.visible}
                className="h-4 w-4 rounded border-gray-300 text-brand-orange-primary focus:ring-brand-orange-primary"
              />
              <Label htmlFor="visible" className="cursor-pointer">
                Hiển thị trên website
              </Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="bg-brand-orange-primary hover:bg-brand-orange-dark"
              >
                Lưu thay đổi
              </Button>
              <Link href="/admin/services">
                <Button type="button" variant="outline">
                  Hủy
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
