import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Pencil, Eye, EyeOff } from 'lucide-react'

export const runtime = 'edge'

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quản Lý Dịch Vụ</h1>
        <Link href="/admin/services/new">
          <Button className="bg-brand-orange-primary hover:bg-brand-orange-dark">
            <Plus className="h-4 w-4 mr-2" />
            Thêm Dịch Vụ Mới
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Dịch Vụ ({services.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Chưa có dịch vụ nào. Nhấn &ldquo;Thêm Dịch Vụ Mới&rdquo; để tạo.
              </p>
            ) : (
              services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:border-brand-orange-primary transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{service.title}</h3>
                      {service.visible ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs text-gray-500">Slug: {service.slug}</span>
                      <span className="text-xs text-gray-500">Thứ tự: {service.sortOrder}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/services/${service.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4 mr-1" />
                        Chỉnh sửa
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
