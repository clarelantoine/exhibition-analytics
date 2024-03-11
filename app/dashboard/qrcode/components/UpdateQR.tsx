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
import { useFormState } from 'react-dom'
import SubmitButton from '@/components/SubmitButton'
import { useEffect, useState } from 'react'
import { DbQrData, Message, QrDetails } from '@/utils/interface/qrInterface'
import { updatedQr } from '../actions/updateQR.action'
import { toast } from '@/components/ui/use-toast'

// initial message
const initialMessage: Message = {
  message: null,
  error: null,
}

export default function UpdateQr({ item }: { item: DbQrData }) {
  const [state, formAction] = useFormState(updatedQr, initialMessage)
  const [open, setOpen] = useState(false)

  // setup form fields
  const [formFields, setFormFields] = useState<DbQrData>(item)
  const { display_name, url, qr_id } = formFields

  // handle form fields change
  const handleChange = (e: { target: HTMLInputElement }) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
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
        <Button variant='outline'>Edit</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form action={formAction} className='grid gap-4'>
          <DialogHeader>
            <DialogTitle>Edit QR code</DialogTitle>
            <DialogDescription>
              Please complete the fields below to edit the QR code. Click "save"
              once finished.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <input type='hidden' id='qr_id' name='qr_id' value={qr_id} />
              <Label htmlFor='name'>Name</Label>
              <Input
                id='display_name'
                name='display_name'
                placeholder='Display name'
                className='col-span-4'
                value={display_name}
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
