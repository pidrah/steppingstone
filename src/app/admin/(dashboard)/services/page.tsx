import { ServicesManager } from "@/components/admin/ServicesManager";
import { getAdminServices } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await getAdminServices();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-4xl text-brand-dark">
        Property-care services
      </h1>
      <p className="mt-2 text-muted">
        These appear on the Property Care page. Add, edit, hide, or remove them
        at any time.
      </p>
      <div className="mt-8">
        <ServicesManager services={services} />
      </div>
    </div>
  );
}
