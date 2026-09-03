import { PropertyForm } from "@/components/admin/PropertyForm";

export const dynamic = "force-dynamic";

export default function NewPropertyPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-4xl text-brand-dark">Add property</h1>
      <p className="mt-2 text-muted">
        Fill in the details, then upload photographs. Unpublished listings stay
        off the public website until you are ready.
      </p>
      <div className="mt-8 rounded-lg border border-border bg-white p-5 md:p-8">
        <PropertyForm />
      </div>
    </div>
  );
}
