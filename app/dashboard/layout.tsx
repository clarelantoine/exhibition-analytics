import { SidebarNav } from '@/components/SidebarNav'
import { Separator } from '@/components/ui/separator'
import { LayoutDashboard, ListTodo, QrCode } from 'lucide-react'

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    test: 'hey test',
    icon: <LayoutDashboard className='mr-2 h-4 w-4' />,
  },
  {
    title: 'QR Code',
    href: '/dashboard/qrcode',
    test: 'hey test',
    icon: <QrCode className='mr-2 h-4 w-4' />,
  },
  {
    title: 'Survey',
    href: '/dashboard/survey',
    test: 'hey test',
    icon: <ListTodo className='mr-2 h-4 w-4' />,
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
    <div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
      <aside className='hidden sm:flex flex-col'>
        <SidebarNav items={sidebarNavItems} />
      </aside>
      {/* <Separator orientation='vertical' /> */}
      <main className=''>
        <div className=''>{children}</div>
      </main>
    </div>
  )
}
