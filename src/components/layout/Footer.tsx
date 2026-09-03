import Link from "next/link";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-brand-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <Logo href="/" inverted />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/75">
            Real estate sales, rentals, and property care in Georgetown, Guyana.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
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
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
            Contact
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="hover:underline" href={`tel:${COMPANY.phoneTel}`}>
                {COMPANY.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="hover:underline" href={`mailto:${COMPANY.email}`}>
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a
                className="hover:underline"
                href={COMPANY.facebookUrl}
                target="_blank"
                rel="noreferrer"
              >
                Facebook {COMPANY.facebookHandle}
              </a>
            </li>
            <li>
              <a
                className="hover:underline"
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
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Steppingstone Realty. Georgetown, Guyana.</p>
          <nav className="flex flex-wrap gap-4">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
