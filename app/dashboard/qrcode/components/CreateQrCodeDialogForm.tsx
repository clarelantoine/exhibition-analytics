/* eslint-disable react/no-unescaped-entities */
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

export function CreateQrCodeDialogForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' /> New QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create QR code</DialogTitle>
          <DialogDescription>
            Fill the below fields to create a new QR code. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-left'>
              Name
            </Label>
            <Input
              id='name'
              //   defaultValue='Pedro Duarte'
              className='col-span-4'
            />
            <Label htmlFor='name' className='text-left'>
              Link
            </Label>
            <Input
              id='name'
              //   defaultValue='Pedro Duarte'
              className='col-span-4'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
