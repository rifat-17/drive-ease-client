import { ImagePlus } from "lucide-react"

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function CarImagesField() {
  return (
    <Field>
      <FieldLabel htmlFor="car-images">Car images</FieldLabel>

      <label
        htmlFor="car-images"
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-input bg-muted/30 px-4 py-10 text-center transition-colors hover:bg-muted/50 has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-background text-muted-foreground">
          <ImagePlus className="size-5" aria-hidden="true" />
        </span>
        <span className="text-sm font-medium">Upload images</span>
        <span className="text-xs text-muted-foreground">
          JPG or PNG, up to 5 MB each.
        </span>
        <Input
          id="car-images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
        />
      </label>

      <FieldDescription>
        Select one or more photos of the exterior and interior.
      </FieldDescription>
    </Field>
  )
}
