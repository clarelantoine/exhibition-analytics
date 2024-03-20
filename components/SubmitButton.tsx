import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useFormState } from 'react-hook-form'

export default function SubmitButton() {
  const { isSubmitting } = useFormState()

  return (
    <Button type='submit' disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
        </>
      ) : (
        'Save'
      )}
    </Button>
  )
}
