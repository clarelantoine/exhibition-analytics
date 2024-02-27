'use client'
import { useEffect, useState } from 'react'
import CreateQRButton from './components/CreateQRButton'
import { getQrCode } from './actions'
import Image from 'next/image'
import { CreateQrCodeDialogForm } from './components/CreateQrCodeDialogForm'

interface qrCodeData {
  displayName: string
  image: string
  svg: string
  svg_file: string
}

export default function QrCodePage() {
  const [qrCode, setQrCode] = useState<qrCodeData>(null)

  async function handleGetQrCode() {
    const qrData = await getQrCode('f2319663-4fba-477f-b5e7-c5b6f04834f8')
    console.log(qrData.svg_file)

    setQrCode({
      displayName: qrData.display_name,
      image: qrData.png,
      svg: qrData.svg,
      svg_file: qrData.svg_file,
    })
  }

  useEffect(() => {
    handleGetQrCode()
  }, [])

  return (
    <div className=' h-full'>
      <h1 className='text-3xl font-semibold tracking-tight'>QR Code</h1>
      <CreateQrCodeDialogForm />

      {qrCode && (
        <Image
          src={`data:image/svg+xml;utf8,${encodeURIComponent(qrCode.svg)}`}
          alt={qrCode.displayName}
          width={300}
          height={300}
        />
      )}
    </div>
  )
}
