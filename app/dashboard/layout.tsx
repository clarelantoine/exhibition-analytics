import Sidebar from '@/components/Sidebar'
import { Separator } from '@/components/ui/separator'

export default function DasboardLayout({ children }) {
  return (
    <div className='grid lg:grid-cols-5'>
      <Sidebar />
      {/* <Separator orientation='vertical' /> */}
      <main className='col-span-3 lg:col-span-4 lg:border-l border-l'>
        <div className='h-full px-4 py-6 lg:px-8'>{children}</div>
      </main>
    </div>
  )
}
