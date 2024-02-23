import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Separator } from '@/components/ui/separator'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Exhibition Analytics Web App',
  description: 'Analytics for exhibition web app',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={cn('antialiased font-inter', inter.variable)}>
        <div className='min-h-screen grid grid-rows-[auto_1fr_auto] space-y-6'>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
