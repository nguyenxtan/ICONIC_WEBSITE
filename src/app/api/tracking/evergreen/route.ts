import { NextRequest, NextResponse } from 'next/server'
import { ShipmentLinkAdapter } from '@/lib/adapters/shipmentlink'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, code } = body

    if (!type || !code) {
      return NextResponse.json(
        { success: false, error: 'Missing type or code' },
        { status: 400 }
      )
    }

    if (type !== 'BOL' && type !== 'BOOKING') {
      return NextResponse.json(
        { success: false, error: 'Invalid type. Must be BOL or BOOKING' },
        { status: 400 }
      )
    }

    // Use ShipmentLink adapter (supports multiple carriers)
    const adapter = new ShipmentLinkAdapter()
    const result = await adapter.track(type, code)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Tracking API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
