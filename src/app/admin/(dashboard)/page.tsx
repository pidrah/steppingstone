import Link from "next/link";
import { DeleteDemoButton } from "@/components/admin/DeleteDemoButton";
import { getAdminProperties, getAdminServices, getRealtorProfile } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const [properties, services, profile] = await Promise.all([
    getAdminProperties(),
    getAdminServices(),
    getRealtorProfile(),
  ]);

  const published = properties.filter((item) => item.is_published).length;
  const demo = properties.filter((item) => item.is_demo);

  const cards = [
    { label: "Properties", value: properties.length, href: "/admin/properties" },
    { label: "Published", value: published, href: "/admin/properties" },
    { label: "Services", value: services.length, href: "/admin/services" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-brand-dark">Dashboard</h1>
          <p className="mt-2 text-muted">
            Add listings, photographs, and office details without changing any
            code.
          </p>
        </div>
        <Link
          href="/admin/properties/new"
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Add property
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-border bg-white p-5 hover:border-brand"
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 font-display text-4xl text-brand-dark">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-border bg-white p-6">
          <h2 className="font-display text-2xl text-brand-dark">Principal Realtor</h2>
          <p className="mt-2 font-medium">{profile?.name}</p>
          <p className="text-sm text-muted">{profile?.title}</p>
          <Link
            href="/admin/profile"
            className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
          >
            Edit profile
          </Link>
        </section>
        <section className="rounded-lg border border-border bg-white p-6">
          <h2 className="font-display text-2xl text-brand-dark">Getting started</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-foreground/85">
            <li>Add a property and mark it published.</li>
            <li>Upload photographs and choose the main image.</li>
            <li>Fill in the Principal Realtor profile when you are ready.</li>
            <li>Review property-care services shown on the public site.</li>
          </ol>
        </section>
      </div>

      {demo.length ? (
        <section className="mt-8 rounded-lg border border-dashed border-border bg-white p-6">
          <h2 className="font-display text-2xl text-brand-dark">Sample listings</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            {demo.length} demonstration {demo.length === 1 ? "listing is" : "listings are"}{" "}
            currently published so the website is not empty. They are labelled
            SAMPLE and should be deleted before you present the site to clients.
          </p>
          <div className="mt-4">
            <DeleteDemoButton count={demo.length} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
