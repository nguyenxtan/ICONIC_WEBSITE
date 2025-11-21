import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import crypto from 'crypto'

export const runtime = 'nodejs'

/**
 * POST /api/auth/verify-reset-token
 * Request: { token: string }
 * Response: { success: boolean, error?: string }
 *
 * Verifies if the password reset token is valid and not expired
 */
export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Token không hợp lệ' },
        { status: 400 }
      )
    }

    // Hash the token to compare with stored hash
    const tokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex')

    // Find user with matching reset token
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: tokenHash,
        // Token must not be expired
        passwordResetExpiresAt: {
          gt: new Date(), // Greater than now
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Token không hợp lệ hoặc đã hết hạn' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: true, email: user.email },
      { status: 200 }
    )
  } catch (error) {
    console.error('Verify token error:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra' },
      { status: 500 }
    )
  }
}
