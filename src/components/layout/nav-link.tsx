"use client"

import type { ComponentProps } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "cn"

type NavLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string
  /** Classes applied only while this link matches the current path. */
  activeClassName?: string
}

export function NavLink({
  href,
  className,
  activeClassName,
  ...props
}: NavLinkProps) {
  const pathname = usePathname()
  const target = typeof href === "string" ? href : (href.pathname ?? "")

  const isActive =
    target === "/"
      ? pathname === "/"
      : pathname === target || pathname.startsWith(`${target}/`)

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive || undefined}
      className={cn(className, isActive && activeClassName)}
      {...props}
    />
  )
}
