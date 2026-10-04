import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactActions } from "@/components/property/ContactActions";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { StatusBadge } from "@/components/property/StatusBadge";
import { Container } from "@/components/ui/Container";
import { getPropertyBySlug } from "@/lib/queries";
import {
  formatPrice,
  hasText,
  listingLabel,
  propertyTypeLabel,
} from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) {
    return { title: "Property not found" };
  }
  const description =
    property.description?.slice(0, 160) ||
    `${property.title} listed with Steppingstone Realty in ${property.location ?? "Guyana"}.`;
  return {
    title: property.title,
    description,
    openGraph: {
      title: property.title,
      description,
      images: property.images[0] ? [{ url: property.images[0].url }] : undefined,
    },
  };
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mt-1 h-4 w-4 shrink-0 text-gold-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const price = formatPrice(
    property.price,
    property.currency,
    property.price_period,
  );

  const facts = [
    { label: "Type", value: propertyTypeLabel(property.property_type) },
    { label: "Listing", value: listingLabel(property.listing_type) },
    property.bedrooms != null
      ? { label: "Bedrooms", value: String(property.bedrooms) }
      : null,
    property.bathrooms != null
      ? { label: "Bathrooms", value: String(property.bathrooms) }
      : null,
    hasText(property.property_size)
      ? { label: "Property size", value: property.property_size }
      : null,
    hasText(property.lot_size) ? { label: "Lot size", value: property.lot_size } : null,
    hasText(property.location) ? { label: "Location", value: property.location } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <Container className="py-10 md:py-14">
      <Link
        href="/properties"
        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-700 transition-colors hover:text-leaf-900"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="m11 18-6-6 6-6" />
        </svg>
        All properties
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <PropertyGallery images={property.images} title={property.title} />
        <div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge listingType={property.listing_type} />
            {property.status !== "available" ? (
              <StatusBadge status={property.status} />
            ) : null}
            {property.is_demo ? (
              <span className="rounded-full bg-gold-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gold-700 shadow-sm">
                Sample listing
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 font-display text-4xl text-leaf-900">
            {property.title}
          </h1>
          {property.location ? (
            <p className="mt-3 flex items-center gap-1.5 text-muted">
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
          {price ? (
            <p className="mt-4 text-2xl font-bold text-leaf-800">{price}</p>
          ) : null}
          {hasText(property.address) ? (
            <p className="mt-3 text-sm text-foreground/80">{property.address}</p>
          ) : null}
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-leaf-900/10 bg-white p-4 shadow-sm"
              >
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-600">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 font-semibold text-foreground">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <ContactActions
              propertyTitle={property.title}
              phone={property.contact_phone}
              email={property.contact_email}
            />
          </div>
        </div>
      </div>

      {hasText(property.description) ? (
        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-3xl text-leaf-900">
            About this property
          </h2>
          <p className="mt-4 whitespace-pre-line text-lg leading-8 text-foreground/85">
            {property.description}
          </p>
        </section>
      ) : null}

      {property.features?.length ? (
        <section className="mt-10 max-w-3xl">
          <h2 className="font-display text-3xl text-leaf-900">Features</h2>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {property.features.map((feature) => (
              <li key={feature} className="flex gap-2.5">
                <CheckIcon />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Container>
  );
}


