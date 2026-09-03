import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getUser } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  const user = await getUser();
  if (!user) {
    redirect("/admin/login");
  }

  return <AdminShell email={user.email}>{children}</AdminShell>;
}
