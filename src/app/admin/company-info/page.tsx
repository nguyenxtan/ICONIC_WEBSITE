import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminCompanyInfoPage() {
  const companyInfo = await prisma.companyInfo.findFirst()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Thông Tin Công Ty
      </h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông Tin Cơ Bản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-gray-600">Tên tiếng Việt</div>
              <div className="font-semibold">{companyInfo?.nameVi}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Tên tiếng Anh</div>
              <div className="font-semibold">{companyInfo?.nameEn}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Điện thoại</div>
              <div className="font-semibold">{companyInfo?.phone}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Email</div>
              <div className="font-semibold">{companyInfo?.email}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Địa chỉ</div>
              <div className="font-semibold">{companyInfo?.address}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tầm Nhìn</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{companyInfo?.vision}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sứ Mệnh</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{companyInfo?.mission}</p>
          </CardContent>
        </Card>

        <p className="text-sm text-gray-500">
          Thông tin công ty được quản lý qua seed data. Sử dụng Prisma Studio để
          chỉnh sửa.
        </p>
      </div>
    </div>
  )
}
