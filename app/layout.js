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
      <body
        className={cn(
          'flex flex-col min-h-screen antialiased font-inter',
          inter.variable,
        )}
      >
        <Header />
        <main className='container px-5'>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
