// HOVERCODE_WORKSPACE_ID
// HOVERCODE_API_TOKEN
'use server'

import { NextResponse } from 'next/server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// const hoverCodeConfig = {
//     workspace: process.env.HOVERCODE_WORKSPACE_ID
// }

export const createQrCode = async () => {
  const body = {
    workspace: process.env.NEXT_PUBLIC_HOVERCODE_WORKSPACE_ID!,
    qr_data: 'https://clarel-antoine.com',
    dynamic: true,
    display_name: 'test create qr code',
    frame: 'border',
    pattern: 'Original',
  }

  const res = await fetch('https://hovercode.com/api/v2/hovercode/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.NEXT_PUBLIC_HOVERCODE_API_TOKEN!}`,
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  //   revalidatePath('/dashboard/qrcode')
  return data
}

export const getQrCode = async (id: string) => {
  const res = await fetch(`https://hovercode.com/api/v2/hovercode/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.NEXT_PUBLIC_HOVERCODE_API_TOKEN!}`,
    },
  })

  const data = await res.json()

  revalidatePath('/dashboard/qrcode')

  return data
}

export async function creatQrAction(
  prevState: { message: string },
  formData: FormData,
) {
  const schema = z.object({
    name: z.string().min(1),
    url: z.string().min(1),
  })
  const parse = schema.safeParse({
    name: formData.get('name'),
    url: formData.get('url'),
  })

  if (!parse.success) {
    return { message: 'Failed to create qr code' }
  }

  const qrData = parse.data

  const body = {
    workspace: process.env.NEXT_PUBLIC_HOVERCODE_WORKSPACE_ID!,
    qr_data: qrData.url,
    dynamic: true,
    display_name: qrData.name,
    frame: 'border',
    pattern: 'Original',
  }

  const res = await fetch('https://hovercode.com/api/v2/hovercode/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.NEXT_PUBLIC_HOVERCODE_API_TOKEN!}`,
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  //   console.log(data)

  return { message: 'qr code created' }
}
