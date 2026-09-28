import type { Metadata } from "next";
import { ContactActions } from "@/components/property/ContactActions";
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
      <section className="bg-brand text-white">
        <Container className="py-16">
          <p className="text-sm uppercase tracking-[0.22em] text-white/75">
            For property owners
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">
            Property care in Guyana
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">
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
                className="rounded-lg border border-border bg-white p-6"
              >
                <h2 className="font-display text-2xl text-brand-dark">
                  {service.title}
                </h2>
                {service.description ? (
                  <p className="mt-3 leading-7 text-foreground/85">
                    {service.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Property-care details coming soon."
            description="Please contact the office to discuss how Steppingstone Realty can assist with your property."
          />
        )}
        <section className="mt-14 rounded-lg bg-brand-muted px-6 py-10 md:px-10">
          <h2 className="font-display text-3xl text-brand-dark md:text-4xl">
            {content.services_cta ||
              "Looking for someone to care for your property in Guyana?"}
          </h2>
          <p className="mt-4 max-w-2xl text-foreground/85">
            Call, email, or send a WhatsApp message and we will take it from there.
          </p>
          <div className="mt-8 max-w-2xl">
            <ContactActions />
          </div>
        </section>
      </Container>
    </>
  );
}
