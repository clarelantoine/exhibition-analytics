/* eslint-disable react/no-unescaped-entities */

'use client'

import { toast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import SubmitButton from '@/components/SubmitButton'
import { useEffect, useState } from 'react'
import { createQr } from '../actions/createQR.action'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// define form scheme
const FormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  url: z.string().min(1, { message: 'Url is required' }),
})

export function CreateQRForm() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      url: '',
    },
  })

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const result = await createQr(formData)

    if (result?.message) {
      toast({
        variant: result?.error ? 'destructive' : 'default',
        title: result?.error
          ? 'Uh oh! Something went wrong'
          : 'Hooray! Successful',
        description: result?.message,
      })

      // handle display of dialog
      setOpen(result?.error)
    }
  }

  // reset form data after submit
  useEffect(() => {
    form.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isSubmitSuccessful])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' /> New QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create QR code</DialogTitle>
          <DialogDescription>
            Please complete the fields below to generate a new QR code. Click
            "save" once finished.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Display name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input placeholder='Qr code link' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <SubmitButton />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
