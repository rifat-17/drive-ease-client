
import type { ReactNode } from "react";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import type { DashboardNavItem } from "@/lib/dashboard-nav";

type DashboardLayoutProps = {
  children: ReactNode;
  role: string;
  navItems: DashboardNavItem[];
};

export function DashboardLayout({
  children,
  role,
  navItems,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="mx-auto flex max-w-[1600px] flex-col lg:flex-row">
        <DashboardSidebar
          role={role}
          navItems={navItems}
        />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
