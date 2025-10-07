import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'
import bcrypt from 'bcryptjs'


// PATCH /api/admin/users/:id/password - Change user password
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    // User can change their own password or SUPER_ADMIN can change any password
    const canChangePassword = user.id === id || user.role === 'SUPER_ADMIN'

    if (!canChangePassword) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // If user is changing their own password, verify current password
    if (user.id === id && currentPassword) {
      const targetUser = await prisma.user.findUnique({
        where: { id },
      })

      if (!targetUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      const isValidPassword = await bcrypt.compare(
        currentPassword,
        targetUser.passwordHash
      )

      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        )
      }
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10)

    // Update password
    await prisma.user.update({
      where: { id },
      data: { passwordHash },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error changing password:', error)
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    )
  }
}
