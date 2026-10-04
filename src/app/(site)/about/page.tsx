import type { Metadata } from "next";
import Image from "next/image";
import { ContactActions } from "@/components/property/ContactActions";
import { Container } from "@/components/ui/Container";
import { COMPANY } from "@/lib/constants";
import { getRealtorProfile } from "@/lib/queries";
import { hasText } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Principal Realtor — Deji Aderemi",
  description:
    "Meet Deji Aderemi, Principal Realtor at Steppingstone Realty in Georgetown, Guyana.",
};

export default async function AboutPage() {
  const profile = await getRealtorProfile();
  const name = profile?.name || COMPANY.principal;
  const title = profile?.title || COMPANY.principalTitle;

  const sections = [
    { heading: "Biography", body: profile?.biography },
    { heading: "Professional experience", body: profile?.experience },
    { heading: "Years of experience", body: profile?.years_of_experience },
    { heading: "Areas of expertise", body: profile?.areas_of_expertise },
    { heading: "Qualifications", body: profile?.qualifications },
    { heading: "Professional achievements", body: profile?.achievements },
    { heading: "Areas served", body: profile?.areas_served },
    { heading: "Philosophy", body: profile?.philosophy },
  ].filter((section) => hasText(section.body));

  return (
    <Container className="py-12 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
        <div>
          <div className="relative mx-auto aspect-square w-56 lg:w-full lg:max-w-xs">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-full border border-gold-400/50"
            />
            <div className="relative h-full w-full overflow-hidden rounded-full bg-leaf-100 shadow-lift ring-4 ring-white">
              {profile?.photo_url ? (
                <Image
                  src={profile.photo_url}
                  alt={`${name}, ${title}`}
                  fill
                  className="object-cover"
                  unoptimized={!profile.photo_url.startsWith("http")}
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-leaf-900/60">
                  Portrait coming soon
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-600">
            {title}
          </p>
          <h1 className="mt-2 font-display text-4xl text-leaf-900 md:text-5xl">
            {name}
          </h1>
          <p className="mt-4 text-muted">{COMPANY.addressSingleLine}</p>

          {sections.length ? (
            <div className="mt-10 space-y-8">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-2xl text-leaf-900">
                    {section.heading}
                  </h2>
                  <p className="mt-3 whitespace-pre-line leading-8 text-foreground/85">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-leaf-300/70 bg-white px-6 py-10 shadow-soft">
              <p className="font-display text-2xl text-leaf-900">
                Professional profile coming soon.
              </p>
              <p className="mt-3 max-w-xl text-muted">
                Details about experience, qualifications, and background will appear
                here once they have been added in the office dashboard.
              </p>
            </div>
          )}

          <div className="mt-12 max-w-xl">
            <h2 className="font-display text-2xl text-leaf-900">Get in touch</h2>
            <div className="mt-5">
              <ContactActions />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
