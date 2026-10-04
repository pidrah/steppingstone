import Link from "next/link";
import { AmbientBackground, LeafGlyph } from "@/components/site/AmbientBackground";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <AmbientBackground />
      <Header />
      <main className="flex-1">
        <Container className="py-24 text-center">
          <LeafGlyph tone="gold" className="mx-auto h-14 w-14 rotate-[24deg] opacity-90" />
          <h1 className="mt-6 font-display text-4xl text-leaf-900">Page not found</h1>
          <p className="mx-auto mt-4 max-w-md text-muted">
            That page does not exist. It may have been moved, or the property is
            no longer listed.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-linear-to-r from-leaf-600 to-leaf-700 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:from-leaf-700 hover:to-leaf-800"
          >
            Back to home
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
