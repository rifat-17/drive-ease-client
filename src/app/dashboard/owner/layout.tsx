
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ownerNavItems } from "@/lib/dashboard-nav";
import { requireRole } from "@/lib/auth-guard";

export default async function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("OWNER");

  return (
    <DashboardLayout
      role="OWNER"
      navItems={ownerNavItems}
    >
      {children}
    </DashboardLayout>
  );
}
