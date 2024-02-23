import LogoutButton from '@/app/auth/components/LogoutButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/utils/supabase/server'
import { User } from 'lucide-react'
import { cookies } from 'next/headers'
import { Separator } from './ui/separator'

export default async function Header() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header>
      <div className='container flex h-16 items-center justify-between py-4'>
        <p className='text-xl font-medium tracking-tight'>EventAnaytics ™</p>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className='focus-visible:outline-none'>
              <Avatar className='w-8 h-8'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    Hey Clarel!
                  </p>
                  <p className='text-xs leading-none font-normal text-muted-foreground'>
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className='text-sm'>
                  <User className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutButton />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <Separator />
    </header>
  )
}
