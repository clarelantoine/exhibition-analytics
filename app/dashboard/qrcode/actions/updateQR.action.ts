'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Message } from '@/utils/interface/qrInterface'

export async function updatedQr(
  prevState: Message,
  formData: FormData,
): Promise<Message> {
  // initate supabase client
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // validate qr form data
  const schema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    url: z.string().min(1),
  })

  const parse = schema.safeParse({
    id: formData.get('qr_id'),
    name: formData.get('display_name'),
    url: formData.get('url'),
  })

  if (!parse.success) {
    // return { message: 'Failed to update qr code' }
    throw new Error('form validation error')
  }

  try {
    // update qr code on hovercode
    const res = await fetch(
      `https://hovercode.com/api/v2/hovercode/${parse.data.id}/update/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${process.env
            .NEXT_PUBLIC_HOVERCODE_API_TOKEN!}`,
        },
        body: JSON.stringify({
          qr_data: parse.data.url,
          display_name: parse.data.name,
        }),
      },
    )

    const data = await res.json()

    // handle error deleting from hovercode
    if (data?.error) {
      // console.log('Error hovercode update:', data.error)
      throw new Error('Hovercode update error', { cause: data.error })
    }

    // update qr code in db
    const { error } = await supabase
      .from('qrcode')
      .update({ display_name: data.display_name, url: data.qr_data })
      .eq('qr_id', parse.data.id)

    // handle error editing in db
    if (error) {
      throw new Error('Supabase update error', { cause: error })
    }

    // success message & revalidate path dasboard/qrcode
    revalidatePath('/dashboard/qrcode')
    return { message: 'Your QR code has been updated.', error: false }
  } catch (error) {
    // handle error deleting qr code
    console.log(error)
    return { message: `Couldn't update your QR code.`, error: true }
  }
}
