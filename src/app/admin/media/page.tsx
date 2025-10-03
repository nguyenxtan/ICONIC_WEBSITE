import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminMediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Quản Lý Media</h1>

      <Card>
        <CardHeader>
          <CardTitle>Thư Viện Media</CardTitle>
        </CardHeader>
        <CardContent>
          {media.length === 0 ? (
            <p className="text-gray-500">Chưa có media nào</p>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {media.map((item) => (
                <div key={item.id} className="border rounded-lg p-2">
                  <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
                    {item.url && (
                      <img
                        src={item.url}
                        alt={item.alt || ''}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {item.alt || 'No alt text'}
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="text-sm text-gray-500 mt-4">
            Upload media qua URL trong form tạo/sửa tin tức hoặc sử dụng external
            service.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
