import Link from "next/link";

export const dynamic = "force-dynamic";
import { ContactActions } from "@/components/property/ContactActions";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { Container } from "@/components/ui/Container";
import { COMPANY } from "@/lib/constants";
import {
  getFeaturedProperties,
  getPublishedProperties,
  getPublishedServices,
  getRealtorProfile,
  getSiteContent,
} from "@/lib/queries";
import { hasText, parseLines } from "@/lib/utils";

export default async function HomePage() {
  const [featured, all, services, profile, content] = await Promise.all([
    getFeaturedProperties(),
    getPublishedProperties(),
    getPublishedServices(),
    getRealtorProfile(),
    getSiteContent(),
  ]);

  const forSale = all.filter((item) => item.listing_type === "sale").slice(0, 3);
  const forRent = all.filter((item) => item.listing_type === "rent").slice(0, 3);

  return (
    <>
      <section className="bg-brand text-white">
        <Container className="py-16 md:py-20">
          <p className="text-sm uppercase tracking-[0.28em] text-white/75">
            Georgetown, Guyana
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            Steppingstone Realty
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
            Property sales, rentals, and care in Guyana — with a local partner you
            can call.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/properties"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-dark hover:bg-brand-muted"
            >
              View properties
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contact Deji
            </Link>
          </div>
        </Container>
      </section>

      <section>
        <Container className="grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <h2 className="font-display text-3xl text-brand-dark md:text-4xl">
              A local real estate office in Georgetown
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/85">
              {content.home_intro}
            </p>
            {parseLines(content.home_services).length ? (
              <ul className="mt-6 grid gap-2 text-foreground/90 sm:grid-cols-2">
                {parseLines(content.home_services).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="text-brand">
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <aside className="rounded-lg border border-border bg-white p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Office</p>
            <p className="mt-3 font-medium leading-7">
              {COMPANY.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="mt-4 inline-block font-semibold text-brand"
            >
              {COMPANY.phoneDisplay}
            </a>
          </aside>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <SectionHeading
            title="Featured properties"
            href="/properties"
            linkLabel="All listings"
          />
          <PropertyGrid properties={featured} />
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeading
            title="For sale"
            href="/properties?listing=sale"
            linkLabel="All sale listings"
          />
          <PropertyGrid
            properties={forSale}
            emptyTitle="No sale listings at the moment."
            emptyDescription="Please check back soon, or contact the office for current availability."
          />
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <SectionHeading
            title="For rent"
            href="/properties?listing=rent"
            linkLabel="All rentals"
          />
          <PropertyGrid
            properties={forRent}
            emptyTitle="No rental listings at the moment."
            emptyDescription="Please check back soon, or contact the office for current availability."
          />
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand">
              For landlords
            </p>
            <h2 className="mt-3 font-display text-3xl text-brand-dark md:text-4xl">
              Property care and management
            </h2>
            <p className="mt-5 text-lg leading-8 text-foreground/85">
              {content.services_intro}
            </p>
            {services.length ? (
              <ul className="mt-6 grid gap-2 text-foreground/90 sm:grid-cols-2">
                {services.slice(0, 6).map((service) => (
                  <li key={service.id} className="flex gap-2">
                    <span aria-hidden className="text-brand">
                      •
                    </span>
                    {service.title}
                  </li>
                ))}
              </ul>
            ) : null}
            <Link
              href="/services"
              className="mt-8 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Property care
            </Link>
          </div>
          <div className="rounded-lg bg-brand-muted p-8">
            <p className="font-display text-3xl text-brand-dark">
              {profile?.name ?? COMPANY.principal}
            </p>
            <p className="mt-1 text-sm uppercase tracking-[0.18em] text-brand">
              {profile?.title ?? COMPANY.principalTitle}
            </p>
            <p className="mt-5 leading-7 text-foreground/85">
              {hasText(profile?.biography)
                ? profile?.biography
                : "Professional profile coming soon."}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex text-sm font-semibold text-brand hover:underline"
            >
              About the Principal Realtor
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="rounded-lg bg-brand px-6 py-12 text-white md:px-12">
          <h2 className="font-display text-3xl md:text-4xl">
            Ready to talk about a property in Guyana?
          </h2>
          <p className="mt-4 max-w-2xl text-white/85">
            Call, email, or send a WhatsApp message. The office is at 56 Brickdam
            & Austin Place, Georgetown.
          </p>
          <div className="mt-8 max-w-2xl">
            <ContactActions inverted />
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionHeading({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="font-display text-3xl text-brand-dark">{title}</h2>
      <Link href={href} className="text-sm font-semibold text-brand hover:underline">
        {linkLabel}
      </Link>
    </div>
  );
}
