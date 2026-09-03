"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteDemoProperties } from "@/app/admin/actions";

export function DeleteDemoButton({ count }: { count: number }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <button
        type="button"
        disabled={pending}
        className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
        onClick={async () => {
          if (
            !window.confirm(
              `Delete ${count} sample listing${count === 1 ? "" : "s"}? This cannot be undone.`,
            )
          ) {
            return;
          }
          setPending(true);
          const result = await deleteDemoProperties();
          setPending(false);
          if (!result.ok) {
            setError(result.error ?? "Could not delete sample listings.");
            return;
          }
          router.refresh();
        }}
      >
        {pending ? "Deleting…" : "Delete sample listings"}
      </button>
      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
