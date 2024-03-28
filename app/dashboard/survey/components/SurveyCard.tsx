import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { SurveyData } from './SurveyList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SurveyCard({ item }: { item: SurveyData }) {
  return (
    <Card className=''>
      <CardHeader>
        {/* <Image
          priority
          src={item.image}
          width={1000}
          height={1000}
          alt={item.display_name}
        /> */}
      </CardHeader>
      <CardContent className=' text-center'>
        <CardTitle className='tracking-tight text-base font-medium'>
          {item.title}
        </CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button asChild className=' flex-1' variant='default'>
          <Link href={`/dashboard/survey/${item.survey_id}`}>Manage</Link>
        </Button>
        {/* <UpdateQrForm item={item} /> */}
        {/* <DeleteQR id={item.qr_id} /> */}
      </CardFooter>
    </Card>
  )
}
