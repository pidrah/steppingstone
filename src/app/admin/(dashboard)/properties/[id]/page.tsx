import Link from "next/link";
import { notFound } from "next/navigation";
import { DeletePropertyButton } from "@/components/admin/DeletePropertyButton";
import { ImageManager } from "@/components/admin/ImageManager";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { getAdminProperty } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getAdminProperty(id);
  if (!property) notFound();

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/properties"
            className="text-sm font-semibold text-brand hover:underline"
          >
            ← All properties
          </Link>
          <h1 className="mt-3 font-display text-4xl text-brand-dark">
            Edit property
          </h1>
          <p className="mt-2 text-muted">{property.title}</p>
        </div>
        {property.is_published ? (
          <Link
            href={`/properties/${property.slug}`}
            className="text-sm font-semibold text-brand hover:underline"
            target="_blank"
          >
            View on website
          </Link>
        ) : null}
      </div>

      <div className="rounded-lg border border-border bg-white p-5 md:p-8">
        <PropertyForm property={property} />
      </div>

      <ImageManager
        propertyId={property.id}
        images={property.images}
        altBase={property.title}
      />

      <div className="rounded-lg border border-red-100 bg-white p-5">
        <h2 className="font-display text-2xl text-brand-dark">Remove listing</h2>
        <p className="mt-2 text-sm text-muted">
          This deletes the property and its photographs. If you only want it off
          the website, unpublish it instead.
        </p>
        <div className="mt-4">
          <DeletePropertyButton id={property.id} title={property.title} />
        </div>
      </div>
    </div>
  );
}
