import type { Metadata } from "next"
import Link from "next/link"

import { SignUpForm } from "@/components/auth/sign-up-form"
import { routes } from "@/lib/routes"

export const metadata: Metadata = {
  title: "Sign Up | DriveEase",
  description: "Create a DriveEase account as a renter or an owner.",
}

export default function SignUpPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 py-12 sm:px-6">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="text-muted-foreground">
          Join DriveEase to book cars or list your own.
        </p>
      </header>

      <SignUpForm />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href={routes.signIn}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
