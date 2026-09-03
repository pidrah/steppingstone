"use client";

import { useActionState } from "react";
import { updateSiteContent } from "@/app/admin/actions";
import type { ActionResult, SiteContent } from "@/lib/types";

const initial: ActionResult = { ok: false };
const inputClass = "w-full rounded-md border border-border px-3 py-2 text-sm";

export function ContentForm({ content }: { content: SiteContent }) {
  const [state, action, pending] = useActionState(updateSiteContent, initial);

  return (
    <form action={action} className="space-y-5 rounded-lg border border-border bg-white p-5 md:p-8">
      {state.error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">{state.error}</p>
      ) : null}
      {state.ok ? (
        <p className="rounded-md bg-brand-muted px-3 py-2 text-sm text-brand-dark">
          Site content saved.
        </p>
      ) : null}
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Homepage introduction</span>
        <textarea
          name="home_intro"
          rows={5}
          defaultValue={content.home_intro ?? ""}
          className={inputClass}
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Estate agency services</span>
        <textarea
          name="home_services"
          rows={8}
          defaultValue={content.home_services ?? ""}
          className={inputClass}
        />
        <span className="mt-1 block text-xs text-muted">
          One service per line. Shown on the homepage.
        </span>
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Property Care page introduction</span>
        <textarea
          name="services_intro"
          rows={4}
          defaultValue={content.services_intro ?? ""}
          className={inputClass}
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Property Care call to action</span>
        <input
          name="services_cta"
          defaultValue={content.services_cta ?? ""}
          className={inputClass}
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save content"}
      </button>
    </form>
  );
}
