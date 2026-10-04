import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  inverted?: boolean;
  compact?: boolean;
  className?: string;
};

// Company emblem (house + swoosh), cropped from the official logo asset with
// the background made transparent so it sits cleanly on light and dark surfaces.
const MARK_SRC = "/brand/company-mark.png";
const MARK_SIZE = 56; // native square pixels

export function Logo({ href = "/", inverted = false, compact = false, className }: LogoProps) {
  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        inverted ? "text-white" : "text-brand",
        className,
      )}
    >
      <Image
        src={MARK_SRC}
        alt=""
        width={MARK_SIZE}
        height={MARK_SIZE}
        unoptimized
        aria-hidden="true"
        className={cn("shrink-0", compact ? "h-9 w-9" : "h-10 w-10")}
      />
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
            inverted ? "text-gold-300" : "text-gold-600",
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
