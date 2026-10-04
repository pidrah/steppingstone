import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/ui/Logo";
import { isSupabaseConfigured, safeAdminPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Office sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-leaf-900/10 bg-white p-8 shadow-lift">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand-bar" />
        <Logo href="/" />
        <h1 className="mt-8 font-display text-3xl text-leaf-900">Office sign in</h1>
        <p className="mt-2 text-sm text-muted">
          This area is for Steppingstone Realty staff to manage listings and
          website content.
        </p>
        <div className="mt-6">
          <LoginForm
            configured={isSupabaseConfigured()}
            next={safeAdminPath(next)}
          />
        </div>
      </div>
    </main>
  );
}
