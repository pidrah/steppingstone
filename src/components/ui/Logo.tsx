import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  inverted?: boolean;
  compact?: boolean;
  className?: string;
};

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-10 w-10", className)}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M12 28.5 32 12l20 16.5V52a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V28.5Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M42 12.5V19"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M26 54V38.5h12V54"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M39.5 27.5c0-4.4-3.2-7-8.2-7-5.6 0-8.6 2.9-8.8 7.2h5.1c.2-1.9 1.6-3.1 3.7-3.1 1.9 0 3.1 1 3.1 2.6 0 1.3-.8 2.1-3.5 2.7l-3.3.8c-4.2 1-6.3 3.2-6.3 6.8 0 4.2 3.3 7 8.6 7 5.8 0 9.1-3 9.4-7.5h-5.2c-.3 2-1.8 3.4-4.2 3.4-2.1 0-3.4-1-3.4-2.6 0-1.4.9-2.3 3.5-2.9l3.4-.8c4.6-1.1 6.1-3.4 6.1-7.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Logo({ href = "/", inverted = false, compact = false, className }: LogoProps) {
  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-3",
        inverted ? "text-white" : "text-brand",
        className,
      )}
    >
      <Mark className={cn("shrink-0", compact ? "h-8 w-8" : "h-10 w-10")} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display tracking-[0.18em] uppercase",
            compact ? "text-sm" : "text-base md:text-lg",
          )}
        >
          Steppingstone
        </span>
        <span
          className={cn(
            "font-display tracking-[0.42em] uppercase",
            inverted ? "text-white/80" : "text-brand-dark/80",
            compact ? "text-[0.6rem] mt-1" : "text-xs mt-1.5",
          )}
        >
          Realty
        </span>
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
      <span className="sr-only">Steppingstone Realty home</span>
      {content}
    </Link>
  );
}
