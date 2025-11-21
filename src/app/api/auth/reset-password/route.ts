import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/auth'
import crypto from 'crypto'

export const runtime = 'nodejs'

/**
 * POST /api/auth/reset-password
 * Request: { token: string, password: string }
 * Response: { success: boolean, error?: string }
 *
 * Resets the user's password using the valid reset token
 */
export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    // Validation
    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Token không hợp lệ' },
        { status: 400 }
      )
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json(
        { error: 'Mật khẩu phải có ít nhất 6 ký tự' },
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
          gt: new Date(),
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Token không hợp lệ hoặc đã hết hạn' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await hashPassword(password)

    // Update user password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedPassword,
        passwordResetToken: null,
        passwordResetExpiresAt: null,
      },
    })

    return NextResponse.json(
      { success: true, message: 'Mật khẩu đã được đặt lại thành công' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    )
  }
}
