'use server'

import { z } from 'zod'
import { FormSchema } from '../components/SurveyForm'

export async function submitSuvey(data: z.infer<typeof FormSchema>) {
  return data
}
