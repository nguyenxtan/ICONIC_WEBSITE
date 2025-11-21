'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [resetToken, setResetToken] = useState<string>('')
  const [resetLink, setResetLink] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitted(true)

        // For development only - show reset token on UI
        if (data.resetToken) {
          setResetToken(data.resetToken)
          const link = `${window.location.origin}/admin/reset-password?token=${data.resetToken}`
          setResetLink(link)
        }

        toast({
          title: 'Email đã được gửi',
          description: 'Vui lòng kiểm tra email để đặt lại mật khẩu',
        })
      } else {
        setError(data.error || 'Có lỗi xảy ra, vui lòng thử lại')
        toast({
          title: 'Lỗi',
          description: data.error || 'Email không tồn tại hoặc có lỗi hệ thống',
          variant: 'destructive',
        })
      }
    } catch (err) {
      setError('Có lỗi kết nối, vui lòng thử lại')
      toast({
        title: 'Lỗi kết nối',
        description: 'Vui lòng kiểm tra kết nối internet',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-lg border-0">
          <CardHeader className="space-y-3 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Email đã được gửi</CardTitle>
            <CardDescription className="text-base">
              Vui lòng kiểm tra email <span className="font-semibold text-gray-900">{email}</span> để nhận link đặt lại mật khẩu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 text-sm">
                Link sẽ hết hạn trong <span className="font-semibold">30 phút</span>. Nếu không nhận được email, kiểm tra thư mục Spam.
              </AlertDescription>
            </Alert>

            {/* Development Mode - Show reset link */}
            {resetLink && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-yellow-800 bg-yellow-200 px-2 py-1 rounded">DEV MODE</span>
                  <p className="text-sm text-yellow-800 font-medium">Reset link (chỉ dùng cho development):</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-white border border-yellow-300 rounded p-3">
                    <p className="text-xs text-gray-600 break-all font-mono">
                      {resetLink}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(resetLink)
                      toast({
                        title: 'Đã copy',
                        description: 'Link đã được copy vào clipboard',
                      })
                    }}
                    className="text-xs text-yellow-700 hover:text-yellow-900 font-semibold underline"
                  >
                    Copy link
                  </button>
                </div>
                <Link href={resetLink} className="block">
                  <Button variant="outline" className="w-full text-sm border-yellow-300 hover:bg-yellow-50">
                    Mở link trong tab mới
                  </Button>
                </Link>
              </div>
            )}

            <div className="pt-4 space-y-3">
              <p className="text-sm text-gray-600">
                Không nhận được email?
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false)
                  setEmail('')
                  setResetToken('')
                  setResetLink('')
                }}
                variant="outline"
                className="w-full"
              >
                Gửi lại
              </Button>
            </div>

            <Link href="/admin/login" className="block pt-2">
              <Button variant="ghost" className="w-full text-brand-orange-primary hover:bg-orange-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại trang đăng nhập
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center mb-2">
            <Image
              src="/logo.png"
              alt="ICONIC LOGISTICS"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <CardTitle className="text-2xl">Quên mật khẩu?</CardTitle>
          <CardDescription>
            Nhập email của bạn để nhận link đặt lại mật khẩu
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800 text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@iconiclogs.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className="border-gray-300 focus:border-brand-orange-primary focus:ring-brand-orange-primary"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-gradient-to-r from-brand-orange-primary to-brand-orange-dark hover:from-orange-500 hover:to-orange-700 text-white font-semibold py-2.5 h-auto"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  Đang gửi...
                </>
              ) : (
                'Gửi Link Đặt Lại Mật Khẩu'
              )}
            </Button>

            <div className="pt-4 border-t">
              <Link href="/admin/login" className="block">
                <Button variant="ghost" className="w-full text-gray-600 hover:text-brand-orange-primary">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại trang đăng nhập
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
