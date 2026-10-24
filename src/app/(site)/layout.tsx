import { AmbientBackground } from "@/components/site/AmbientBackground";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-dim min-h-dvh bg-background text-foreground">
      <AmbientBackground />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
