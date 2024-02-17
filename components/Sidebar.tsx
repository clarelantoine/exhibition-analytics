'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { Card, CardContent } from './ui/card'

export default function Sidebar() {
  return (
    // <Card className=''>
    //   <CardContent>

    //   </CardContent>
    // </Card>

    <aside className='pb-12 hidden lg:block'>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <h1 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
            Navigation
          </h1>
          <NavigationMenu orientation='vertical'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href='/docs' legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Documentation
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </aside>
  )
}
