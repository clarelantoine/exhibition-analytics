import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deleteQR } from '../actions/deleteQR.action'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function DeleteQR({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    // console.log(id)
    const { message } = await deleteQR(id).finally(() => setLoading(false))

    if (message) {
      toast({
        variant: 'default',
        title: 'Deletion Successful.',
        description: message,
      })
      // console.log(result.message)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button variant='destructive'>Delete</Button> */}

        <Button variant='destructive' disabled={loading}>
          {loading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
            </>
          ) : (
            'Delete'
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this QR code?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your QR
            code.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant='destructive' onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
