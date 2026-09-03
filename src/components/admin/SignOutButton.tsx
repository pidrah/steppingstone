import { signOut } from "@/app/admin/actions";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="text-sm font-medium text-muted hover:text-brand"
      >
        Sign out
      </button>
    </form>
  );
}
