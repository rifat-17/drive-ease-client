import { cn } from "cn"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

/** The subset of a Better Auth user the navbar needs to render. */
export type NavbarUser = {
  name: string
  email: string
  image?: string | null
}

function getInitials(user: NavbarUser) {
  const source = user.name?.trim() || user.email
  const parts = source.split(/\s+/).filter(Boolean)

  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function UserAvatar({
  user,
  size = "default",
  className,
}: {
  user: NavbarUser
  size?: "default" | "sm" | "lg"
  className?: string
}) {
  return (
    <Avatar size={size} className={cn(className)}>
      {user.image ? <AvatarImage src={user.image} alt={user.name} /> : null}
      <AvatarFallback>{getInitials(user)}</AvatarFallback>
    </Avatar>
  )
}
