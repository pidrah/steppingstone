import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAdminProperties } from "@/lib/queries";
import { formatPrice, listingLabel, statusLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  const properties = await getAdminProperties();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-brand-dark">Properties</h1>
          <p className="mt-2 text-muted">
            Add, edit, publish, or remove listings. Photographs are uploaded on
            each property.
          </p>
        </div>
        <Link
          href="/admin/properties/new"
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Add property
        </Link>
      </div>

      {properties.length ? (
        <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-background text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Published</th>
                <th className="px-4 py-3 font-medium">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium">{property.title}</p>
                    <p className="text-xs text-muted">
                      {property.location || "No location"}
                      {property.is_demo ? " · SAMPLE" : ""}
                    </p>
                  </td>
                  <td className="px-4 py-3">{listingLabel(property.listing_type)}</td>
                  <td className="px-4 py-3">{statusLabel(property.status)}</td>
                  <td className="px-4 py-3">
                    {formatPrice(
                      property.price,
                      property.currency,
                      property.price_period,
                    ) ?? "—"}
                  </td>
                  <td className="px-4 py-3">{property.is_published ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/properties/${property.id}`}
                      className="font-semibold text-brand hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="No properties yet."
            description="Add the first listing. After you publish it, it will appear on the public website."
            action={
              <Link
                href="/admin/properties/new"
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white"
              >
                Add property
              </Link>
            }
          />
        </div>
      )}
    </div>
  );
}
