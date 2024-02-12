import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <div className='flex flex-col items-center justify-center my-28'>
      <div className='w-full sm:max-w-md'>
        <LoginForm />
      </div>
    </div>
  )
}
