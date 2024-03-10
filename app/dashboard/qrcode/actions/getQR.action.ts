'use server'

import { QrDetails } from '@/utils/interface/qrInterface'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const getQr = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const qrItems: QrDetails[] = []

  try {
    // get qr from db
    const { data, error } = await supabase.from('qrcode').select('qr_id')
    // handle error getting qr from db
    if (error) {
      throw new Error('Supabase get qr error', { cause: error })
    }

    // if there are qr
    if (data) {
      for (let item of data) {
        // get qr from hovercode
        const res = await fetch(
          `https://hovercode.com/api/v2/hovercode/${item.qr_id}/`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Token ${process.env
                .NEXT_PUBLIC_HOVERCODE_API_TOKEN!}`,
            },
          },
        )

        // qr data json
        const qrData = await res.json()

        // handle error getting qr from hovercode
        if (qrData?.error) {
          throw new Error('Hovercode update error', { cause: qrData.error })
        }

        // push qr item to array
        qrItems.push({
          id: item.qr_id,
          name: qrData.display_name,
          image: qrData.png,
          url: qrData.qr_data,
        })
      }

      // sort array to be implemented

      // return qr items & revalidate path
      revalidatePath('/dashboard/qrcode')
      return qrItems
    }
  } catch (error) {
    // handle error getting qr code
    console.log(error)
  }
}
