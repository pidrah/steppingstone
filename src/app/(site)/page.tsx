import Link from "next/link";
import { ContactActions } from "@/components/property/ContactActions";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { PanelBackdrop } from "@/components/site/AmbientBackground";
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

export const dynamic = "force-dynamic";

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
      <section className="relative overflow-hidden bg-leaf-900 text-white">
        <PanelBackdrop idPrefix="home-hero" />
        <Container className="relative py-20 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-gold-300">
            Georgetown, Guyana
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.05] md:text-6xl">
            Steppingstone <span className="text-gold-gradient">Realty</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">
            Property sales, rentals, and care in Guyana — with a local partner you
            can call.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/properties"
              className="rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-leaf-950 shadow-lift transition hover:bg-gold-300"
            >
              View properties
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold-300 hover:text-gold-200"
            >
              Contact Deji
            </Link>
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/60">
            <span>Sales</span>
            <span aria-hidden="true" className="text-gold-400">
              ·
            </span>
            <span>Rentals</span>
            <span aria-hidden="true" className="text-gold-400">
              ·
            </span>
            <span>Property care & management</span>
          </p>
        </Container>
      </section>

      <section>
        <Container className="grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:py-20">
          <div>
            <h2 className="font-display text-3xl text-leaf-900 md:text-4xl">
              A local real estate office in Georgetown
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/85">
              {content.home_intro}
            </p>
            {parseLines(content.home_services).length ? (
              <ul className="mt-7 grid gap-2.5 text-foreground/90 sm:grid-cols-2">
                {parseLines(content.home_services).map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <aside className="relative overflow-hidden rounded-2xl border border-leaf-900/10 bg-white p-6 shadow-soft">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand-bar" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
              Office
            </p>
            <p className="mt-3 font-medium leading-7">
              {COMPANY.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="mt-4 inline-block font-semibold text-leaf-700 transition-colors hover:text-leaf-900"
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

      <section className="bg-white py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
              For landlords
            </p>
            <h2 className="mt-3 font-display text-3xl text-leaf-900 md:text-4xl">
              Property care and management
            </h2>
            <p className="mt-5 text-lg leading-8 text-foreground/85">
              {content.services_intro}
            </p>
            {services.length ? (
              <ul className="mt-7 grid gap-2.5 text-foreground/90 sm:grid-cols-2">
                {services.slice(0, 6).map((service) => (
                  <li key={service.id} className="flex gap-2.5">
                    <CheckIcon />
                    <span>{service.title}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <Link
              href="/services"
              className="mt-9 inline-flex rounded-full bg-linear-to-r from-leaf-600 to-leaf-700 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:from-leaf-700 hover:to-leaf-800"
            >
              Property care
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-leaf-50 to-leaf-100 p-8 ring-1 ring-leaf-900/10">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-brand-bar"
            />
            <p className="font-display text-3xl text-leaf-900">
              {profile?.name ?? COMPANY.principal}
            </p>
            <p className="mt-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-gold-600">
              {profile?.title ?? COMPANY.principalTitle}
            </p>
            <p className="mt-5 leading-7 text-foreground/85">
              {hasText(profile?.biography)
                ? profile?.biography
                : "Professional profile coming soon."}
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-700 transition-colors hover:text-leaf-900"
            >
              About the Principal Realtor
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 text-gold-500 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl text-white shadow-lift">
            <PanelBackdrop idPrefix="home-cta" />
            <div className="relative px-6 py-12 md:px-12">
              <h2 className="font-display text-3xl md:text-4xl">
                Ready to talk about a property in Guyana?
              </h2>
              <p className="mt-4 max-w-2xl text-white/85">
                Call, email, or send a WhatsApp message. The office is at 56
                Brickdam & Austin Place, Georgetown.
              </p>
              <div className="mt-8 max-w-2xl">
                <ContactActions inverted />
              </div>
            </div>
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
    <div className="mb-8 flex items-end justify-between gap-4">
      <h2 className="font-display text-3xl text-leaf-900">{title}</h2>
      <Link
        href={href}
        className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-leaf-700 transition-colors hover:text-leaf-900"
      >
        {linkLabel}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 text-gold-500 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </Link>
    </div>
  );
}
