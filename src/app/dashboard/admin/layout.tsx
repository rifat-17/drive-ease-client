
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { adminNavItems } from "@/lib/dashboard-nav";
import { requireRole } from "@/lib/auth-guard";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("ADMIN");

  return (
    <DashboardLayout
      role="ADMIN"
      navItems={adminNavItems}
    >
      {children}
    </DashboardLayout>
  );
}
