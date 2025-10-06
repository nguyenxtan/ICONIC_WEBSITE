import { NextRequest, NextResponse } from 'next/server'
import { ShipmentLinkAdapter } from '@/lib/adapters/shipmentlink'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, code } = body

    if (!code || !type) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameters: type and code'
        },
        { status: 400 }
      )
    }

    if (type !== 'BOL' && type !== 'BOOKING') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid type. Must be BOL or BOOKING'
        },
        { status: 400 }
      )
    }

    const adapter = new ShipmentLinkAdapter()
    const result = await adapter.track(type, code)

    return NextResponse.json(result)
  } catch (error) {
    console.error('ShipmentLink API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
}
