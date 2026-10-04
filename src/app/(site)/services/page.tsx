import type { Metadata } from "next";
import { ContactActions } from "@/components/property/ContactActions";
import { LeafGlyph, PanelBackdrop } from "@/components/site/AmbientBackground";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getPublishedServices, getSiteContent } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Property management in Guyana",
  description:
    "Steppingstone Realty assists landlords and property owners in Guyana with caretaking, inspections, and property management support.",
};

export default async function ServicesPage() {
  const [services, content] = await Promise.all([
    getPublishedServices(),
    getSiteContent(),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-leaf-900 text-white">
        <PanelBackdrop idPrefix="services-hero" />
        <Container className="relative py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-300">
            For property owners
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">
            Property care in Guyana
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
            {content.services_intro}
          </p>
        </Container>
      </section>
      <Container className="py-14">
        {services.length ? (
          <ul className="grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <li
                key={service.id}
                className="group rounded-2xl border border-leaf-900/10 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf-50 text-leaf-700 ring-1 ring-leaf-900/10 transition-colors group-hover:bg-leaf-100">
                    <LeafGlyph className="h-5 w-5 rotate-[24deg]" />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl text-leaf-900">
                      {service.title}
                    </h2>
                    {service.description ? (
                      <p className="mt-2 leading-7 text-foreground/85">
                        {service.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Property-care details coming soon."
            description="Please contact the office to discuss how Steppingstone Realty can assist with your property."
          />
        )}
        <section className="relative mt-14 overflow-hidden rounded-3xl text-white shadow-lift">
          <PanelBackdrop idPrefix="services-cta" />
          <div className="relative px-6 py-10 md:px-10">
            <h2 className="font-display text-3xl md:text-4xl">
              {content.services_cta ||
                "Looking for someone to care for your property in Guyana?"}
            </h2>
            <p className="mt-4 max-w-2xl text-white/85">
              Call, email, or send a WhatsApp message and we will take it from
              there.
            </p>
            <div className="mt-8 max-w-2xl">
              <ContactActions />
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
