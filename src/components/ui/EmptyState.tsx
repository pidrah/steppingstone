import type { ReactNode } from "react";
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
        "rounded-lg border border-dashed border-border bg-white px-6 py-14 text-center",
        className,
      )}
    >
      <p className="font-display text-2xl text-brand-dark">{title}</p>
      {description ? (
        <p className="mx-auto mt-3 max-w-md text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
