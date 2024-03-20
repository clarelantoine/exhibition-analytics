import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import DeleteQR from './DeleteQR'
import { DbQrData } from '@/utils/interface/qrInterface'
import UpdateQrForm from './UpdateQRForm'

export default function QRCard({ item }: { item: DbQrData }) {
  return (
    <Card className=''>
      <CardHeader>
        <Image
          priority
          src={item.image}
          width={1000}
          height={1000}
          alt={item.display_name}
        />
      </CardHeader>
      <CardContent className=' text-center'>
        <CardTitle className='tracking-tight text-base font-medium'>
          {item.display_name}
        </CardTitle>
        <CardDescription>{item.url}</CardDescription>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <UpdateQrForm item={item} />
        <DeleteQR id={item.qr_id} />
      </CardFooter>
    </Card>
  )
}
