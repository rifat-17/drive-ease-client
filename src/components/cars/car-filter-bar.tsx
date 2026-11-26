import { Search } from "lucide-react"

import {
  Field,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import {
  fuelTypeLabels,
  transmissionLabels,
  type CarCategory,
  type CarFilters,
} from "@/lib/cars"

type CarFilterBarProps = {
  filters: CarFilters
  onChange: (patch: Partial<CarFilters>) => void
  categories: CarCategory[]
  locations: string[]
  seatOptions: number[]
}

export function CarFilterBar({
  filters,
  onChange,
  categories,
  locations,
  seatOptions,
}: CarFilterBarProps) {
  return (
    <section
      aria-label="Filter cars"
      className="rounded-xl border border-border bg-card p-4 sm:p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field className="sm:col-span-2 lg:col-span-3">
          <FieldLabel htmlFor="car-search">Search</FieldLabel>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="car-search"
              type="search"
              placeholder="Search by brand or model"
              autoComplete="off"
              className="pl-8"
              value={filters.query}
              onChange={(event) => onChange({ query: event.target.value })}
            />
          </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="car-category">Category</FieldLabel>
          <NativeSelect
            id="car-category"
            className="w-full"
            value={filters.category}
            onChange={(event) => onChange({ category: event.target.value })}
          >
            <NativeSelectOption value="all">All categories</NativeSelectOption>
            {categories.map((category) => (
              <NativeSelectOption key={category} value={category}>
                {category}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>

        <Field>
          <FieldLabel htmlFor="car-location">Location</FieldLabel>
          <NativeSelect
            id="car-location"
            className="w-full"
            value={filters.location}
            onChange={(event) => onChange({ location: event.target.value })}
          >
            <NativeSelectOption value="all">All locations</NativeSelectOption>
            {locations.map((location) => (
              <NativeSelectOption key={location} value={location}>
                {location}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>

        <Field>
          <FieldLabel htmlFor="car-transmission">Transmission</FieldLabel>
          <NativeSelect
            id="car-transmission"
            className="w-full"
            value={filters.transmission}
            onChange={(event) =>
              onChange({ transmission: event.target.value })
            }
          >
            <NativeSelectOption value="all">Any transmission</NativeSelectOption>
            {Object.entries(transmissionLabels).map(([value, label]) => (
              <NativeSelectOption key={value} value={value}>
                {label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>

        <Field>
          <FieldLabel htmlFor="car-fuel">Fuel type</FieldLabel>
          <NativeSelect
            id="car-fuel"
            className="w-full"
            value={filters.fuelType}
            onChange={(event) => onChange({ fuelType: event.target.value })}
          >
            <NativeSelectOption value="all">Any fuel type</NativeSelectOption>
            {Object.entries(fuelTypeLabels).map(([value, label]) => (
              <NativeSelectOption key={value} value={value}>
                {label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>

        <Field>
          <FieldLabel htmlFor="car-seats">Seats</FieldLabel>
          <NativeSelect
            id="car-seats"
            className="w-full"
            value={filters.seats}
            onChange={(event) => onChange({ seats: event.target.value })}
          >
            <NativeSelectOption value="all">Any seats</NativeSelectOption>
            {seatOptions.map((seats) => (
              <NativeSelectOption key={seats} value={String(seats)}>
                {seats}+ seats
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>

        <Field>
          <FieldTitle>Daily rate</FieldTitle>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="Min"
              aria-label="Minimum daily rate"
              value={filters.minRate}
              onChange={(event) => onChange({ minRate: event.target.value })}
            />
            <span className="text-muted-foreground" aria-hidden="true">
              –
            </span>
            <Input
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="Max"
              aria-label="Maximum daily rate"
              value={filters.maxRate}
              onChange={(event) => onChange({ maxRate: event.target.value })}
            />
          </div>
        </Field>
      </div>
    </section>
  )
}
