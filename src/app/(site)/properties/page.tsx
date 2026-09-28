import type { Metadata } from "next";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { Container } from "@/components/ui/Container";
import { LISTING_TYPES } from "@/lib/constants";
import { getLocations, getPublishedProperties } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Properties for sale and rent in Guyana",
  description:
    "Browse Steppingstone Realty listings for sale, rent, and managed properties in Georgetown and across Guyana.",
};

type Search = {
  listing?: string;
  type?: string;
  location?: string;
  q?: string;
  bedrooms?: string;
  minPrice?: string;
  maxPrice?: string;
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const params = await searchParams;
  const [properties, locations] = await Promise.all([
    getPublishedProperties(params),
    getLocations(),
  ]);

  const listingLabel =
    LISTING_TYPES.find((item) => item.value === params.listing)?.label ??
    "All properties";

  return (
    <Container className="py-12 md:py-16">
      <p className="text-sm uppercase tracking-[0.22em] text-brand">Listings</p>
      <h1 className="mt-2 font-display text-4xl text-brand-dark md:text-5xl">
        {listingLabel}
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Sale, rental, and managed properties from Steppingstone Realty. Use the
        filters to narrow the list.
      </p>
      <div className="mt-8">
        <PropertyFilters current={params} locations={locations} />
      </div>
      <div className="mt-8">
        <PropertyGrid
          properties={properties}
          emptyTitle="No properties currently available."
          emptyDescription="Please check back soon, or contact Steppingstone Realty for current listings."
        />
      </div>
    </Container>
  );
}
