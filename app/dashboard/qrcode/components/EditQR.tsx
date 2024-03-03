import { Button } from '@/components/ui/button'

export default function EditQR({ item }) {
  const handleEdit = () => {
    console.log(item)
  }

  return (
    <Button variant='outline' onClick={handleEdit}>
      Edit
    </Button>
  )
}
