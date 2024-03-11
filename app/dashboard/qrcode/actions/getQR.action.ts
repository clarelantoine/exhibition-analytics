'use server'

import { DbQrData } from '@/utils/interface/qrInterface'
import { createClient } from '@/utils/supabase/server'
import { PostgrestError } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const getQr = async (): Promise<DbQrData[]> => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    // get qr from db
    const { data, error }: { data: DbQrData[]; error: PostgrestError } =
      await supabase.from('qrcode').select('*')
    // console.log(data)

    // handle error getting qr from db
    if (error) {
      throw new Error('Supabase get qr error', { cause: error })
    }

    // return qr items & revalidate path
    revalidatePath('/dashboard/qrcode')
    return data
  } catch (error) {
    // handle error getting qr code
    console.log(error)
  }
}
