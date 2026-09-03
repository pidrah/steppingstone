import type { ReactNode } from "react";
import type { Property } from "@/lib/types";
import { PropertyCard } from "@/components/property/PropertyCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function PropertyGrid({
  properties,
  emptyTitle = "No properties currently available.",
  emptyDescription = "Please check back soon, or contact Steppingstone Realty for current listings.",
  emptyAction,
}: {
  properties: Property[];
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
}) {
  if (!properties.length) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
