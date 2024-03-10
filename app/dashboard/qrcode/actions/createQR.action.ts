'use server'

import { NextResponse } from 'next/server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { InsertNewQRData, Message } from '@/utils/interface/qrInterface'
import { getQr } from './getQR.action'

export async function creatQrAction(
  prevState: Message,
  formData: FormData,
): Promise<Message> {
  //  create supabase client
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  //   get auth user id
  const {
    data: { user },
  } = await supabase.auth.getUser()

  //   validate qr form data
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

  const qrFormData = parse.data

  // qr code config
  const body = {
    workspace: process.env.NEXT_PUBLIC_HOVERCODE_WORKSPACE_ID!,
    qr_data: qrFormData.url,
    dynamic: true,
    display_name: qrFormData.name,
    frame: 'border',
    pattern: 'Original',
  }

  //   create qr code
  const res = await fetch('https://hovercode.com/api/v2/hovercode/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.NEXT_PUBLIC_HOVERCODE_API_TOKEN!}`,
    },
    body: JSON.stringify(body),
  })

  const qrData = await res.json()

  const newQRData: InsertNewQRData = {
    user_id: user.id,
    qr_id: qrData.id,
    display_name: qrData.display_name,
  }
  // store created qr code detail in db
  const { error } = await supabase.from('qrcode').insert(newQRData)

  if (error) {
    return { message: 'Failed to create qr code' }
  }

  revalidatePath('/dashboard/qrcode')

  return { message: 'qr code created' }
}
