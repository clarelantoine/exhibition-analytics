'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import { submitSuvey } from '../actions/submitSurvey.action'

const surveyQuestions = [
  {
    id: 1,
    question: 'What is the capital city of France?',
    answers: ['all', 'mentions', 'none'],
  },
  {
    id: 2,
    question: "Who wrote the famous play 'Romeo and Juliet'?",
    answers: ['all', 'mentions', 'none'],
  },
  {
    id: 3,
    question: 'What is the chemical symbol for water?',
    answers: ['all', 'mentions', 'none'],
  },
]

export const FormSchema = z.object(
  Object.fromEntries(
    surveyQuestions.map(field => [
      `question_${field.id}`,
      z.enum(['all', 'mentions', 'none'], {
        required_error: 'You need to select a notification type.',
      }),
    ]),
  ),
)

export function SurveyForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  Object.values(form.formState.errors).forEach(error => {
    // toast({
    //   variant: 'destructive',
    //   title: 'Uh oh! Something went wrong',
    //   description: error.message,
    // })
  })

  // console.log(form.formState.errors)

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const test = await submitSuvey(data)
    console.log('test:', test)

    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
        {surveyQuestions.map(item => (
          <FormField
            key={item.id}
            control={form.control}
            name={`question_${item.id}`}
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>{item.question}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-col space-y-1'
                  >
                    {item.answers.map((answer, i) => (
                      <FormItem
                        key={i}
                        className='flex items-center space-x-3 space-y-0'
                      >
                        <FormControl>
                          <RadioGroupItem value={answer} />
                        </FormControl>
                        <FormLabel className='font-normal'>{answer}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
