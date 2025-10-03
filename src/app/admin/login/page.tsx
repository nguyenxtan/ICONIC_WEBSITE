'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

export default function AdminLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Đăng nhập thành công',
          description: 'Đang chuyển hướng...',
        })

        // Wait a brief moment to ensure cookie is set
        setTimeout(() => {
          window.location.href = '/admin/dashboard'
        }, 100)
        return
      } else {
        toast({
          title: 'Đăng nhập thất bại',
          description: data.error || 'Email hoặc mật khẩu không đúng',
          variant: 'destructive',
        })
        setLoading(false)
      }
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể kết nối. Vui lòng thử lại sau.',
        variant: 'destructive',
      })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-orange-primary via-brand-orange to-brand-orange-dark p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="ICONIC LOGISTICS"
              width={240}
              height={72}
              className="h-16 w-auto"
              priority
            />
          </div>
          <CardTitle className="text-2xl">ICONIC LOGISTICS Admin</CardTitle>
          <CardDescription>Đăng nhập để quản lý nội dung</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="admin@iconiclogs.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Demo: admin@iconiclogs.com / admin123
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
