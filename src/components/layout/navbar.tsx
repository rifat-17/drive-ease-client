"use client"

import Link from "next/link"
import { cn } from "cn"

import { Brand } from "@/components/layout/brand"
import { MobileNav } from "@/components/layout/mobile-nav"
import { NavLink } from "@/components/layout/nav-link"
import { UserMenu } from "@/components/layout/user-menu"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useSession } from "@/lib/auth-client"
import { publicNavLinks, routes } from "@/lib/routes"



const linkClassName =
  "rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
const activeLinkClassName =
  "bg-accent/10 text-accent hover:bg-accent/10 hover:text-accent dark:bg-primary/10 dark:text-primary dark:hover:bg-primary/10 dark:hover:text-primary"

export function Navbar() {
  const { data: session, isPending } = useSession()
  

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav
        aria-label="Main navigation"
        className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Brand />

        <div className="hidden items-center justify-center gap-1 md:flex">
          {publicNavLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className={linkClassName}
              activeClassName={activeLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="col-start-3 flex items-center justify-end gap-2">
          <div className="hidden items-center gap-2 md:flex">
            {isPending ? (
              <Skeleton className="h-9 w-40 rounded-full" />
            ) : session ? (
              <UserMenu user={session.user} />
            ) : (
              <>
                <Link
                  href={routes.signIn}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "text-sm"
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href={routes.signUp}
                  className={cn(buttonVariants({ size: "lg" }), "text-sm")}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center md:hidden">
            {isPending ? (
              <Skeleton className="size-9 rounded-lg" />
            ) : (
              <MobileNav user={session?.user ?? null} />
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
