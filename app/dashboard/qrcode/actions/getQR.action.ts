'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const fetchQrListFromDB = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data, error } = await supabase.from('qrcode').select('qr_id')

    if (error) {
      throw error
    }

    if (data) {
      revalidatePath('/dashboard/qrcode')
      return data
    }
  } catch (error) {
    console.error('Error in fetch QR List:', error)
  }
}

export const getQRData = async (id: string) => {
  try {
    const res = await fetch(`https://hovercode.com/api/v2/hovercode/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${process.env.NEXT_PUBLIC_HOVERCODE_API_TOKEN!}`,
      },
    })

    const data = await res.json()

    if (data) {
      return data
      // console.log(data)
    }
  } catch (error) {
    console.error('Error in getting QR data:', error)
  }
}
