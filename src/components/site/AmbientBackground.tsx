import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

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
 * Page-wide ambient background: a soft botanical wash with slowly drifting
 * green and gold blooms and gently floating leaves. Purely decorative —
 * motion is disabled for users who prefer reduced motion.
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
      <div className="absolute inset-0 bg-cream-wash" />
      <div className="anim-drift absolute -left-44 -top-44 h-80 w-80 rounded-full bg-leaf-200/50 blur-3xl sm:h-[34rem] sm:w-[34rem]" />
      <div className="anim-drift-alt absolute -right-52 top-1/4 h-96 w-96 rounded-full bg-gold-100/70 blur-3xl sm:h-[38rem] sm:w-[38rem]" />
      <div
        className="anim-drift absolute -bottom-56 left-[18%] h-80 w-80 rounded-full bg-leaf-100/80 blur-3xl sm:h-[36rem] sm:w-[36rem]"
        style={{ animationDelay: "-9s" }}
      />
      <LeafGlyph
        id="ambient-leaf-a"
        tone="leaf"
        className="anim-float absolute left-[5%] top-[16%] h-28 w-28 rotate-[24deg] opacity-[0.10]"
      />
      <LeafGlyph
        id="ambient-leaf-b"
        tone="gold"
        className="anim-float absolute right-[7%] top-[52%] h-24 w-24 -rotate-[28deg] opacity-[0.12]"
        style={{ animationDuration: "19s", animationDelay: "-5s" }}
      />
      <LeafGlyph
        id="ambient-leaf-c"
        tone="leaf"
        className="anim-float absolute bottom-[6%] left-[42%] h-16 w-16 rotate-[160deg] opacity-[0.09]"
        style={{ animationDuration: "14s", animationDelay: "-2s" }}
      />
    </div>
  );
}

/**
 * Richer animated backdrop for deep-green panels (heroes, CTA bands).
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
      <div className="anim-drift absolute -right-24 -top-32 h-72 w-72 rounded-full bg-leaf-400/20 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
      <div className="anim-drift-alt absolute -bottom-44 -left-24 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
      <LeafGlyph
        id={`${idPrefix}-leaf-a`}
        tone="gold"
        className="anim-float absolute right-[10%] top-[10%] h-32 w-32 rotate-[26deg] opacity-20"
      />
      <LeafGlyph
        id={`${idPrefix}-leaf-b`}
        tone="white"
        className="anim-float absolute bottom-[6%] left-[5%] h-24 w-24 -rotate-[22deg] opacity-10"
        style={{ animationDuration: "18s", animationDelay: "-6s" }}
      />
      <LeafGlyph
        id={`${idPrefix}-leaf-c`}
        tone="gold"
        className="anim-float absolute left-[38%] top-[52%] h-14 w-14 rotate-[150deg] opacity-15"
        style={{ animationDuration: "13s", animationDelay: "-3s" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-px gold-hairline" />
    </div>
  );
}
