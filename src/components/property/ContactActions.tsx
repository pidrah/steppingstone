import { COMPANY } from "@/lib/constants";
import { enquiryMailto, whatsappHref } from "@/lib/utils";

export function ContactActions({
  propertyTitle,
  phone,
  email,
  compact = false,
  inverted = false,
}: {
  propertyTitle?: string;
  phone?: string | null;
  email?: string | null;
  compact?: boolean;
  inverted?: boolean;
}) {
  const tel = phone?.replace(/[^\d+]/g, "") || COMPANY.phoneTel;
  const displayPhone = phone || COMPANY.phoneDisplay;
  const mail = email || COMPANY.email;
  const message = propertyTitle
    ? `Hello, I am enquiring about "${propertyTitle}" listed with Steppingstone Realty.`
    : "Hello, I would like to enquire about a property with Steppingstone Realty.";

  const classes = compact
    ? "flex flex-wrap gap-2"
    : "grid gap-3 sm:grid-cols-2";

  const button =
    "inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2";
  const callClass = inverted
    ? `${button} bg-white text-brand-dark hover:bg-brand-muted focus-visible:outline-white`
    : `${button} bg-brand text-white hover:bg-brand-dark focus-visible:outline-brand`;
  const secondaryClass = inverted
    ? `${button} border border-white/40 bg-transparent text-white hover:bg-white/10 focus-visible:outline-white`
    : `${button} border border-border bg-white text-foreground hover:border-brand focus-visible:outline-brand`;

  return (
    <div className={classes}>
      <a className={callClass} href={`tel:${tel}`}>
        Call {displayPhone}
      </a>
      <a
        className={`${button} bg-[#128C7E] text-white hover:bg-[#0e6e62] focus-visible:outline-[#128C7E]`}
        href={whatsappHref(message)}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
      <a
        className={secondaryClass}
        href={email ? `mailto:${mail}` : enquiryMailto(propertyTitle)}
      >
        Email enquiry
      </a>
      <a
        className={secondaryClass}
        href={COMPANY.facebookUrl}
        target="_blank"
        rel="noreferrer"
      >
        Facebook
      </a>
    </div>
  );
}
