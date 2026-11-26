/**
 * Central route map for the app. Keep every navigation target here so links
 * stay consistent and paths can be changed in one place.
 */
export const routes = {
  home: "/",
  cars: "/cars",
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/dashboard",
  profileSettings: "/settings/profile",
} as const

export type Route = (typeof routes)[keyof typeof routes]

export const publicNavLinks = [
  { label: "Home", href: routes.home },
  { label: "Browse Cars", href: routes.cars },
] as const

export const accountNavLinks = [
  { label: "Dashboard", href: routes.dashboard },
  { label: "Profile Settings", href: routes.profileSettings },
] as const
