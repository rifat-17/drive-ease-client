
export type DashboardNavItem = {
  label: string;
  href: string;
  icon: string;
};

export const ownerNavItems: DashboardNavItem[] = [
  {
    label: "Overview",
    href: "/dashboard/owner",
    icon: "layout-dashboard",
  },
  {
    label: "My Cars",
    href: "/dashboard/owner/my-cars",
    icon: "car-front",
  },
  {
    label: "Add Car",
    href: "/dashboard/owner/add-car",
    icon: "plus-circle",
  },
  {
    label: "Rental Requests",
    href: "/dashboard/owner/rental-requests",
    icon: "clipboard-list",
  },
  {
    label: "Subscription",
    href: "/dashboard/owner/subscription",
    icon: "credit-card",
  },
  {
    label: "Profile Settings",
    href: "/settings/profile",
    icon: "user-round",
  },
];

export const renterNavItems: DashboardNavItem[] = [
  {
    label: "Overview",
    href: "/dashboard/renter",
    icon: "layout-dashboard",
  },
  {
    label: "My Rentals",
    href: "/dashboard/renter/rentals",
    icon: "car-front",
  },
  {
    label: "Profile Settings",
    href: "/settings/profile",
    icon: "user-round",
  },
];

export const adminNavItems: DashboardNavItem[] = [
  {
    label: "Overview",
    href: "/dashboard/admin",
    icon: "layout-dashboard",
  },
  {
    label: "Manage Users",
    href: "/dashboard/admin/users",
    icon: "users",
  },
  {
    label: "Manage Cars",
    href: "/dashboard/admin/cars",
    icon: "car-front",
  },
  {
    label: "Transactions",
    href: "/dashboard/admin/transactions",
    icon: "receipt",
  },
];
