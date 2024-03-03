import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import EditQR from './EditQR'
import DeleteQR from './DeleteQR'

export default function QRCard({ item }) {
  return (
    <Card className=''>
      <CardHeader>
        <Image
          priority
          src={item.image}
          width={1000}
          height={1000}
          alt={item.name}
        />
      </CardHeader>
      <CardContent className=' text-center'>
        <CardTitle className='tracking-tight text-base font-medium'>
          {item.name}
        </CardTitle>
        <CardDescription>{item.url}</CardDescription>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <EditQR item={item} />
        <DeleteQR id={item.id} />
      </CardFooter>
    </Card>
  )
}
