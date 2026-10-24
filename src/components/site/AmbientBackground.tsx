import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { GuyanaSkyline } from "@/components/site/GuyanaSkyline";

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
 * Page-wide ambient background for the dim (public) theme: a moonlit
 * green-black wash, a faint moon, a scatter of still stars, and the static
 * Georgetown skyline anchored to the bottom of the viewport. Purely
 * decorative; nothing is animated so it stays calm and cheap on mobile.
 */
export function AmbientBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 bg-dim-wash" />

      {/* Moon with a soft halo */}
      <div
        className="absolute right-[10%] top-[6%] h-16 w-16 rounded-full bg-[#e9f1e7] opacity-[0.16] sm:h-24 sm:w-24"
        style={{ boxShadow: "0 0 90px 34px rgba(233, 241, 231, 0.07)" }}
      />

      {/* Still stars */}
      <div className="absolute left-[8%] top-[12%] h-px w-px rounded-full bg-white/40" />
      <div className="absolute left-[22%] top-[6%] h-px w-px rounded-full bg-white/30" />
      <div className="absolute left-[38%] top-[15%] h-[2px] w-[2px] rounded-full bg-white/25" />
      <div className="absolute left-[55%] top-[9%] h-px w-px rounded-full bg-white/35" />
      <div className="absolute left-[70%] top-[18%] h-px w-px rounded-full bg-white/25" />
      <div className="absolute left-[86%] top-[26%] h-[2px] w-[2px] rounded-full bg-white/20" />
      <div className="absolute left-[46%] top-[28%] h-px w-px rounded-full bg-white/20" />
      <div className="absolute left-[12%] top-[34%] h-px w-px rounded-full bg-white/20" />

      {/* Static Georgetown skyline — hazy bridge & blocks behind, landmarks in front */}
      <GuyanaSkyline
        variant="far"
        className="absolute bottom-0 left-0 h-[24vh] min-h-40 w-full opacity-60 sm:h-[26vh]"
      />
      <GuyanaSkyline
        variant="near"
        className="absolute bottom-0 left-0 h-[26vh] min-h-44 w-full sm:h-[30vh]"
      />

      {/* Demerara river sheen along the very bottom */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent via-[#050a07]/30 to-[#040805]/80" />
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
  className,
}: {
  idPrefix: string;
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
      <div className="absolute inset-0 bg-leaf-depth" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 80% 0%, rgba(109,188,139,0.10) 0%, rgba(6,13,9,0) 55%), radial-gradient(70% 45% at 10% 8%, rgba(218,181,102,0.08) 0%, rgba(6,13,9,0) 60%)",
        }}
      />
      <GuyanaSkyline
        variant="far"
        className="absolute bottom-0 left-0 h-[46%] w-full opacity-50"
      />
      <GuyanaSkyline
        variant="near"
        className="absolute bottom-0 left-0 h-[54%] w-full"
      />
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
