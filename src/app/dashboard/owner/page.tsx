
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

export default function OwnerDashboardPage() {
  return (
    <div>
      <DashboardPageHeader
        title="Owner Overview"
        description="Manage your cars, rental requests, and earnings."
      />

      <div className="rounded-xl border bg-background p-6">
        <h2 className="text-lg font-semibold">
          Welcome to DriveEase!
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your owner dashboard is ready. Start by adding your first car.
        </p>
      </div>
    </div>
  );
}
