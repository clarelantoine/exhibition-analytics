'use client'

import { useEffect, useState } from 'react'
import { getQr } from './actions/getQR.action'
import { NewQRForm } from './components/NewQRForm'
import QRList from './components/QRList'
import { QrDetails } from '@/utils/interface/qrInterface'
import { createClient } from '@/utils/supabase/client'

export default function QrCodePage() {
  // useState to store final qr list
  const [qrList, setQrList] = useState<QrDetails[]>([])
  const supabase = createClient()

  // function to handle fetching of qr from db and third-party qr generator
  const handleGetQR = async () => {
    const data = await getQr()
    setQrList(data)
  }

  useEffect(() => {
    handleGetQR()

    const channel = supabase
      .channel('realtime qrcode')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'qrcode' },
        payload => {
          console.log('Change received!', payload)
          handleGetQR()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return (
    <div className=' h-full grid items-start gap-8'>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-3xl font-semibold tracking-tight'>QR Code</h1>
          <p className='text-lg text-muted-foreground'>
            Create and manage QR codes.
          </p>
        </div>
        <NewQRForm />
      </div>
      <QRList items={qrList} />
    </div>
  )
}
