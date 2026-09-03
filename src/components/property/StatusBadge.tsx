import {
  listingLabel,
  propertyTypeLabel,
  statusLabel,
  cn,
} from "@/lib/utils";
import type { ListingType, PropertyStatus, PropertyType } from "@/lib/types";

export function StatusBadge({
  status,
  listingType,
}: {
  status?: PropertyStatus | string;
  listingType?: ListingType | string;
}) {
  const value = status ?? listingType;
  if (!value) return null;

  const styles: Record<string, string> = {
    available: "bg-brand-muted text-brand-dark",
    sold: "bg-neutral-800 text-white",
    rented: "bg-neutral-700 text-white",
    under_offer: "bg-amber-100 text-amber-950",
    unavailable: "bg-neutral-200 text-neutral-700",
    sale: "bg-brand text-white",
    rent: "bg-brand-dark text-white",
    managed: "bg-emerald-950 text-white",
  };

  const label = status
    ? statusLabel(status)
    : listingType
      ? listingLabel(listingType as ListingType)
      : value;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-wide",
        styles[value] ?? "bg-neutral-100 text-neutral-800",
      )}
    >
      {label}
    </span>
  );
}

export function TypeBadge({ type }: { type: PropertyType | string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-foreground">
      {propertyTypeLabel(type)}
    </span>
  );
}
