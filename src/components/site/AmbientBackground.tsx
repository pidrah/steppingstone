import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GuyanaSkyline } from "@/components/site/GuyanaSkyline";
import {
  CathedralSpire,
  CityHall,
  IndependenceArch,
  ParliamentDome,
  StabroekTower,
  UmanaYana,
} from "@/components/site/Landmarks";

type LeafTone = "leaf" | "gold" | "white";

const LEAF_COLORS: Record<LeafTone, [string, string]> = {
  leaf: ["#5ba375", "#17402c"],
  gold: ["#e6cb8d", "#a97e33"],
  white: ["#ffffff", "#dcebdf"],
};

/**
 * Decorative leaf glyph. When `id` is provided the leaf is filled with a
 * linear gradient (ids must be unique per page); otherwise a solid tone.
 */
export function LeafGlyph({
  id,
  tone = "leaf",
  className,
  style,
}: {
  id?: string;
  tone?: LeafTone;
  className?: string;
  style?: CSSProperties;
}) {
  const [from, to] = LEAF_COLORS[tone];
  const fill = id ? `url(#${id})` : from;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      style={style}
      aria-hidden="true"
      fill="none"
    >
      {id ? (
        <defs>
          <linearGradient
            id={id}
            x1="52"
            y1="10"
            x2="12"
            y2="56"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
      ) : null}
      <path
        d="M52 12C34 12 12 32 12 56c24 0 44-20 44-40 0-2.2-1.8-4-4-4Z"
        fill={fill}
      />
      <path
        d="M49 16c-11 9-25 25-33 37"
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Page-wide wash for the public site: cream paper, translucent Georgetown
 * landmarks drifting slowly, and a low skyline that pans along the bottom.
 */
export function AmbientBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f4f7f2]",
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 40% at 10% 0%, rgba(47,125,79,0.08), transparent 60%), radial-gradient(50% 30% at 90% 10%, rgba(47,125,79,0.06), transparent 55%)",
        }}
      />
      <CathedralSpire className="landmark-float absolute -left-8 top-[8%] h-[46vh] w-auto opacity-[0.13]" />
      <StabroekTower className="landmark-drift absolute -right-4 top-[6%] h-[40vh] w-auto opacity-[0.12] [animation-delay:-6s]" />
      <UmanaYana className="landmark-float absolute left-[8%] top-[58%] h-40 w-auto opacity-[0.1] [animation-delay:-3s] sm:h-52" />
      <ParliamentDome className="landmark-drift absolute right-[6%] top-[46%] hidden h-36 w-auto opacity-[0.11] [animation-delay:-9s] md:block" />
      <CityHall className="landmark-float absolute left-[42%] top-[22%] hidden h-44 w-auto opacity-[0.08] [animation-delay:-4s] lg:block" />
      <IndependenceArch className="landmark-drift absolute bottom-[18%] right-[18%] hidden h-28 w-auto opacity-[0.1] [animation-delay:-7s] md:block" />

      <div className="absolute inset-x-0 bottom-0 overflow-hidden text-leaf-800 opacity-[0.16]">
        <div className="skyline-track">
          <GuyanaSkyline variant="near" className="h-[22vh] min-h-36 w-1/2" />
          <GuyanaSkyline variant="near" className="h-[22vh] min-h-36 w-1/2" />
        </div>
      </div>
    </div>
  );
}

/**
 * Richer backdrop for deep-green panels (heroes, CTA bands): the leaf-depth
 * gradient, a faint gold horizon glow, two brand leaf glyphs, and the
 * Georgetown skyline silhouette along the bottom edge. Static — no motion.
 * Place inside a `relative overflow-hidden` parent and give content a
 * `relative` wrapper so it paints above the backdrop.
 */
export function PanelBackdrop({
  idPrefix,
  imageSrc,
  className,
}: {
  idPrefix: string;
  imageSrc?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      ) : null}
      <div
        className={cn("absolute inset-0", !imageSrc && "bg-leaf-depth")}
        style={
          imageSrc
            ? {
                background:
                  "linear-gradient(90deg, rgba(13,42,28,0.92) 0%, rgba(23,64,44,0.78) 48%, rgba(13,42,28,0.56) 100%), linear-gradient(0deg, rgba(13,42,28,0.34), transparent 60%)",
              }
            : undefined
        }
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 80% 0%, rgba(109,188,139,0.10) 0%, rgba(6,13,9,0) 55%), radial-gradient(70% 45% at 10% 8%, rgba(218,181,102,0.08) 0%, rgba(6,13,9,0) 60%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 overflow-hidden text-white/35">
        <div className="skyline-track">
          <GuyanaSkyline variant="near" className="h-full max-h-56 w-1/2" />
          <GuyanaSkyline variant="near" className="h-full max-h-56 w-1/2" />
        </div>
      </div>
      <CathedralSpire className="landmark-float absolute -left-6 bottom-0 h-[70%] w-auto text-white opacity-25" />
      <StabroekTower className="landmark-drift absolute right-[6%] bottom-0 h-[78%] w-auto text-white opacity-20 [animation-delay:-5s]" />
      <LeafGlyph
        id={`${idPrefix}-leaf-a`}
        tone="gold"
        className="absolute right-[8%] top-[8%] h-24 w-24 rotate-[26deg] opacity-[0.14]"
      />
      <LeafGlyph
        id={`${idPrefix}-leaf-b`}
        tone="white"
        className="absolute left-[4%] top-[16%] h-16 w-16 -rotate-[22deg] opacity-[0.08]"
      />
      <div className="absolute inset-x-0 bottom-0 h-px gold-hairline" />
    </div>
  );
}
