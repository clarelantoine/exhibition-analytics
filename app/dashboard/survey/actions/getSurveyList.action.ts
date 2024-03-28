import { createClient } from '@/utils/supabase/server'
import { PostgrestError } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

// Action to get survey list from db

export const getSurveyList = async () => {
  // initiate supabase client
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    // get survey list from db
    const { data, error } = await supabase
      .from('surveys')
      .select('survey_id, title, description, created_at')

    // handle error getting survey list from db
    if (error) {
      throw new Error('Supabase get survey list', { cause: error })
    }

    // revalidate current path and return survey list
    revalidatePath('/dashboard/survey')
    return data
  } catch (error) {
    //log error for easy debugging
    console.log(error)
  }
}
