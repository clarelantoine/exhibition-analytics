import { SidebarNav } from '@/components/SidebarNav'
import { Separator } from '@/components/ui/separator'

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'QR Code',
    href: '/dashboard/qrcode',
  },
  {
    title: 'Survey',
    href: '/dashboard/survey',
  },
  // {
  //   title: 'Notifications',
  //   href: '/examples/forms/notifications',
  // },
  // {
  //   title: 'Display',
  //   href: '/examples/forms/display',
  // },
]

export default function DasboardLayout({ children }) {
  return (
    <div className='grid lg:grid-cols-5'>
      <aside className=' -ml-4 py-6 '>
        <SidebarNav items={sidebarNavItems} />
      </aside>
      {/* <Separator orientation='vertical' /> */}
      <main className='col-span-3 lg:col-span-4'>
        <div className='h-full px-4 py-6 lg:px-8'>{children}</div>
      </main>
    </div>
  )
}
