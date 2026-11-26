
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { renterNavItems } from "@/lib/dashboard-nav";
import { requireRole } from "@/lib/auth-guard";

export default async function RenterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("RENTER");

  return (
    <DashboardLayout
      role="RENTER"
      navItems={renterNavItems}
    >
      {children}
    </DashboardLayout>
  );
}
