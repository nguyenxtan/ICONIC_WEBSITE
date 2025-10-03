import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip auth check for login page
  if (pathname === '/admin/login') {
    // If already logged in, redirect to dashboard
    const token = request.cookies.get('auth-token')?.value
    if (token && verifyToken(token)) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Only check auth for /admin/* routes (excluding login)
  if (pathname.startsWith('/admin')) {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Verify token
    const payload = verifyToken(token)
    if (!payload) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('auth-token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
