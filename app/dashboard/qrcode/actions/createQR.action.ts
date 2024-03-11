'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import {
  DbQrData,
  HoverodeCreateQr,
  Message,
} from '@/utils/interface/qrInterface'

export async function creatQr(
  prevState: Message,
  formData: FormData,
): Promise<Message> {
  // initate supabase client
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // get auth user id
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // validate qr form data
  const schema = z.object({
    name: z.string().min(1),
    url: z.string().min(1),
  })
  const parse = schema.safeParse({
    name: formData.get('name'),
    url: formData.get('url'),
  })

  if (!parse.success) {
    // return { message: 'Failed to create qr code' }
    throw new Error('form validation error')
  }

  // Hovercode qr code config
  const body: HoverodeCreateQr = {
    workspace: process.env.NEXT_PUBLIC_HOVERCODE_WORKSPACE_ID!,
    qr_data: parse.data.url,
    display_name: parse.data.name,
    dynamic: true,
    generate_png: true,
    frame: 'border',
    pattern: 'Original',
  }

  try {
    // create qr code
    const res = await fetch('https://hovercode.com/api/v2/hovercode/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${process.env.NEXT_PUBLIC_HOVERCODE_API_TOKEN!}`,
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    // handle error creating from hovercode
    if (data?.error) {
      // console.log('Error hovercode create:', data.error)
      throw new Error('Hovercode create error', { cause: data.error })
    }

    //  qr code data to store in db
    const dbQrData: DbQrData = {
      user_id: user.id,
      qr_id: data.id,
      display_name: data.display_name,
      url: data.qr_data,
      image: data.png,
    }
    // create qr code in db
    const { error } = await supabase.from('qrcode').insert(dbQrData)

    // handle error editing in db
    if (error) {
      throw new Error('Supabase create error', { cause: error })
    }

    // success message & revalidate path dasboard/qrcode
    revalidatePath('/dashboard/qrcode')
    return { message: 'Your QR code has been created.', error: false }
  } catch (error) {
    return { message: `Couldn't create QR code.`, error: true }
  }
}
