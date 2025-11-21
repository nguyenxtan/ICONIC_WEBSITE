import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyTokenEdge } from './lib/auth-edge'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public auth pages (no auth required)
  const publicAuthPages = [
    '/admin/login',
    '/admin/forgot-password',
    '/admin/reset-password',
  ]

  // Skip auth check for public auth pages
  if (publicAuthPages.includes(pathname)) {
    // If already logged in, redirect to dashboard
    const token = request.cookies.get('auth-token')?.value
    if (token && await verifyTokenEdge(token)) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Only check auth for /admin/* routes (excluding public pages)
  if (pathname.startsWith('/admin')) {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Verify token
    const payload = await verifyTokenEdge(token)
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
