export interface ContainerMove {
  date: string
  move: string
  location: string
  vesselVoyage: string
}

export interface Container {
  number: string
  containerNo?: string
  type?: string
  size?: string
  service?: string
  quantity?: string
  measurement?: string
  grossWeight?: string
  tareWeight?: string
  weight?: string
  status?: string
  moves?: ContainerMove[]
}

export interface TrackingResult {
  success: boolean
  error?: string
  data?: {
    bookingNo?: string
    vessel?: string
    voyage?: string
    pol?: string
    pod?: string
    eta?: string
    etd?: string
    status?: string
    containers?: Container[]
    rawData?: any
  }
}

export interface TrackingAdapter {
  track(type: 'BOL' | 'BOOKING', code: string): Promise<TrackingResult>
}
