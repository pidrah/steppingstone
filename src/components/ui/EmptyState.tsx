import type { ReactNode } from "react";
import { LeafGlyph } from "@/components/site/AmbientBackground";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "panel-dim rounded-2xl border-dashed border-white/20 px-6 py-14 text-center",
        className,
      )}
    >
      <LeafGlyph tone="gold" className="mx-auto h-10 w-10 rotate-[24deg] opacity-90" />
      <p className="mt-5 font-display text-2xl text-white">{title}</p>
      {description ? (
        <p className="mx-auto mt-3 max-w-md text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
