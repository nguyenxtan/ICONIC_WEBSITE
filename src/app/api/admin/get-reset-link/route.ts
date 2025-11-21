import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import crypto from 'crypto'

export const runtime = 'nodejs'

/**
 * POST /api/admin/get-reset-link
 * Request: { email: string }
 * Response: { success: boolean, resetLink?: string, message: string }
 *
 * Admin endpoint to get a reset password link for a user
 * Useful for testing password reset flow
 */
export async function POST(request: Request) {
  try {
    // Verify admin access
    const user = await getCurrentUser()

    if (!user || user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - only super admin can access this' },
        { status: 403 }
      )
    }

    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user by email
    const targetUser = await prisma.user.findUnique({
      where: { email },
    })

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if user has a valid reset token
    if (
      !targetUser.passwordResetToken ||
      !targetUser.passwordResetExpiresAt ||
      targetUser.passwordResetExpiresAt < new Date()
    ) {
      return NextResponse.json(
        { error: 'User has no valid reset token. Generate one via forgot-password first.' },
        { status: 400 }
      )
    }

    // Get the original token from database (this is the hash)
    // We need to reconstruct the reset link
    // Note: The token is stored as hash, so we need to ask user to use the original token
    // from the forgot-password response

    const baseUrl = process.env.SITE_URL || 'http://localhost:3000'

    return NextResponse.json(
      {
        success: true,
        email: targetUser.email,
        message: 'Reset token found. To get the reset link, use the forgot-password endpoint.',
        info: {
          expiresAt: targetUser.passwordResetExpiresAt,
          expiresIn: Math.round(
            (targetUser.passwordResetExpiresAt.getTime() - Date.now()) / 1000 / 60
          ),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get reset link error:', error)
    return NextResponse.json(
      { error: 'Failed to get reset link' },
      { status: 500 }
    )
  }
}
