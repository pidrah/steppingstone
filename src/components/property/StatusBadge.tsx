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
    available: "bg-leaf-500/25 text-leaf-200 ring-1 ring-leaf-400/30",
    sold: "bg-ink-950/90 text-gold-200 ring-1 ring-white/10",
    rented: "bg-leaf-800/90 text-white",
    under_offer: "bg-gold-400/95 text-ink-950",
    unavailable: "bg-white/15 text-white/80",
    sale: "bg-leaf-600/95 text-white",
    rent: "bg-leaf-800/95 text-white",
    managed: "bg-gold-500/95 text-ink-950",
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
        styles[value] ?? "bg-white/15 text-white ring-1 ring-white/10",
      )}
    >
      {label}
    </span>
  );
}

export function TypeBadge({ type }: { type: PropertyType | string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-ink-900/85 px-2.5 py-1 text-xs font-semibold text-leaf-200 shadow-sm ring-1 ring-leaf-400/25 backdrop-blur-sm">
      {propertyTypeLabel(type)}
    </span>
  );
}
