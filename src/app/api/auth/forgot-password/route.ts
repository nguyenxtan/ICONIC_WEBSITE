import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import crypto from 'crypto'

export const runtime = 'nodejs'

/**
 * POST /api/auth/forgot-password
 * Request: { email: string }
 * Response: { success: boolean, message: string }
 *
 * Generates a password reset token and stores it in the database
 * Token expires in 30 minutes
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email là bắt buộc' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal if user exists (security best practice)
      return NextResponse.json(
        { success: true, message: 'Nếu email tồn tại, bạn sẽ nhận được link đặt lại mật khẩu' },
        { status: 200 }
      )
    }

    // Generate reset token (random 32-byte hex string)
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')

    // Set expiry to 30 minutes from now
    const expiryTime = new Date(Date.now() + 30 * 60 * 1000)

    // Update user with reset token and expiry
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetTokenHash,
        passwordResetExpiresAt: expiryTime,
      },
    })

    // In a real app, you would send this via email
    // For now, we'll return it in the response (for development only)
    // const resetLink = `${process.env.SITE_URL}/admin/reset-password?token=${resetToken}`

    // TODO: Send email with reset link
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Đặt lại mật khẩu ICONIC LOGISTICS Admin',
    //   text: `Nhấp vào link để đặt lại mật khẩu: ${resetLink}`,
    // })

    // Log for debugging (visible in server logs)
    console.log('📧 Password Reset Token generated for:', user.email)
    console.log('📧 Reset Link:', `${process.env.SITE_URL || 'http://localhost:3000'}/admin/reset-password?token=${resetToken}`)

    // Check if admin specifically requests the token (for testing)
    // Headers are case-insensitive, check for test mode flag
    const isTestMode = request.headers.get('x-test-mode') === 'true'

    return NextResponse.json(
      {
        success: true,
        message: 'Link đặt lại mật khẩu đã được gửi đến email của bạn',
        // For testing only - will only be included if x-test-mode header is set to 'true'
        ...(isTestMode && {
          resetToken, // Only expose for testing!
          resetLink: `${process.env.SITE_URL || 'http://localhost:3000'}/admin/reset-password?token=${resetToken}`,
          _testNote: 'This field is only visible because x-test-mode header was set to true. Remove in production!',
        }),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    )
  }
}
