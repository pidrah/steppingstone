import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Container className="py-24 text-center">
          <h1 className="font-display text-4xl text-brand-dark">Page not found</h1>
          <p className="mx-auto mt-4 max-w-md text-muted">
            That page does not exist. It may have been moved, or the property is
            no longer listed.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Back to home
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
