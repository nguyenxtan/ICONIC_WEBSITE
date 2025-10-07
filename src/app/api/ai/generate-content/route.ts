import { NextRequest, NextResponse } from 'next/server'


const N8N_WEBHOOK_URL = 'https://n8n.iconiclogs.com/webhook/content'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, type = 'blog', language = 'vi' } = body

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Call n8n webhook
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        type,
        language,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`N8N webhook failed: ${response.statusText}`)
    }

    const data = await response.json()

    // Expected response from n8n:
    // {
    //   title: string
    //   slug: string
    //   summary: string
    //   content: string (markdown)
    //   coverImageUrl: string
    //   tags: string[]
    //   metadata: object
    // }

    return NextResponse.json(data)
  } catch (error) {
    console.error('AI content generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content', details: String(error) },
      { status: 500 }
    )
  }
}
