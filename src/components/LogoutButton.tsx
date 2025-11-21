'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

export default function LogoutButton() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: 'Đăng xuất thành công',
          description: 'Đang chuyển hướng...',
        })
        // Clear router cache and hard redirect to ensure navbar is cleared
        setTimeout(() => {
          router.refresh() // Clear Next.js cache
          window.location.href = data.redirectUrl || '/admin/login' // Hard redirect
        }, 500)
      }
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể đăng xuất. Vui lòng thử lại.',
        variant: 'destructive',
      })
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all w-full text-left group disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <LogOut className="h-5 w-5 transition-transform group-hover:scale-110" />
      <span className="font-medium">{isLoading ? 'Đang xuất...' : 'Đăng Xuất'}</span>
    </button>
  )
}
