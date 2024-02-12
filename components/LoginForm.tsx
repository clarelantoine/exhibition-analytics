'use client'

import { login, signup } from '@/app/auth/actions'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useToast } from './ui/use-toast'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

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
      // console.log(result.message)
    }
  }

  return (
    <Card className=''>
      <CardHeader>
        <CardTitle> Log in to EventAnaytics ™</CardTitle>
        <CardDescription>
          Enter your credentials below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <div className='flex flex-col space-y-2 text-center'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            Log in to EventAnaytics ™
          </h2>
          <p className='text-sm text-muted-foreground'>
            Enter your email below to create your account
          </p>
        </div> */}
        <form className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='email'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Email
            </label>
            <Input
              className='h-9'
              id='email'
              name='email'
              type='email'
              placeholder='email address'
              required
            />
          </div>
          <div className='flex flex-col gap-2 mb-2'>
            <label
              htmlFor='email'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Password
            </label>
            <Input
              className='h-9'
              id='password'
              name='password'
              type='password'
              placeholder='password'
              required
            />
          </div>

          <Button formAction={handleLogin}>Sign In with Email</Button>
          {/* <button formAction={signup}>Sign up</button> */}
        </form>
      </CardContent>
    </Card>
  )
}
