'use client'
import { useEffect, useState } from 'react'
import CreateQRButton from './components/CreateQRButton'
import { getQrAction, getQrCode } from './actions'
import Image from 'next/image'
import { CreateQrCodeDialogForm } from './components/CreateQrCodeDialogForm'

// interface qrCodeData {
//   displayName: string
//   image: string
//   svg: string
//   svg_file: string
// }

export default function QrCodePage() {
  // const [qrCode, setQrCode] = useState<qrCodeData>([])
  const [qrCode, setQrCode] = useState([])

  async function handleGetQrCode() {
    const qrData = await getQrAction()
    // console.log(qrData.svg_file)

    setQrCode(qrData)
  }

  // async function testQr() {
  //   const test = await getQrAction()
  //   console.log(test)
  // }

  useEffect(() => {
    handleGetQrCode()
    // testQr()
  }, [])

  return (
    <div className=' h-full'>
      <h1 className='text-3xl font-semibold tracking-tight'>QR Code</h1>
      <CreateQrCodeDialogForm />

      {qrCode &&
        qrCode.map((item, i) => (
          <Image
            key={item}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(item)}`}
            alt={item}
            width={300}
            height={300}
          />
        ))}
    </div>
  )
}
