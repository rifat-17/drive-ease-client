
/**
 * Central route map for the app.
 */
export const routes = {
  home: "/",
  cars: "/cars",
  signIn: "/sign-in",
  signUp: "/sign-up",
  
  authRedirect: "/auth/redirect",
  
  dashboard: "/dashboard",
  renterDashboard: "/dashboard/renter",
  ownerDashboard: "/dashboard/owner",
  adminDashboard: "/dashboard/admin",
  profileSettings: "/settings/profile",
} as const;

export type Route = (typeof routes)[keyof typeof routes];

export const publicNavLinks = [
  { label: "Home", href: routes.home },
  { label: "Browse Cars", href: routes.cars },
] as const;

export const accountNavLinks = [
  { label: "Dashboard", href: routes.dashboard },
  { label: "Profile Settings", href: routes.profileSettings },
] as const;

export const carRoutes = {
  details: (carId: string) => `/cars/${carId}`,
  request: (carId: string) => `/cars/${carId}/request`,
} as const;

export const getDashboardRoute = (role: string): Route => {
  switch (role) {
    case "RENTER":
      return routes.renterDashboard;

    case "OWNER":
      return routes.ownerDashboard;

    case "ADMIN":
      return routes.adminDashboard;

    default:
      return routes.home;
  }
};
