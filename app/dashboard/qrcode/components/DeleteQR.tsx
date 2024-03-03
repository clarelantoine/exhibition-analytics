import { Button } from '@/components/ui/button'

export default function DeleteQR({ id }) {
  const handleDelete = () => {
    console.log(id)
  }
  return (
    <Button variant='destructive' onClick={handleDelete}>
      Delete
    </Button>
  )
}
