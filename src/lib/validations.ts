import { z } from 'zod'

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER']),
})

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters'),
})

// Post schemas
export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  summary: z
    .string()
    .min(1, 'Summary is required')
    .max(500, 'Summary too long'),
  content: z.string().min(1, 'Content is required'),
  coverImageUrl: z.string().url('Invalid image URL').optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
})

export const updatePostSchema = createPostSchema.partial()

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Phone is required').max(20, 'Phone too long'),
  company: z.string().max(100, 'Company name too long').optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message too long'),
})

// Service schema
export const createServiceSchema = z.object({
  title: z
    .object({
      vi: z.string().min(1, 'Vietnamese title required'),
      en: z.string().min(1, 'English title required'),
    })
    .optional(),
  description: z
    .object({
      vi: z.string().min(1, 'Vietnamese description required'),
      en: z.string().min(1, 'English description required'),
    })
    .optional(),
  icon: z.string().optional(),
  sortOrder: z.number().int().min(0, 'Sort order must be non-negative'),
  visible: z.boolean().optional(),
})

// Tracking schema
export const trackingSchema = z.object({
  type: z.enum(['BOL', 'BOOKING'], {
    errorMap: () => ({ message: 'Type must be BOL or BOOKING' }),
  }),
  code: z.string().min(1, 'Tracking code is required').max(50, 'Code too long'),
})

// AI content generation schema
export const aiGenerateContentSchema = z.object({
  prompt: z
    .string()
    .min(10, 'Prompt must be at least 10 characters')
    .max(2000, 'Prompt too long'),
  type: z.enum(['blog', 'news', 'article']).default('blog'),
  language: z.enum(['vi', 'en']).default('vi'),
})

// Helper function to validate request body
export async function validateRequestBody<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const body = await request.json()
    const result = schema.safeParse(body)

    if (!result.success) {
      const errorMessages = result.error.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join('; ')
      return { success: false, error: errorMessages }
    }

    return { success: true, data: result.data as T }
  } catch (error) {
    return { success: false, error: 'Invalid JSON in request body' }
  }
}

export type LoginInput = z.infer<typeof loginSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type CreatePostInput = z.infer<typeof createPostSchema>
export type ContactFormInput = z.infer<typeof contactFormSchema>
export type TrackingInput = z.infer<typeof trackingSchema>
export type AIGenerateContentInput = z.infer<typeof aiGenerateContentSchema>
