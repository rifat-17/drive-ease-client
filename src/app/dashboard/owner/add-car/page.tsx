import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { AddCarForm } from "@/components/dashboard/owner/add-car-form"

export default function AddCarPage() {
  return (
    <div>
      <DashboardPageHeader
        title="Add Car"
        description="List a new car for renters to book."
      />

      <AddCarForm />
    </div>
  )
}
