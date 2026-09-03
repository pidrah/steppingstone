"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteProperty } from "@/app/admin/actions";

export function DeletePropertyButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <div>
      <button
        type="button"
        disabled={pending}
        className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
        onClick={async () => {
          if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return;
          setPending(true);
          const result = await deleteProperty(id);
          setPending(false);
          if (!result.ok) {
            setError(result.error ?? "Could not delete the property.");
            return;
          }
          router.push("/admin/properties");
          router.refresh();
        }}
      >
        {pending ? "Deleting…" : "Delete property"}
      </button>
      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
