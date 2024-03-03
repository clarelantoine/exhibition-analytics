'use client'
import { useEffect, useState } from 'react'
import CreateQRButton from './components/CreateQRButton'
import { getQrAction, getQrCode } from './actions'
import Image from 'next/image'
import { CreateQrCodeDialogForm } from './components/CreateQrCodeDialogForm'
import QRCard from './components/QRCard'
import QRList from './components/QRList'

// interface qrCodeData {
//   displayName: string
//   image: string
//   svg: string
//   svg_file: string
// }

const QRData = [
  {
    id: 'qrone',
    name: 'QR One',
    url: 'https://clarelantoine.com',
    image:
      'https://media.hovercode.com/media/codes/ecb1de1b-9ba8-479b-aacd-452dd4e631a3.png',
  },
  {
    id: 'qrtwo',
    name: 'QR Two',
    url: 'https://clarelantoine.com',
    image:
      'https://media.hovercode.com/media/codes/ecb1de1b-9ba8-479b-aacd-452dd4e631a3.png',
  },
  {
    id: 'qrthree',
    name: 'QR Three',
    url: 'https://clarelantoine.com',
    image:
      'https://media.hovercode.com/media/codes/ecb1de1b-9ba8-479b-aacd-452dd4e631a3.png',
  },
  {
    id: 'qrfour',
    name: 'QR Four',
    url: 'https://clarelantoine.com',
    image:
      'https://media.hovercode.com/media/codes/ecb1de1b-9ba8-479b-aacd-452dd4e631a3.png',
  },
  {
    id: 'qrfive',
    name: 'QR Five',
    url: 'https://clarelantoine.com',
    image:
      'https://media.hovercode.com/media/codes/ecb1de1b-9ba8-479b-aacd-452dd4e631a3.png',
  },
]

export default function QrCodePage() {
  // const [qrCode, setQrCode] = useState<qrCodeData>([])
  const [qrList, setQrList] = useState([])

  async function handleGetQrCode() {
    const qrData = await getQrAction()
    console.log(qrData)

    setQrList(qrData)
  }

  // async function testQr() {
  //   const test = await getQrAction()
  //   console.log(test)
  // }

  useEffect(() => {
    // handleGetQrCode()
    // testQr()
    setQrList(QRData)
  }, [])

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
      <QRList items={qrList} />
    </div>
  )
}
