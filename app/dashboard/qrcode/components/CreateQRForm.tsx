/* eslint-disable react/no-unescaped-entities */

'use client'

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
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { useFormState } from 'react-dom'
import SubmitButton from '@/components/SubmitButton'
import { useEffect, useState } from 'react'
import { creatQr } from '../actions/createQR.action'
import { Message, QrDetails } from '@/utils/interface/qrInterface'
import { toast } from '@/components/ui/use-toast'

// initial message
const initialMessage: Message = {
  message: null,
  error: null,
}

// initial create qr form fields (type to be refactored)
const initialFormFields: Omit<QrDetails, 'id' | 'image'> = {
  name: '',
  url: '',
}

export function CreateQRForm() {
  const [state, formAction] = useFormState(creatQr, initialMessage)
  const [open, setOpen] = useState(false)

  // setup form fields
  const [formFields, setFormFields] =
    useState<Omit<QrDetails, 'id' | 'image'>>(initialFormFields)

  const { name, url } = formFields

  // handle form fields change
  const handleChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  // display toast (trigger on form state change)
  useEffect(() => {
    if (state?.message) {
      toast({
        variant: state?.error ? 'destructive' : 'default',
        title: state?.error
          ? 'Uh oh! Something went wrong'
          : 'Hooray! Successful',
        description: state?.message,
      })

      // handle display of dialog
      setOpen(state?.error)
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' /> New QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form action={formAction} className='grid gap-4'>
          <DialogHeader>
            <DialogTitle>Create QR code</DialogTitle>
            <DialogDescription>
              Please complete the fields below to generate a new QR code. Click
              "save" once finished.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                name='name'
                placeholder='Display name'
                className='col-span-4'
                value={name}
                onChange={handleChange}
              />
              <Label htmlFor='name'>Link</Label>
              <Input
                id='url'
                name='url'
                placeholder='QR code link'
                className='col-span-4'
                value={url}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton />
            {/* <p>{state?.message}</p> */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
