'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { createQrCode } from '../actions'

export default function CreateQRButton() {
  async function handleCreateQr() {
    // handle create new qr code
    const data = await createQrCode()

    if (data?.error) {
      console.log(data.error)
    } else {
      console.log('created')
    }
  }

  return (
    <Button onClick={handleCreateQr}>
      <Plus className='mr-2 h-4 w-4' /> New QR Code
    </Button>
  )
}
