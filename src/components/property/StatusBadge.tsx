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
    available: "bg-leaf-100/90 text-leaf-800",
    sold: "bg-leaf-950/90 text-gold-100",
    rented: "bg-leaf-800/90 text-white",
    under_offer: "bg-gold-400/95 text-leaf-950",
    unavailable: "bg-neutral-200/90 text-neutral-700",
    sale: "bg-leaf-600/95 text-white",
    rent: "bg-leaf-800/95 text-white",
    managed: "bg-gold-500/95 text-leaf-950",
  };

  const label = status
    ? statusLabel(status)
    : listingType
      ? listingLabel(listingType as ListingType)
      : value;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide shadow-sm backdrop-blur-sm",
        styles[value] ?? "bg-white/90 text-neutral-800",
      )}
    >
      {label}
    </span>
  );
}

export function TypeBadge({ type }: { type: PropertyType | string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-leaf-900 shadow-sm ring-1 ring-leaf-900/10 backdrop-blur-sm">
      {propertyTypeLabel(type)}
    </span>
  );
}
