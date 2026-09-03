"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { Logo } from "@/components/ui/Logo";
import { ADMIN_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function AdminShell({
  email,
  children,
}: {
  email?: string | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-full flex-1 bg-background">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-white md:flex md:flex-col">
        <div className="border-b border-border px-5 py-4">
          <Logo href="/" compact />
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
            Office dashboard
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Admin">
          {ADMIN_NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium",
                  active
                    ? "bg-brand-muted text-brand-dark"
                    : "text-foreground/80 hover:bg-background",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border px-5 py-4">
          {email ? <p className="mb-2 truncate text-xs text-muted">{email}</p> : null}
          <SignOutButton />
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-white px-4 py-3 md:hidden">
          <Logo href="/admin" compact />
          <button
            type="button"
            className="rounded-md border border-border px-3 py-2 text-sm"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            Menu
          </button>
        </header>
        {open ? (
          <nav className="border-b border-border bg-white px-3 py-2 md:hidden">
            {ADMIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm"
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 py-2">
              <SignOutButton />
            </div>
          </nav>
        ) : null}
        <div className="flex-1 px-4 py-8 sm:px-6 lg:px-10">{children}</div>
      </div>
    </div>
  );
}
