import { COMPANY } from "@/lib/constants";
import { enquiryMailto, whatsappHref } from "@/lib/utils";

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.365.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
    </svg>
  );
}

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
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2";
  const callClass = inverted
    ? `${button} bg-white text-leaf-900 shadow-sm hover:bg-gold-100 focus-visible:outline-white`
    : `${button} bg-linear-to-r from-leaf-600 to-leaf-700 text-white shadow-soft hover:from-leaf-700 hover:to-leaf-800 focus-visible:outline-brand`;
  const secondaryClass = inverted
    ? `${button} border border-white/40 bg-transparent text-white hover:bg-white/10 focus-visible:outline-white`
    : `${button} border border-leaf-900/15 bg-white text-foreground shadow-sm hover:border-gold-400 hover:text-leaf-900 focus-visible:outline-brand`;

  return (
    <div className={classes}>
      <a className={callClass} href={`tel:${tel}`}>
        <PhoneIcon />
        Call {displayPhone}
      </a>
      <a
        className={`${button} bg-[#128C7E] text-white shadow-sm hover:bg-[#0e6e62] focus-visible:outline-[#128C7E]`}
        href={whatsappHref(message)}
        target="_blank"
        rel="noreferrer"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
      <a
        className={secondaryClass}
        href={email ? `mailto:${mail}` : enquiryMailto(propertyTitle)}
      >
        <MailIcon />
        Email enquiry
      </a>
      <a
        className={secondaryClass}
        href={COMPANY.facebookUrl}
        target="_blank"
        rel="noreferrer"
      >
        <FacebookIcon />
        Facebook
      </a>
    </div>
  );
}
