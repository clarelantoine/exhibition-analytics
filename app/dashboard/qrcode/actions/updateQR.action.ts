'use server'

import { revalidatePath } from 'next/cache'
import { string, z } from 'zod'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Message } from '@/utils/interface/qrInterface'

export async function updateQr(formData: {
  id?: string
  name?: string
  url?: string
}): Promise<Message> {
  // initate supabase client
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    // update qr code on hovercode
    const res = await fetch(
      `https://hovercode.com/api/v2/hovercode/${formData?.id}/update/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${process.env
            .NEXT_PUBLIC_HOVERCODE_API_TOKEN!}`,
        },
        body: JSON.stringify({
          qr_data: formData?.url,
          display_name: formData?.name,
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
      .eq('qr_id', formData.id)

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
