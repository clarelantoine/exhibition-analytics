'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'
import { JSXElementConstructor, ReactElement } from 'react'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: ReactElement
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('grid items-start gap-2', className)} {...props}>
      {items.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-muted',
            'justify-start h-auto px-3',
          )}
        >
          {/* <span className='group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground bg-accent'> */}
          <span className=''>{item.icon}</span>
          <span>{item.title}</span>
          {/* </span> */}
        </Link>
      ))}
    </nav>
  )
}
