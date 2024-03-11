'use server'

import { Message } from '@/utils/interface/qrInterface'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const deleteQR = async (id: string): Promise<Message> => {
  // initate supabase client
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    // delete from hovercode
    const res = await fetch(
      `https://hovercode.com/api/v2/hovercode/${id}/delete/`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${process.env
            .NEXT_PUBLIC_HOVERCODE_API_TOKEN!}`,
        },
      },
    )

    // handle error deleting from hovercode
    if (res.status !== 204) {
      throw new Error(res.statusText)
    }
    // delete from db
    const { error } = await supabase.from('qrcode').delete().eq('qr_id', id)

    // handle error deleting from db
    if (error) {
      throw error
    }

    // success message & revalidate path dasboard/qrcode
    revalidatePath('/dashboard/qrcode')
    return { message: 'QR code has successfully been deleted.' }
  } catch (error) {
    console.log('Error while deleting QR', error)
  }
}
