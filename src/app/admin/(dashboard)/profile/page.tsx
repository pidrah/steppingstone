import { ProfileForm } from "@/components/admin/ProfileForm";
import { getRealtorProfile } from "@/lib/queries";
import { emptyProfile } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const profile = await getRealtorProfile();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-4xl text-brand-dark">
        Principal Realtor profile
      </h1>
      <p className="mt-2 text-muted">
        Empty fields stay hidden on the public website. You can add biography,
        experience, and a photograph whenever you are ready.
      </p>
      <div className="mt-8">
        <ProfileForm
          profile={
            profile ?? {
              id: "local",
              ...emptyProfile(),
              updated_at: new Date().toISOString(),
            }
          }
        />
      </div>
    </div>
  );
}
