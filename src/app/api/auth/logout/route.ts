import { NextResponse } from 'next/server'
import { removeAuthCookie } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  await removeAuthCookie()

  // Redirect to login page after logout
  const loginUrl = new URL('/admin/login', request.url)
  return NextResponse.redirect(loginUrl, {
    status: 302,
  })
}
