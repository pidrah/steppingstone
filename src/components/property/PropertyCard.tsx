import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/types";
import { formatPrice, primaryImage } from "@/lib/utils";
import { StatusBadge, TypeBadge } from "@/components/property/StatusBadge";

function isRemote(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

export function PropertyCard({ property }: { property: Property }) {
  const image = primaryImage(property);
  const price = formatPrice(property.price, property.currency, property.price_period);
  const facts = [
    property.bedrooms != null ? `${property.bedrooms} bed` : null,
    property.bathrooms != null ? `${property.bathrooms} bath` : null,
    property.property_size,
  ].filter(Boolean);

  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-muted">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt_text || property.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              unoptimized={!isRemote(image.url)}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-brand-dark/70">
              No photograph yet
            </div>
          )}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <StatusBadge listingType={property.listing_type} />
            {property.status !== "available" ? (
              <StatusBadge status={property.status} />
            ) : null}
          </div>
          {property.is_demo ? (
            <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-700">
              Sample
            </span>
          ) : null}
        </div>
        <div className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl leading-snug text-brand-dark">
              {property.title}
            </h3>
            <TypeBadge type={property.property_type} />
          </div>
          {property.location ? (
            <p className="text-sm text-muted">{property.location}</p>
          ) : null}
          {price ? (
            <p className="text-base font-semibold text-brand">{price}</p>
          ) : (
            <p className="text-sm text-muted">Price on request</p>
          )}
          {facts.length ? (
            <p className="text-sm text-foreground/80">{facts.join(" · ")}</p>
          ) : null}
          {property.description ? (
            <p className="line-clamp-2 text-sm leading-6 text-muted">
              {property.description}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
