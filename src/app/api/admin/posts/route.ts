import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAuth, getCurrentUser } from '@/lib/auth'

export const runtime = 'nodejs'

// GET /api/admin/posts - List all posts
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const posts = await prisma.post.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        createdBy: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST /api/admin/posts - Create new post
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()
    const { title, slug, summary, coverImageUrl, contentMd, status } = body

    if (!title || !slug || !contentMd) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        summary: summary || null,
        coverImageUrl: coverImageUrl || null,
        contentMd,
        status: status || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        createdById: user.id,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
