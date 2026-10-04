import type { Metadata } from "next";
import { ContactActions } from "@/components/property/ContactActions";
import { PanelBackdrop } from "@/components/site/AmbientBackground";
import { Container } from "@/components/ui/Container";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Steppingstone Realty",
  description:
    "Contact Steppingstone Realty in Georgetown, Guyana. Phone +592 653-5888 or email steppingstonerealtygy@gmail.com.",
};

export default function ContactPage() {
  return (
    <Container className="py-12 md:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-600">
        Contact
      </p>
      <h1 className="mt-2 font-display text-4xl text-leaf-900 md:text-5xl">
        Speak with the office
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        Call, email, or send a WhatsApp message. For property enquiries, include
        the listing name if you have one.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-leaf-900/10 bg-white p-6 shadow-soft md:p-8">
          <h2 className="font-display text-2xl text-leaf-900">Office</h2>
          <p className="mt-4 leading-8">
            {COMPANY.principal}
            <br />
            {COMPANY.principalTitle}
            <br />
            {COMPANY.name}
          </p>
          <p className="mt-4 leading-8">
            {COMPANY.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="text-muted">Phone</dt>
              <dd>
                <a className="font-semibold text-brand" href={`tel:${COMPANY.phoneTel}`}>
                  {COMPANY.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Email</dt>
              <dd>
                <a className="font-semibold text-brand" href={`mailto:${COMPANY.email}`}>
                  {COMPANY.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Facebook</dt>
              <dd>
                <a
                  className="font-semibold text-brand"
                  href={COMPANY.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {COMPANY.facebookHandle}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="relative overflow-hidden rounded-3xl text-white shadow-lift">
          <PanelBackdrop idPrefix="contact-panel" />
          <div className="relative px-6 py-8 md:p-8">
            <h2 className="font-display text-3xl">Start a conversation</h2>
            <p className="mt-3 text-white/85">
              On a phone, the call and WhatsApp buttons open directly.
            </p>
            <div className="mt-8">
              <ContactActions inverted />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
