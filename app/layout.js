import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

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
      <body
        className={cn('min-h-screen antialiased font-inter', inter.variable)}
      >
        <main className='container'>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
