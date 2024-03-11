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

export type HoverodeCreateQr = {
  workspace: string
  qr_data: string
  dynamic: boolean
  display_name: string
  frame: string
  pattern: string
  generate_png: boolean
}

export type DbQrData = {
  readonly id?: number
  user_id: string
  qr_id: string
  display_name: string
  url: string
  image: string
  created_at?: string
  updated_on?: string
}
