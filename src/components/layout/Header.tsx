"use client";

import Link from "next/link";
import { useState } from "react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo compact />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${COMPANY.phoneTel}`}
            className="text-sm font-semibold text-brand hover:text-brand-dark"
          >
            {COMPANY.phoneDisplay}
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Enquire
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="flex flex-col gap-1.5">
            <span className={cn("block h-0.5 w-5 bg-foreground transition", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-5 bg-foreground transition", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-5 bg-foreground transition", open && "-translate-y-2 -rotate-45")} />
          </span>
        </button>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-white lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/70 py-3 text-base font-medium text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="py-3 text-base font-semibold text-brand"
            >
              Call {COMPANY.phoneDisplay}
            </a>
            <a
              href={COMPANY.whatsappUrl}
              className="pb-3 text-base font-semibold text-brand"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
