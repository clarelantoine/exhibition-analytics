'use client'

import { CreateQrCodeDialogForm } from './components/CreateQrCodeDialogForm'
import QRList from './components/QRList'

export default function QrCodePage() {
  return (
    <div className=' h-full grid items-start gap-8'>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-3xl font-semibold tracking-tight'>QR Code</h1>
          <p className='text-lg text-muted-foreground'>
            Create and manage QR codes.
          </p>
        </div>
        <CreateQrCodeDialogForm />
      </div>
      <QRList />
    </div>
  )
}
