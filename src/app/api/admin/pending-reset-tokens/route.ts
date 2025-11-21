import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

export const runtime = 'nodejs'

/**
 * GET /api/admin/pending-reset-tokens
 *
 * Returns all users with pending password reset tokens
 * Admin only - used for testing/debugging password reset flow
 */
export async function GET(request: Request) {
  try {
    // Verify admin access
    const user = await getCurrentUser()

    if (!user || user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - only super admin can access this' },
        { status: 403 }
      )
    }

    // Find all users with pending reset tokens
    const usersWithTokens = await prisma.user.findMany({
      where: {
        passwordResetToken: {
          not: null,
        },
        passwordResetExpiresAt: {
          gt: new Date(), // Token still valid
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        passwordResetExpiresAt: true,
        createdAt: true,
      },
      orderBy: {
        passwordResetExpiresAt: 'desc',
      },
    })

    return NextResponse.json(
      {
        success: true,
        count: usersWithTokens.length,
        users: usersWithTokens.map(u => ({
          ...u,
          expiresIn: u.passwordResetExpiresAt
            ? Math.round((u.passwordResetExpiresAt.getTime() - Date.now()) / 1000 / 60)
            : null,
          expiresInMinutes: u.passwordResetExpiresAt
            ? Math.round((u.passwordResetExpiresAt.getTime() - Date.now()) / 1000 / 60)
            : null,
        })),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get pending reset tokens error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pending reset tokens' },
      { status: 500 }
    )
  }
}
