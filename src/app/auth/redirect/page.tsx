
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { getDashboardRoute, routes } from "@/lib/routes";

export default function AuthRedirectPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace(routes.signIn);
      return;
    }

    const destination = getDashboardRoute(session.user.role);

    router.replace(destination);
  }, [session, isPending, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />

      <p className="text-sm text-muted-foreground">
        Redirecting to your dashboard...
      </p>
    </div>
  );
}
