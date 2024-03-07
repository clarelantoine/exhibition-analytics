'use client'

import { useCallback, useEffect, useState } from 'react'
import QRCard from './QRCard'
import { fetchQrListFromDB, getQRData } from '../actions/getQR.action'
import { QrDetails } from '@/utils/interface/qrInterface'

// const QRData = [
//   {
//     id: 'qrone',
//     name: 'QR One',
//     url: 'https://clarelantoine.com',
//     image:
//       'https://media.hovercode.com/media/codes/ecb1de1b-9ba8-479b-aacd-452dd4e631a3.png',
//   },
//   {
//     id: 'qrtwo',
//     name: 'QR Two',
//     url: 'https://clarelantoine.com',
//     image:
//       'https://media.hovercode.com/media/codes/ecb1de1b-9ba8-479b-aacd-452dd4e631a3.png',
//   },
//   {
//     id: 'qrthree',
//     name: 'QR Three',
//     url: 'https://clarelantoine.com',
//     image:
//       'https://media.hovercode.com/media/codes/ecb1de1b-9ba8-479b-aacd-452dd4e631a3.png',
//   },
//   {
//     id: 'qrfour',
//     name: 'QR Four',
//     url: 'https://clarelantoine.com',
//     image:
//       'https://media.hovercode.com/media/codes/ecb1de1b-9ba8-479b-aacd-452dd4e631a3.png',
//   },
//   {
//     id: 'qrfive',
//     name: 'QR Five',
//     url: 'https://clarelantoine.com',
//     image:
//       'https://media.hovercode.com/media/codes/ecb1de1b-9ba8-479b-aacd-452dd4e631a3.png',
//   },
// ]

export default function QRList() {
  // useState to store final qr list
  const [qrList, setQrList] = useState<QrDetails[]>([])

  // function to handle fetching of qr from db and third-party qr generator
  const handleFetchQrList = useCallback(async () => {
    const qrDetailsArray = []

    // fetch user qr code from db
    const qrListDB = await fetchQrListFromDB()

    if (qrListDB) {
      for await (let qrItemDB of qrListDB) {
        // get user qr code data from third-party
        const { id, display_name, png, qr_data } = await getQRData(
          qrItemDB.qr_id,
        )

        // push qr details to array
        qrDetailsArray.push({
          id: qrItemDB.qr_id,
          name: display_name,
          image: png,
          url: qr_data,
        })
      }

      // set qrList state
      setQrList(qrDetailsArray)
    }
  }, [])

  useEffect(() => {
    handleFetchQrList()
  }, [handleFetchQrList])

  return qrList.length > 0 ? (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {qrList.map(item => (
        <QRCard key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <p>no qr code...</p>
  )
}
