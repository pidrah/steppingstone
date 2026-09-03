import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/ui/Logo";
import { isSupabaseConfigured } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Office sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-lg border border-border bg-white p-8 shadow-sm">
        <Logo href="/" />
        <h1 className="mt-8 font-display text-3xl text-brand-dark">Office sign in</h1>
        <p className="mt-2 text-sm text-muted">
          This area is for Steppingstone Realty staff to manage listings and
          website content.
        </p>
        <div className="mt-6">
          <LoginForm configured={isSupabaseConfigured()} />
        </div>
      </div>
    </main>
  );
}
