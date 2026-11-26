"use client"

import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import {
  filterAndSortCars,
  hasActiveFilters,
  initialCarFilters,
  type Car,
  type CarFilters,
  type CarSort,
} from "@/lib/cars"
import { useSession } from "@/lib/auth-client"

import { CarCard } from "./car-card"
import { CarFilterBar } from "./car-filter-bar"
import { CarsEmptyState } from "./cars-empty-state"

const sortOptions: { value: CarSort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "rate-asc", label: "Daily rate: low to high" },
  { value: "rate-desc", label: "Daily rate: high to low" },
]

export function CarBrowser({ cars }: { cars: Car[] }) {
  const [filters, setFilters] = useState<CarFilters>(initialCarFilters)
  const [sort, setSort] = useState<CarSort>("newest")
  const { data: session } = useSession()

  const categories = useMemo(
    () => [...new Set(cars.map((car) => car.category))].sort(),
    [cars]
  )
  const locations = useMemo(
    () => [...new Set(cars.map((car) => car.location))].sort(),
    [cars]
  )
  const seatOptions = useMemo(
    () => [...new Set(cars.map((car) => car.seats))].sort((a, b) => a - b),
    [cars]
  )
  const results = useMemo(
    () => filterAndSortCars(cars, filters, sort),
    [cars, filters, sort]
  )

  const updateFilters = (patch: Partial<CarFilters>) =>
    setFilters((current) => ({ ...current, ...patch }))

  const resetFilters = () => setFilters(initialCarFilters)

  return (
    <div className="flex flex-col gap-6">
      <CarFilterBar
        filters={filters}
        onChange={updateFilters}
        categories={categories}
        locations={locations}
        seatOptions={seatOptions}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {results.length} {results.length === 1 ? "car" : "cars"}
        </p>

        <div className="flex items-center gap-2">
          {hasActiveFilters(filters) ? (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Clear filters
            </Button>
          ) : null}

          <Label htmlFor="car-sort" className="text-muted-foreground">
            Sort by
          </Label>
          <NativeSelect
            id="car-sort"
            className="w-48"
            value={sort}
            onChange={(event) => setSort(event.target.value as CarSort)}
          >
            {sortOptions.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>

      {results.length === 0 ? (
        <CarsEmptyState
          isInventoryEmpty={cars.length === 0}
          onReset={resetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isAuthenticated={Boolean(session)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
