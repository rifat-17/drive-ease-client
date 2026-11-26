import { LayoutDashboard, Settings } from "lucide-react"

import { accountNavLinks, routes } from "@/lib/routes"

const icons = {
  [routes.dashboard]: LayoutDashboard,
  [routes.profileSettings]: Settings,
} as const

export const accountLinks = accountNavLinks.map((link) => ({
  ...link,
  icon: icons[link.href],
}))
