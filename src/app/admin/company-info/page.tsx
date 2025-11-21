import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { revalidatePath } from 'next/cache'
import { Building2, Phone, Mail, MapPin, Eye, Target, Save } from 'lucide-react'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-brand-orange-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-orange-primary to-brand-orange-dark bg-clip-text text-transparent">
              Quản Lý Thông Tin Công Ty
            </h1>
          </div>
          <p className="text-gray-600">Cập nhật thông tin cơ bản, tầm nhìn và sứ mệnh công ty</p>
        </div>
      </div>

      <form action={updateCompanyInfo} className="space-y-6">
        {/* Basic Information Card */}
        <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="bg-gradient-to-r from-orange-50/50 via-white to-white border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Building2 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Thông Tin Cơ Bản</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Tên công ty và thông tin liên hệ</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="nameVi" className="font-semibold text-gray-800 flex items-center gap-2">
                  <span>Tên công ty (Tiếng Việt)</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nameVi"
                  name="nameVi"
                  defaultValue={companyInfo?.nameVi || ''}
                  required
                  placeholder="CÔNG TY TNHH ICONIC LOGISTICS"
                  className="border-2 border-gray-200 focus:border-brand-orange-primary focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameEn" className="font-semibold text-gray-800 flex items-center gap-2">
                  <span>Tên công ty (Tiếng Anh)</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nameEn"
                  name="nameEn"
                  defaultValue={companyInfo?.nameEn || ''}
                  required
                  placeholder="ICONIC LOGISTICS CO., LTD"
                  className="border-2 border-gray-200 focus:border-brand-orange-primary focus:ring-0"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-semibold text-gray-800 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Số điện thoại</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={companyInfo?.phone || ''}
                  required
                  placeholder="0839037568"
                  className="border-2 border-gray-200 focus:border-brand-orange-primary focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold text-gray-800 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span>Email</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={companyInfo?.email || ''}
                  required
                  placeholder="Info@iconiclogs.com"
                  className="border-2 border-gray-200 focus:border-brand-orange-primary focus:ring-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Địa chỉ</span>
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="address"
                name="address"
                defaultValue={companyInfo?.address || ''}
                required
                rows={3}
                placeholder="25/49 Đường 6, Khu phố 26, Phường Hiệp Bình Chánh, Thủ Đức, TP.HCM"
                className="border-2 border-gray-200 focus:border-brand-orange-primary focus:ring-0 resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Vision & Mission Card */}
        <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="bg-gradient-to-r from-blue-50/50 via-white to-white border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Tầm Nhìn & Sứ Mệnh</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Định hướng và mục tiêu của công ty</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            <div className="space-y-2">
              <Label htmlFor="vision" className="font-semibold text-gray-800 flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-600" />
                <span>Tầm nhìn</span>
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="vision"
                name="vision"
                defaultValue={companyInfo?.vision || ''}
                required
                rows={5}
                placeholder="Tầm nhìn dài hạn của công ty..."
                className="border-2 border-gray-200 focus:border-brand-orange-primary focus:ring-0 resize-none"
              />
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                ℹ️ Mô tả tầm nhìn dài hạn và định hướng phát triển của công ty
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mission" className="font-semibold text-gray-800 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                <span>Sứ mệnh</span>
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="mission"
                name="mission"
                defaultValue={companyInfo?.mission || ''}
                required
                rows={5}
                placeholder="Sứ mệnh và mục tiêu của công ty..."
                className="border-2 border-gray-200 focus:border-brand-orange-primary focus:ring-0 resize-none"
              />
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                ℹ️ Mô tả sứ mệnh, giá trị cốt lõi và mục tiêu hoạt động của công ty
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="bg-gradient-to-r from-brand-orange-primary to-brand-orange-dark hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Save className="w-5 h-5" />
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </div>
  )
}
