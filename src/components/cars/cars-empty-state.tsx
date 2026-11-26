import { SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function CarsEmptyState({
  isInventoryEmpty,
  onReset,
}: {
  isInventoryEmpty: boolean
  onReset: () => void
}) {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>
          {isInventoryEmpty ? "No cars available yet" : "No cars match your filters"}
        </EmptyTitle>
        <EmptyDescription>
          {isInventoryEmpty
            ? "New cars will appear here as soon as they are listed."
            : "Try a different search or clear the filters to see more cars."}
        </EmptyDescription>
      </EmptyHeader>

      {isInventoryEmpty ? null : (
        <EmptyContent>
          <Button variant="outline" size="sm" onClick={onReset}>
            Clear filters
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}
