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
    <article className="group relative overflow-hidden rounded-2xl border border-leaf-900/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-leaf-100">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt_text || property.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-[1.05]"
              unoptimized={!isRemote(image.url)}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-medium text-leaf-900/60">
              Photograph coming soon
            </div>
          )}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-leaf-950/60 to-transparent"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <StatusBadge listingType={property.listing_type} />
            {property.status !== "available" ? (
              <StatusBadge status={property.status} />
            ) : null}
          </div>
          {property.is_demo ? (
            <span className="absolute right-3 top-3 rounded-full bg-gold-100/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold-700 shadow-sm">
              Sample
            </span>
          ) : null}
          {price ? (
            <span className="absolute bottom-3 left-3 rounded-full bg-leaf-950/75 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm backdrop-blur-sm">
              {price}
            </span>
          ) : (
            <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3.5 py-1.5 text-sm font-semibold text-leaf-900 shadow-sm backdrop-blur-sm">
              Price on request
            </span>
          )}
        </div>
        <div className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl leading-snug text-leaf-900">
              {property.title}
            </h3>
            <TypeBadge type={property.property_type} />
          </div>
          {property.location ? (
            <p className="flex items-center gap-1.5 text-sm text-muted">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-gold-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {property.location}
            </p>
          ) : null}
          {property.description ? (
            <p className="line-clamp-2 text-sm leading-6 text-muted">
              {property.description}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-leaf-900/5 pt-3">
            {facts.length ? (
              <p className="text-sm text-foreground/75">{facts.join(" · ")}</p>
            ) : null}
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-leaf-700 transition-colors group-hover:text-leaf-900">
              View
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 text-gold-500 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
