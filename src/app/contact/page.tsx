'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function ContactPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Gửi thành công!',
          description: 'Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.',
        })
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        })
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể gửi form. Vui lòng thử lại sau.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Liên Hệ</h1>
          <p className="text-xl text-gray-600">
            Hãy để lại thông tin, chúng tôi sẽ liên hệ lại ngay
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <MapPin className="h-8 w-8 text-brand-orange-primary mb-2" />
              <CardTitle>Địa Chỉ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                25/49 Đường 6, Khu phố 26
                <br />
                Phường Hiệp Bình
                <br />
                TP.HCM, Việt Nam
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Phone className="h-8 w-8 text-brand-orange-primary mb-2" />
              <CardTitle>Điện Thoại</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href="tel:0986066174"
                className="text-brand-orange-primary hover:underline"
              >
                0986066174
              </a>
              <p className="text-sm text-gray-600 mt-2">
                Thứ 2 - Thứ 6: 8:00 - 17:30
                <br />
                Thứ 7: 8:00 - 12:00
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Mail className="h-8 w-8 text-brand-orange-primary mb-2" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:info@iconiclogs.com"
                className="text-brand-orange-primary hover:underline"
              >
                info@iconiclogs.com
              </a>
              <p className="text-sm text-gray-600 mt-2">
                Phản hồi trong vòng 24h
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gửi Tin Nhắn</CardTitle>
            <CardDescription>
              Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại sớm nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">
                    Họ và tên <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0912345678"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Công ty</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Tên công ty"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message">
                  Nội dung <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mô tả chi tiết yêu cầu của bạn..."
                  rows={6}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full md:w-auto">
                {loading ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
