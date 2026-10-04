import Link from "next/link";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { LeafGlyph } from "@/components/site/AmbientBackground";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-leaf-950 text-white">
      <div aria-hidden="true" className="gold-hairline absolute inset-x-0 top-0 h-px" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-16 h-96 w-96 opacity-[0.05]"
      >
        <LeafGlyph tone="white" className="h-full w-full rotate-[18deg]" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <Logo href="/" inverted />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/75">
            Real estate sales, rentals, and property care in Georgetown, Guyana.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
            Visit
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/85">
            {COMPANY.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
            Contact
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                className="transition-colors hover:text-gold-200"
                href={`tel:${COMPANY.phoneTel}`}
              >
                {COMPANY.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                className="transition-colors hover:text-gold-200"
                href={`mailto:${COMPANY.email}`}
              >
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a
                className="transition-colors hover:text-gold-200"
                href={COMPANY.facebookUrl}
                target="_blank"
                rel="noreferrer"
              >
                Facebook {COMPANY.facebookHandle}
              </a>
            </li>
            <li>
              <a
                className="transition-colors hover:text-gold-200"
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Steppingstone Realty. Georgetown, Guyana.</p>
          <nav className="flex flex-wrap gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-gold-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
