"use client"

import type { ReactNode } from "react"
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import {
  carCategories,
  fuelTypeLabels,
  transmissionLabels,
} from "@/lib/cars"

import { CarImagesField } from "./car-images-field"

function FormSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {children}
    </section>
  )
}

export function AddCarForm() {
  // Submission and validation will be wired up later.
  return (
    <Card className="max-w-3xl">
      <form onSubmit={(event) => event.preventDefault()}>
        <CardContent className="flex flex-col gap-8">
          <FormSection
            title="Car details"
            description="Basic information about the car."
          >
            <FieldGroup className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="car-brand">Brand</FieldLabel>
                <Input id="car-brand" name="brand" placeholder="Toyota" />
              </Field>

              <Field>
                <FieldLabel htmlFor="car-model">Model</FieldLabel>
                <Input id="car-model" name="model" placeholder="Corolla" />
              </Field>

              <Field>
                <FieldLabel htmlFor="car-year">Year</FieldLabel>
                <Input
                  id="car-year"
                  name="year"
                  type="number"
                  inputMode="numeric"
                  min={1900}
                  max={2100}
                  placeholder="2022"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="car-category">Category</FieldLabel>
                <NativeSelect
                  id="car-category"
                  name="category"
                  defaultValue=""
                  className="w-full"
                >
                  <NativeSelectOption value="" disabled>
                    Select a category
                  </NativeSelectOption>
                  {carCategories.map((category) => (
                    <NativeSelectOption key={category} value={category}>
                      {category}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>

              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="car-description">Description</FieldLabel>
                <Textarea
                  id="car-description"
                  name="description"
                  rows={4}
                  placeholder="Describe the car, its condition, and any features renters should know about."
                />
              </Field>
            </FieldGroup>
          </FormSection>

          <FormSection
            title="Rental details"
            description="How the car is rented and what it costs."
          >
            <FieldGroup className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="car-rate">Daily rate (৳)</FieldLabel>
                <Input
                  id="car-rate"
                  name="dailyRate"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  placeholder="0"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="car-pickup-location">
                  Pickup location
                </FieldLabel>
                <Input
                  id="car-pickup-location"
                  name="pickupLocation"
                  placeholder="Dhaka"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="car-transmission">
                  Transmission
                </FieldLabel>
                <NativeSelect
                  id="car-transmission"
                  name="transmission"
                  defaultValue=""
                  className="w-full"
                >
                  <NativeSelectOption value="" disabled>
                    Select a transmission
                  </NativeSelectOption>
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
                  name="fuelType"
                  defaultValue=""
                  className="w-full"
                >
                  <NativeSelectOption value="" disabled>
                    Select a fuel type
                  </NativeSelectOption>
                  {Object.entries(fuelTypeLabels).map(([value, label]) => (
                    <NativeSelectOption key={value} value={value}>
                      {label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>

              <Field>
                <FieldLabel htmlFor="car-seats">Seats</FieldLabel>
                <Input
                  id="car-seats"
                  name="seats"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={12}
                  placeholder="5"
                />
              </Field>
            </FieldGroup>
          </FormSection>

          <FormSection
            title="Photos"
            description="Upload one or more photos of the car."
          >
            <CarImagesField />
          </FormSection>
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Link
            href="/dashboard/owner/my-cars"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <Button type="submit">Add car</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
