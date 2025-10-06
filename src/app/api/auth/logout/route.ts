import { NextResponse } from 'next/server'
import { removeAuthCookie } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST() {
  await removeAuthCookie()
  return NextResponse.json({ success: true })
}
