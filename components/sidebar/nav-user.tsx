'use client'

import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { signOut, useSession } from '@/lib/auth/auth-client'
import { useRouter } from 'next/navigation'
import GeneratedAvatar from '../ui/generated-avatar'

export function NavUser() {
  const router = useRouter()
  const { isMobile } = useSidebar()
  const session = useSession()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent cursor-pointer data-[state=open]:text-sidebar-accent-foreground"
            >
              {session.data?.user.image ? (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.data?.user.image} alt={'avatar'} />
                  <AvatarFallback className="rounded-lg">Ava</AvatarFallback>
                </Avatar>
              ) : (
                <GeneratedAvatar
                  seed={(session.data?.user.name as string) ?? ''}
                  variant="initials"
                  className="h-8 w-8"
                />
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {session.data?.user.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {session.data?.user.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {session.data?.user.image ? (
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.data?.user.image}
                      alt={'avatar'}
                    />
                    <AvatarFallback className="rounded-lg">Ava</AvatarFallback>
                  </Avatar>
                ) : (
                  <GeneratedAvatar
                    seed={(session.data?.user.name as string) ?? ''}
                    variant="initials"
                    className="h-8 w-8"
                  />
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session.data?.user.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {session.data?.user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserCircleIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push('/login')
                    },
                  },
                })
              }}
              className="cursor-pointer"
            >
              <LogOutIcon />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
