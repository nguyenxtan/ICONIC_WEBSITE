import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'


export async function GET() {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    })

    return NextResponse.json({ media })
  } catch (error) {
    console.error('Fetch media error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    )
  }
}
