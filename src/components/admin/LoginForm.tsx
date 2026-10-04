"use client";

import { useActionState } from "react";
import { signIn } from "@/app/admin/actions";
import type { ActionResult } from "@/lib/types";

const initial: ActionResult = { ok: false };

export function LoginForm({
  configured,
  next = "/admin",
}: {
  configured: boolean;
  next?: string;
}) {
  const [state, action, pending] = useActionState(signIn, initial);

  if (!configured) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
        <p className="font-semibold">Supabase is not configured yet.</p>
        <p className="mt-2 leading-6">
          Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>.env.local</code>,
          then create an admin user in the Supabase dashboard. See the README for
          the full setup steps.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      {state.error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {state.error}
        </p>
      ) : null}
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="username"
          className="w-full rounded-xl border border-leaf-900/15 bg-white px-3.5 py-2.5 text-base shadow-sm transition focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 sm:text-sm"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Password</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-leaf-900/15 bg-white px-3.5 py-2.5 text-base shadow-sm transition focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 sm:text-sm"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-linear-to-r from-leaf-600 to-leaf-700 px-4 py-3 text-base font-semibold text-white shadow-soft transition hover:from-leaf-700 hover:to-leaf-800 disabled:opacity-60 sm:text-sm"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
