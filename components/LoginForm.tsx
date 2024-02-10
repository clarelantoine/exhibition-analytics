'use client'

import { login, signup } from '@/app/auth/actions'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useToast } from './ui/use-toast'

export default function LoginForm() {
  const { toast } = useToast()

  // handle user login
  async function handleLogin(formdata: FormData) {
    const result = await login(formdata)

    if (result?.message) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: result.message,
      })
      console.log(result.message)
    }
  }

  return (
    <form className='flex flex-col gap-3'>
      <Input
        id='email'
        name='email'
        type='email'
        placeholder='Email address'
        required
      />
      <Input
        id='password'
        name='password'
        type='password'
        placeholder='Password'
        required
      />
      <Button formAction={handleLogin}>Sign In with Email</Button>
      <button formAction={signup}>Sign up</button>
    </form>
  )
}
