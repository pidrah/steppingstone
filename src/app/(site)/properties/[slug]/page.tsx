import type { Metadata } from "next";

export const dynamic = "force-dynamic";
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
      <Link href="/properties" className="text-sm font-semibold text-brand hover:underline">
        ← All properties
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
              <span className="rounded-full bg-neutral-200 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-700">
                Sample listing
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 font-display text-4xl text-brand-dark">{property.title}</h1>
          {property.location ? (
            <p className="mt-2 text-muted">{property.location}</p>
          ) : null}
          {price ? (
            <p className="mt-4 text-2xl font-semibold text-brand">{price}</p>
          ) : null}
          {hasText(property.address) ? (
            <p className="mt-3 text-sm text-foreground/80">{property.address}</p>
          ) : null}
          <dl className="mt-6 grid grid-cols-2 gap-4">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-md bg-white p-3">
                <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                  {fact.label}
                </dt>
                <dd className="mt-1 font-medium">{fact.value}</dd>
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
          <h2 className="font-display text-3xl text-brand-dark">About this property</h2>
          <p className="mt-4 whitespace-pre-line text-lg leading-8 text-foreground/85">
            {property.description}
          </p>
        </section>
      ) : null}

      {property.features?.length ? (
        <section className="mt-10 max-w-3xl">
          <h2 className="font-display text-3xl text-brand-dark">Features</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {property.features.map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="text-brand" aria-hidden>
                  •
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Container>
  );
}


