
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

export default function RenterDashboardPage() {
  return (
    <div>
      <DashboardPageHeader
        title="Renter Overview"
        description="Manage your rentals and explore available cars."
      />

      <div className="rounded-xl border bg-background p-6">
        <h2 className="text-lg font-semibold">
          Welcome to DriveEase!
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Find your next ride and manage your rental activity.
        </p>
      </div>
    </div>
  );
}
