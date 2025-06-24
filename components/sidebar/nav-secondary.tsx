'use client'

import * as React from 'react'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import { navSecondary } from './configs'
import { isActiveSideBar } from './helper'

export function NavSecondary({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathName = usePathname()
  const isActive = (url: string) =>
    isActiveSideBar({ pathname: pathName, sidebarUrl: url })

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {navSecondary.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton isActive={isActive(item.url)} asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
