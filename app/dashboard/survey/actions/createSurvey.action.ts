'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Message } from '@/utils/interface/qrInterface'

export async function createSurvey(formData: {
  title?: string
  description?: string
}): Promise<Message> {
  // initate supabase client
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // get auth user id
  const {
    data: { user },
  } = await supabase.auth.getUser()

  try {
    // create qr code in db
    const { error } = await supabase.from('surveys').insert({
      title: formData.title,
      description: formData.description,
    })

    // handle error editing in db
    if (error) {
      throw new Error('Supabase create error', { cause: error })
    }

    // success message & revalidate path dasboard/qrcode
    revalidatePath('/dashboard/survey')
    return { message: 'Your survey has been created.', error: false }
  } catch (error) {
    return { message: `Couldn't create survey.`, error: true }
  }
}
