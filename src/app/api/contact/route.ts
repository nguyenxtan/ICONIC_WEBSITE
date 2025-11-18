import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { contactFormSchema, validateRequestBody } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const validation = await validateRequestBody(request, contactFormSchema)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const { name, email, phone, company, message } = validation.data

    await prisma.contactForm.create({
      data: {
        name,
        email,
        phone: phone || '',
        company: company || '',
        message,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
