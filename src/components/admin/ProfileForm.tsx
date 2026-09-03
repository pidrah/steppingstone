"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import {
  removeRealtorPhoto,
  updateRealtorPhoto,
  updateRealtorProfile,
} from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/client";
import type { ActionResult, RealtorProfile } from "@/lib/types";
import { extensionFor, validateImageFile } from "@/lib/uploads";

const inputClass =
  "w-full rounded-md border border-border px-3 py-2 text-sm";
const initial: ActionResult = { ok: false };

export function ProfileForm({ profile }: { profile: RealtorProfile }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(updateRealtorProfile, initial);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photoNote, setPhotoNote] = useState<string | null>(null);

  async function onPhoto(file: File | undefined) {
    if (!file) return;
    const invalid = validateImageFile(file);
    if (invalid) {
      setPhotoError(invalid);
      return;
    }
    setPhotoError(null);
    setPhotoNote("Uploading photograph…");
    try {
      const supabase = createClient();
      const path = `principal/${crypto.randomUUID()}.${extensionFor(file)}`;
      const { error } = await supabase.storage
        .from("profile-images")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (error) {
        setPhotoError(error.message);
        setPhotoNote(null);
        return;
      }
      const {
        data: { publicUrl },
      } = supabase.storage.from("profile-images").getPublicUrl(path);
      const result = await updateRealtorPhoto({ url: publicUrl, path });
      if (!result.ok) {
        setPhotoError(result.error ?? "Could not save the photograph.");
        setPhotoNote(null);
        return;
      }
      setPhotoNote("Photograph saved.");
      router.refresh();
    } catch (error) {
      setPhotoError(error instanceof Error ? error.message : "Upload failed.");
      setPhotoNote(null);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-border bg-white p-5">
        <h2 className="font-display text-2xl text-brand-dark">Profile photograph</h2>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative h-36 w-36 overflow-hidden rounded-full bg-brand-muted">
            {profile.photo_url ? (
              <Image
                src={profile.photo_url}
                alt={`${profile.name} profile photograph`}
                fill
                className="object-cover"
                unoptimized={!profile.photo_url.startsWith("http")}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-brand-dark/70">
                No photo
              </div>
            )}
          </div>
          <div className="space-y-3">
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Upload a photograph</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(event) => void onPhoto(event.target.files?.[0])}
              />
            </label>
            {profile.photo_url ? (
              <button
                type="button"
                className="text-sm text-red-700 hover:underline"
                onClick={async () => {
                  const result = await removeRealtorPhoto();
                  if (!result.ok) setPhotoError(result.error ?? "Could not remove photo.");
                  else router.refresh();
                }}
              >
                Remove photograph
              </button>
            ) : null}
            {photoNote ? <p className="text-sm text-brand">{photoNote}</p> : null}
            {photoError ? <p className="text-sm text-red-700">{photoError}</p> : null}
          </div>
        </div>
      </section>

      <form action={action} className="space-y-4 rounded-lg border border-border bg-white p-5">
        {state.error ? (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">{state.error}</p>
        ) : null}
        {state.ok ? (
          <p className="rounded-md bg-brand-muted px-3 py-2 text-sm text-brand-dark">
            Profile saved. Empty fields stay hidden on the public website.
          </p>
        ) : null}
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block font-medium">Name</span>
            <input name="name" defaultValue={profile.name} className={inputClass} />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Title</span>
            <input name="title" defaultValue={profile.title} className={inputClass} />
          </label>
        </div>
        {(
          [
            ["biography", "Biography", profile.biography],
            ["experience", "Professional experience", profile.experience],
            ["years_of_experience", "Years of experience", profile.years_of_experience],
            ["areas_of_expertise", "Areas of expertise", profile.areas_of_expertise],
            ["qualifications", "Qualifications", profile.qualifications],
            ["achievements", "Professional achievements", profile.achievements],
            ["areas_served", "Areas served", profile.areas_served],
            ["philosophy", "Personal / professional philosophy", profile.philosophy],
          ] as const
        ).map(([name, label, value]) => (
          <label key={name} className="block text-sm">
            <span className="mb-1 block font-medium">{label}</span>
            <textarea
              name={name}
              rows={name === "years_of_experience" ? 2 : 4}
              defaultValue={value ?? ""}
              className={inputClass}
            />
          </label>
        ))}
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save profile"}
        </button>
      </form>
    </div>
  );
}
