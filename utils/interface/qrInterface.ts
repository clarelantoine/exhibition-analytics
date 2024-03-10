export type Message = {
  message: string
  error?: boolean
}

export type InsertNewQRData = {
  user_id: string
  qr_id: string
  display_name: string
}

export interface QrDetails {
  id: string
  name: string
  image: string
  url: string
}

export type QRData = {
  readonly _id: string
  name: string
  url: string
  image?: string
}
