"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOut, Menu } from "lucide-react"
import { cn } from "cn"

import { accountLinks } from "@/components/layout/account-links"
import { Brand } from "@/components/layout/brand"
import { NavLink } from "@/components/layout/nav-link"
import { UserAvatar, type NavbarUser } from "@/components/layout/user-avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useSignOut } from "@/hooks/use-sign-out"
import {
  publicNavLinks,
  routes,
  getDashboardRoute,
} from "@/lib/routes"

const linkClassName =
  "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
const activeLinkClassName =
  "bg-accent/10 text-accent hover:bg-accent/10 hover:text-accent dark:bg-primary/10 dark:text-primary dark:hover:bg-primary/10 dark:hover:text-primary"

export function MobileNav({ user }: { user: NavbarUser | null }) {
  const [open, setOpen] = useState(false)
  const { signOut, isPending } = useSignOut()

  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Open navigation menu" />
        }
      >
        <Menu className="size-5" aria-hidden="true" />
      </SheetTrigger>

      <SheetContent side="right" className="w-80 max-w-[85vw] gap-0 p-0">
        <SheetHeader className="border-b border-border px-4 py-4 pr-12">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Main navigation for DriveEase
          </SheetDescription>
          <Brand onNavigate={close} />
        </SheetHeader>

        <nav
          aria-label="Mobile navigation"
          className="flex flex-1 flex-col gap-1 overflow-y-auto p-3"
        >
          {publicNavLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              onClick={close}
              className={linkClassName}
              activeClassName={activeLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <>
              <Separator className="my-2" />
              {accountLinks.map(({ label, href, icon: Icon }) => {
                const linkHref =
                  label === "Dashboard"
                    ? getDashboardRoute(user.role)
                    : href

                return (
                  <NavLink
                    key={href}
                    href={linkHref}
                    onClick={close}
                    className={linkClassName}
                    activeClassName={activeLinkClassName}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </NavLink>
                )
              })}
            </>
          ) : null}
        </nav>

        <div className="border-t border-border p-3">
          {user ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5 rounded-lg bg-muted/60 p-2">
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

              <button
                type="button"
                onClick={() => {
                  close()
                  signOut()
                }}
                disabled={isPending}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10",
                  "disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                <LogOut className="size-4" aria-hidden="true" />
                {isPending ? "Signing out..." : "Log out"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href={routes.signIn}
                onClick={close}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full justify-center"
                )}
              >
                Sign In
              </Link>
              <Link
                href={routes.signUp}
                onClick={close}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full justify-center"
                )}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
