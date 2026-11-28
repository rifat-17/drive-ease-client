
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { serverApi } from "@/lib/apis";


interface OwnerOverview {
  totalCars: number;
  availableCars: number;
  pendingRequests: number;
  acceptedRentals: number;
  completedRentals: number;
  totalEarnings: number;
  subscriptionPlan: string;
}

interface OwnerOverviewResponse {
  success: boolean;
  data: OwnerOverview;
}

export default async function OwnerDashboardPage() {
  const response: OwnerOverviewResponse = await serverApi(
    "/api/owners/overview"
  );

  const stats = [
    {
      title: "Total Cars",
      value: response.data.totalCars,
    },
    {
      title: "Available Cars",
      value: response.data.availableCars,
    },
    {
      title: "Pending Requests",
      value: response.data.pendingRequests,
    },
    {
      title: "Accepted Rentals",
      value: response.data.acceptedRentals,
    },
    {
      title: "Completed Rentals",
      value: response.data.completedRentals,
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Owner Overview"
        description="Manage your cars, rental requests, and earnings."
      />

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border bg-background p-5"
          >
            <p className="text-sm text-muted-foreground">
              {stat.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Earnings and Subscription */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-background p-6">
          <p className="text-sm text-muted-foreground">
            Total Earnings
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            ৳{response.data.totalEarnings.toLocaleString("en-BD")}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Earnings from completed rentals
          </p>
        </div>

        <div className="rounded-xl border bg-background p-6">
          <p className="text-sm text-muted-foreground">
            Current Subscription
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            {response.data.subscriptionPlan}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {response.data.subscriptionPlan === "PRO"
              ? "You have access to unlimited active cars."
              : "Your free plan allows up to 2 active cars."}
          </p>
        </div>
      </div>
    </div>
  );
}
