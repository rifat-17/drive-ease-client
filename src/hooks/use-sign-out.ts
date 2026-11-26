"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

import { authClient } from "@/lib/auth-client"
import { routes } from "@/lib/routes"

/**
 * Signs the user out through Better Auth and refreshes the app so both
 * client and server components see the new session state.
 */
export function useSignOut() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const signOut = () => {
    startTransition(async () => {
      const { error } = await authClient.signOut()

      if (error) {
        console.error("Unable to sign out:", error)
        return
      }

      router.push(routes.home)
      router.refresh()
    })
  }

  return { signOut, isPending }
}
