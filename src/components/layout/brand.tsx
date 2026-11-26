import Link from "next/link"
import { CarFront } from "lucide-react"
import { cn } from "cn"

import { routes } from "@/lib/routes"

export function Brand({
  className,
  onNavigate,
}: {
  className?: string
  onNavigate?: () => void
}) {
  return (
    <Link
      href={routes.home}
      onClick={onNavigate}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:-translate-y-0.5 dark:ring-white/10">
        <CarFront className="size-5" aria-hidden="true" />
      </span>
      <span className="text-lg font-semibold tracking-tight text-foreground">
        Drive<span className="text-accent dark:text-primary">Ease</span>
      </span>
    </Link>
  )
}
