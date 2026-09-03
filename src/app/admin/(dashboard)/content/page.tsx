import { ContentForm } from "@/components/admin/ContentForm";
import { getSiteContent } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const content = await getSiteContent();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-4xl text-brand-dark">Site content</h1>
      <p className="mt-2 text-muted">
        Update the homepage introduction and the wording on the Property Care
        page.
      </p>
      <div className="mt-8">
        <ContentForm content={content} />
      </div>
    </div>
  );
}
