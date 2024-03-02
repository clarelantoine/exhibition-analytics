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
import { creatQrAction } from '../actions'
import { useFormState } from 'react-dom'
import SubmitButton from '@/components/SubmitButton'
import { useState } from 'react'

const initialState = {
  message: '',
}

export function CreateQrCodeDialogForm() {
  const [state, formAction] = useFormState(creatQrAction, initialState)

  return (
    <Dialog>
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
              />
              <Label htmlFor='name'>Link</Label>
              <Input
                id='url'
                name='url'
                placeholder='QR code link'
                className='col-span-4'
              />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton />
            <p>{state?.message}</p>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
