import Image from "next/image"
import Link from "next/link"
import { Fuel, MapPin, Settings2, Users } from "lucide-react"
import { cn } from "cn"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fuelTypeLabels, transmissionLabels, type Car } from "@/lib/cars"
import { carRoutes, routes } from "@/lib/routes"

export function CarCard({
  car,
  isAuthenticated,
}: {
  car: Car
  isAuthenticated: boolean
}) {
  // Guests are sent to sign in before they can open or request a car.
  const detailsHref = isAuthenticated ? carRoutes.details(car.id) : routes.signIn
  const requestHref = isAuthenticated ? carRoutes.request(car.id) : routes.signIn

  return (
    <Card className="pt-0">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
        <Badge variant="secondary" className="absolute top-3 left-3">
          {car.category}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="truncate">
          {car.brand} {car.model}
        </CardTitle>
        <CardDescription className="flex items-center gap-1.5">
          <MapPin className="size-3.5" aria-hidden="true" />
          {car.location}
        </CardDescription>
        <CardAction className="text-right">
          <p className="font-heading text-lg font-semibold text-foreground">
            ${car.dailyRate}
          </p>
          <p className="text-xs text-muted-foreground">per day</p>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <Settings2 className="size-4" aria-hidden="true" />
            {transmissionLabels[car.transmission]}
          </li>
          <li className="flex items-center gap-1.5">
            <Fuel className="size-4" aria-hidden="true" />
            {fuelTypeLabels[car.fuelType]}
          </li>
          <li className="flex items-center gap-1.5">
            <Users className="size-4" aria-hidden="true" />
            {car.seats} seats
          </li>
        </ul>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-2">
        <Link
          href={detailsHref}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "w-full"
          )}
        >
          View Details
        </Link>
        <Link
          href={requestHref}
          className={cn(buttonVariants({ size: "sm" }), "w-full")}
        >
          Request Rental
        </Link>
      </CardFooter>
    </Card>
  )
}
