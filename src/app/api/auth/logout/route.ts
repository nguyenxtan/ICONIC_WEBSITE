import { NextResponse } from 'next/server'
import { removeAuthCookie } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  await removeAuthCookie()

  // Redirect to login page after logout
  // Return JSON response to let client handle redirect
  return NextResponse.json(
    { success: true, redirectUrl: '/admin/login' },
    { status: 200 }
  )
}
