// In-memory rate limiting store
const rateLimitStore = new Map<
  string,
  { count: number; resetTime: number }
>()

interface RateLimitOptions {
  limit: number // max requests
  window: number // time window in seconds
}

const DEFAULT_OPTIONS: RateLimitOptions = {
  limit: 5, // 5 attempts
  window: 900, // 15 minutes
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions = DEFAULT_OPTIONS
): { success: boolean; remaining: number; resetIn: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  // Check if we need to reset
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + options.window * 1000,
    })
    return {
      success: true,
      remaining: options.limit - 1,
      resetIn: options.window,
    }
  }

  // Increment count
  entry.count++

  if (entry.count > options.limit) {
    const resetIn = Math.ceil((entry.resetTime - now) / 1000)
    return {
      success: false,
      remaining: 0,
      resetIn,
    }
  }

  return {
    success: true,
    remaining: options.limit - entry.count,
    resetIn: Math.ceil((entry.resetTime - now) / 1000),
  }
}

// Cleanup old entries every 5 minutes to prevent memory leaks
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key)
      }
    }
  }, 5 * 60 * 1000)
}
