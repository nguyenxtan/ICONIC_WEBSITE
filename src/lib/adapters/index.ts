import { EvergreenAdapter } from './evergreen'
import { TrackingAdapter } from './types'

export const adapters: Record<string, TrackingAdapter> = {
  evergreen: new EvergreenAdapter(),
  // Future adapters:
  // maersk: new MaerskAdapter(),
  // cosco: new CoscoAdapter(),
  // one: new ONEAdapter(),
}

export function getAdapter(carrier: string): TrackingAdapter | null {
  return adapters[carrier.toLowerCase()] || null
}

export * from './types'
