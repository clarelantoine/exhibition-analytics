'use client'

import QRCard from './QRCard'
import { DbQrData } from '@/utils/interface/qrInterface'

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

const QRList = ({ items }: { items: DbQrData[] }) => {
  return items.length > 0 ? (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {items.map(item => (
        <QRCard key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <p>no qr code...</p>
  )
}

export default QRList
