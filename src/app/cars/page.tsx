import type { Metadata } from "next"

import { CarBrowser } from "@/components/cars/car-browser"
import { getAvailableCars } from "@/lib/cars"

export const metadata: Metadata = {
  title: "Browse Cars | DriveEase",
  description: "Find the right car for your next trip.",
}

export default function BrowseCarsPage() {
  const cars = getAvailableCars()

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Browse cars
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find the right car for your next trip.
        </p>
      </header>

      <div className="mt-8">
        <CarBrowser cars={cars} />
      </div>
    </div>
  )
}
