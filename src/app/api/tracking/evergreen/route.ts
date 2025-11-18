import { NextRequest, NextResponse } from 'next/server'
import { ShipmentLinkAdapter } from '@/lib/adapters/shipmentlink'
import { trackingSchema, validateRequestBody } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const validation = await validateRequestBody(request, trackingSchema)
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    const { type, code } = validation.data

    // Use ShipmentLink adapter (supports multiple carriers)
    const adapter = new ShipmentLinkAdapter()
    const result = await adapter.track(type, code)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Tracking API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve tracking information. Please try again later.',
      },
      { status: 500 }
    )
  }
}
