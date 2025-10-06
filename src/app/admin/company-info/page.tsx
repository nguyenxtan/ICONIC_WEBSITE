import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { revalidatePath } from 'next/cache'

export default async function AdminCompanyInfoPage() {
  const companyInfo = await prisma.companyInfo.findFirst()

  async function updateCompanyInfo(formData: FormData) {
    'use server'

    const data = {
      nameVi: formData.get('nameVi') as string,
      nameEn: formData.get('nameEn') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      address: formData.get('address') as string,
      vision: formData.get('vision') as string,
      mission: formData.get('mission') as string,
    }

    if (companyInfo) {
      await prisma.companyInfo.update({
        where: { id: companyInfo.id },
        data,
      })
    } else {
      await prisma.companyInfo.create({ data })
    }

    revalidatePath('/admin/company-info')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Quản Lý Thông Tin Công Ty
      </h1>

      <form action={updateCompanyInfo} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông Tin Cơ Bản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nameVi">Tên công ty (Tiếng Việt) *</Label>
              <Input
                id="nameVi"
                name="nameVi"
                defaultValue={companyInfo?.nameVi}
                required
                placeholder="CÔNG TY TNHH ICONIC LOGISTICS"
              />
            </div>

            <div>
              <Label htmlFor="nameEn">Tên công ty (Tiếng Anh) *</Label>
              <Input
                id="nameEn"
                name="nameEn"
                defaultValue={companyInfo?.nameEn}
                required
                placeholder="ICONIC LOGISTICS CO., LTD"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={companyInfo?.phone}
                  required
                  placeholder="0986066174"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={companyInfo?.email}
                  required
                  placeholder="info@iconiclogs.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Địa chỉ *</Label>
              <Textarea
                id="address"
                name="address"
                defaultValue={companyInfo?.address}
                required
                rows={3}
                placeholder="25/49 Đường 6, Khu phố 26, Phường Hiệp Bình Chánh, Thủ Đức, TP.HCM"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tầm Nhìn & Sứ Mệnh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="vision">Tầm nhìn *</Label>
              <Textarea
                id="vision"
                name="vision"
                defaultValue={companyInfo?.vision}
                required
                rows={5}
                placeholder="Tầm nhìn của công ty..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Mô tả tầm nhìn dài hạn của công ty
              </p>
            </div>

            <div>
              <Label htmlFor="mission">Sứ mệnh *</Label>
              <Textarea
                id="mission"
                name="mission"
                defaultValue={companyInfo?.mission}
                required
                rows={5}
                placeholder="Sứ mệnh của công ty..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Mô tả sứ mệnh và mục tiêu của công ty
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="bg-brand-orange-primary hover:bg-brand-orange-dark"
          >
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </div>
  )
}
