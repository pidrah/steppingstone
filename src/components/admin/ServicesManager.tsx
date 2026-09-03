"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { createService, deleteService, updateService } from "@/app/admin/actions";
import type { ActionResult, Service } from "@/lib/types";

const initial: ActionResult = { ok: false };
const inputClass = "w-full rounded-md border border-border px-3 py-2 text-sm";

function ServiceRow({ service }: { service: Service }) {
  const router = useRouter();
  const action = updateService.bind(null, service.id);
  const [state, formAction, pending] = useActionState(action, initial);
  const [error, setError] = useState<string | null>(null);

  return (
    <form action={formAction} className="space-y-3 rounded-lg border border-border bg-white p-4">
      {state.error || error ? (
        <p className="text-sm text-red-700">{error || state.error}</p>
      ) : null}
      {state.ok ? <p className="text-sm text-brand">Saved.</p> : null}
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Title</span>
        <input name="title" defaultValue={service.title} className={inputClass} required />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Description</span>
        <textarea
          name="description"
          rows={3}
          defaultValue={service.description ?? ""}
          className={inputClass}
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm">
          <span className="mr-2 font-medium">Order</span>
          <input
            name="sort_order"
            type="number"
            defaultValue={service.sort_order}
            className="w-24 rounded-md border border-border px-2 py-1 text-sm"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={service.is_published}
          />
          Visible on the website
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          className="rounded-full border border-red-200 px-4 py-2 text-sm text-red-700"
          onClick={async () => {
            if (!window.confirm(`Remove “${service.title}”?`)) return;
            const result = await deleteService(service.id);
            if (!result.ok) {
              setError(result.error ?? "Could not delete the service.");
              return;
            }
            router.refresh();
          }}
        >
          Delete
        </button>
      </div>
    </form>
  );
}

export function ServicesManager({ services }: { services: Service[] }) {
  const [state, action, pending] = useActionState(createService, initial);

  return (
    <div className="space-y-8">
      <form action={action} className="space-y-3 rounded-lg border border-dashed border-border bg-white p-5">
        <h2 className="font-display text-2xl text-brand-dark">Add a service</h2>
        {state.error ? <p className="text-sm text-red-700">{state.error}</p> : null}
        {state.ok ? <p className="text-sm text-brand">Service added.</p> : null}
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Title</span>
          <input name="title" required className={inputClass} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Description</span>
          <textarea name="description" rows={3} className={inputClass} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_published" defaultChecked />
          Visible on the website
        </label>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Adding…" : "Add service"}
        </button>
      </form>

      {services.length ? (
        <div className="space-y-4">
          {services.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">
          No services yet. Add the first one above; it will appear on the Property Care
          page once it is marked visible.
        </p>
      )}
    </div>
  );
}
