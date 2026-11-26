
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

export default function AdminDashboardPage() {
  return (
    <div>
      <DashboardPageHeader
        title="Admin Overview"
        description="Monitor users, cars, and platform transactions."
      />

      <div className="rounded-xl border bg-background p-6">
        <h2 className="text-lg font-semibold">
          Welcome to DriveEase Admin!
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage and monitor the DriveEase platform.
        </p>
      </div>
    </div>
  );
}
