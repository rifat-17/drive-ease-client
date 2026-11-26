
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CarFront,
  PlusCircle,
  ClipboardList,
  CreditCard,
  UserRound,
  Users,
  Receipt,
  type LucideIcon,
} from "lucide-react";

import { Brand } from "@/components/layout/brand";
import type { DashboardNavItem } from "@/lib/dashboard-nav";

const icons: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "car-front": CarFront,
  "plus-circle": PlusCircle,
  "clipboard-list": ClipboardList,
  "credit-card": CreditCard,
  "user-round": UserRound,
  users: Users,
  receipt: Receipt,
};

type DashboardSidebarProps = {
  role: string;
  navItems: DashboardNavItem[];
};

export function DashboardSidebar({
  role,
  navItems,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b bg-background lg:min-h-[calc(100vh-4rem)] lg:w-64 lg:border-b-0 lg:border-r">
      <div className="hidden border-b p-5 lg:block">
        <Brand />
      </div>

      <div className="border-b px-5 py-4 lg:border-b-0">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {role} Dashboard
        </p>
      </div>

      <nav
        aria-label="Dashboard navigation"
        className="flex gap-1 overflow-x-auto p-3 lg:flex-col lg:overflow-visible"
      >
        {navItems.map((item) => {
          const Icon = icons[item.icon];

          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard/" + role.toLowerCase() &&
              pathname.startsWith(item.href + "/"));

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {Icon && <Icon className="size-4 shrink-0" />}
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
