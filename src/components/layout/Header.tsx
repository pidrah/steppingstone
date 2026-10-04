"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div aria-hidden="true" className="bg-brand-bar h-[3px] w-full" />
      <header className="sticky top-0 z-40 border-b border-leaf-900/10 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Logo compact />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative text-sm font-medium transition-colors",
                    active
                      ? "text-leaf-800"
                      : "text-foreground/75 hover:text-leaf-700",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-linear-to-r from-leaf-500 to-gold-400 transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="text-sm font-semibold text-leaf-700 transition-colors hover:text-leaf-900"
            >
              {COMPANY.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="rounded-full bg-linear-to-r from-gold-400 to-gold-500 px-5 py-2.5 text-sm font-semibold text-leaf-950 shadow-soft transition hover:from-gold-300 hover:to-gold-400"
            >
              Enquire
            </Link>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-leaf-900/15 transition-colors hover:bg-leaf-50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-0.5 w-5 bg-leaf-900 transition",
                  open && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-leaf-900 transition",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-leaf-900 transition",
                  open && "-translate-y-2 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
        {open ? (
          <div id="mobile-nav" className="border-t border-leaf-900/10 bg-background lg:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3" aria-label="Mobile">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="anim-fade-up border-b border-leaf-900/5 py-3 text-base font-medium text-foreground"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`tel:${COMPANY.phoneTel}`}
                className="anim-fade-up py-3 text-base font-semibold text-leaf-700"
                style={{ animationDelay: `${NAV_LINKS.length * 40}ms` }}
              >
                Call {COMPANY.phoneDisplay}
              </a>
              <a
                href={COMPANY.whatsappUrl}
                className="anim-fade-up pb-3 text-base font-semibold text-leaf-700"
                target="_blank"
                rel="noreferrer"
                style={{ animationDelay: `${(NAV_LINKS.length + 1) * 40}ms` }}
              >
                WhatsApp
              </a>
            </nav>
          </div>
        ) : null}
      </header>
    </>
  );
}
