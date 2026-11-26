"use client"

import Link from "next/link"
import { ChevronDown, LogOut } from "lucide-react"

import { accountLinks } from "@/components/layout/account-links"
import { UserAvatar, type NavbarUser } from "@/components/layout/user-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSignOut } from "@/hooks/use-sign-out"
import { getDashboardRoute } from "@/lib/routes"



export function UserMenu({ user }: { user: NavbarUser }) {
  const { signOut, isPending } = useSignOut()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-transparent p-0.5 pr-2 outline-none transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:bg-muted">
        <UserAvatar user={user} />
        <span className="hidden max-w-32 truncate text-sm font-medium lg:block">
          {user.name}
        </span>
        <ChevronDown
          className="size-4 text-muted-foreground"
          aria-hidden="true"
        />
        <span className="sr-only">Open user menu</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="min-w-64">
        <div className="flex items-center gap-2.5 p-2">
          <UserAvatar user={user} size="lg" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {user.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {accountLinks.map(({ label, href, icon: Icon }) => {
          const linkHref =
            label === "Dashboard"
              ? getDashboardRoute(user.role)
              : href

          return (
            <DropdownMenuItem
              key={href}
              render={<Link href={linkHref} />}
              className="cursor-pointer px-2 py-1.5"
            >
              <Icon aria-hidden="true" />
              {label}
            </DropdownMenuItem>
          )
        })}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer px-2 py-1.5"
          onClick={signOut}
          disabled={isPending}
        >
          <LogOut aria-hidden="true" />
          {isPending ? "Signing out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
