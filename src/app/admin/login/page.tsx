'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Lock, Mail } from 'lucide-react'

export const runtime = 'nodejs'

export default function AdminLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
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

      if (response.ok && data.success) {
        toast({
          title: 'Đăng nhập thành công',
          description: 'Đang chuyển hướng...',
        })
        // Redirect to dashboard
        window.location.href = '/admin/dashboard'
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-brand-orange-primary/20 to-gray-50 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-orange-primary/20 to-brand-orange-dark/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-brand-orange-primary/15 to-transparent rounded-full blur-3xl -z-10 animate-pulse" style={{animationDelay: '1s'}} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_1px,transparent_1px)] bg-[length:50px_50px]" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo Section with Animation */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              {/* Animated glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange-primary to-brand-orange-dark rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300 animate-pulse" />

              {/* Logo container */}
              <div className="relative bg-white rounded-full p-8 shadow-2xl border border-orange-100">
                <Image
                  src="/logo.png"
                  alt="ICONIC LOGISTICS"
                  width={420}
                  height={126}
                  className="h-32 w-auto transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Login Card with enhanced styling */}
        <Card className="shadow-2xl border border-orange-100/50 bg-white/97 backdrop-blur-lg hover:shadow-3xl transition-all duration-300">
          <CardHeader className="space-y-4 pb-8 border-b border-gradient-to-r from-orange-100/50 to-transparent">
            <CardTitle className="text-4xl font-bold text-center bg-gradient-to-r from-brand-orange-primary to-brand-orange-dark bg-clip-text text-transparent">
              Admin Panel
            </CardTitle>
            <CardDescription className="text-center text-base text-gray-600 font-medium">
              Quản lý nội dung và cấu hình hệ thống
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-gray-800 font-bold text-sm flex items-center gap-2 uppercase tracking-wider">
                  <Mail className="w-5 h-5 text-brand-orange-primary" />
                  Email
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-orange-primary/20 to-brand-orange-dark/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="admin@iconiclogs.com"
                    className="relative border-2 border-gray-200 focus:border-brand-orange-primary focus:ring-0 text-base py-3 px-4 rounded-xl transition-all duration-300 bg-white/50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-800 font-bold text-sm flex items-center gap-2 uppercase tracking-wider">
                    <Lock className="w-5 h-5 text-brand-orange-primary" />
                    Mật khẩu
                  </Label>
                  <Link
                    href="/admin/forgot-password"
                    className="text-xs font-bold text-brand-orange-primary hover:text-brand-orange-dark hover:underline transition-colors uppercase tracking-wider"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-orange-primary/20 to-brand-orange-dark/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, password: e.target.value }))
                    }
                    placeholder="••••••••"
                    className="relative border-2 border-gray-200 focus:border-brand-orange-primary focus:ring-0 text-base py-3 px-4 rounded-xl transition-all duration-300 bg-white/50 focus:bg-white pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-brand-orange-primary transition-colors duration-200"
                  >
                    {showPassword ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-orange-primary via-brand-orange-dark to-brand-orange-dark hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white font-bold py-3.5 h-auto rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 text-lg uppercase tracking-wider"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Đang xử lý...
                  </span>
                ) : (
                  'Đăng Nhập'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Cần hỗ trợ?{' '}
            <a href="mailto:info@iconiclogs.com" className="text-brand-orange-primary hover:text-brand-orange-dark font-semibold transition-colors">
              Liên hệ chúng tôi
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
