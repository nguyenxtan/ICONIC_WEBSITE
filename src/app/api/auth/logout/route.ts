import { NextResponse } from 'next/server'
import { removeAuthCookie } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  await removeAuthCookie()

  // Redirect to login page after logout
  // Use SITE_URL from environment or construct from origin header
  const origin = request.headers.get('x-forwarded-proto') && request.headers.get('x-forwarded-host')
    ? `${request.headers.get('x-forwarded-proto')}://${request.headers.get('x-forwarded-host')}`
    : process.env.SITE_URL || 'http://localhost:3000'

  const loginUrl = new URL('/admin/login', origin)
  return NextResponse.redirect(loginUrl.toString(), {
    status: 302,
  })
}
