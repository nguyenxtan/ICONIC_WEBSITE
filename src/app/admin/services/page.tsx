import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Quản Lý Dịch Vụ</h1>

      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Dịch Vụ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-sm text-gray-600">Slug: {service.slug}</p>
                  <p className="text-sm text-gray-600">
                    Thứ tự: {service.sortOrder} | Hiển thị:{' '}
                    {service.visible ? 'Có' : 'Không'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Dịch vụ được quản lý qua seed data. Sử dụng Prisma Studio để chỉnh sửa.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
