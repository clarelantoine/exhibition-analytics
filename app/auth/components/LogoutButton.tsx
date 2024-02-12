'use client'

import { LogOut } from 'lucide-react'
import { signout } from '../actions'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export default function LogoutButton() {
  return (
    <DropdownMenuItem className='flex' onClick={() => signout()}>
      <LogOut className='mr-2 h-4 w-4' />
      <span>Log out</span>
    </DropdownMenuItem>
  )
}
