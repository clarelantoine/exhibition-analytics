import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import LogoutButton from '../auth/components/LogoutButton'

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <div className='dashboard'>
      <p>Hello {data.user.email}</p>
      <LogoutButton />
    </div>
  )
}
