"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CURRENCIES,
  LISTING_TYPES,
  PRICE_PERIODS,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
} from "@/lib/constants";
import type { Property } from "@/lib/types";
import { addPropertyImage, createProperty, updateProperty } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/client";
import { extensionFor, validateImageFile } from "@/lib/uploads";

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-foreground">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-border px-3 py-2 text-sm focus-visible:outline-brand";

export function PropertyForm({ property }: { property?: Property }) {
  const router = useRouter();
  const isEdit = Boolean(property);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(formData: FormData) {
    setError(null);
    setNote(null);
    setPending(true);

    const result = isEdit
      ? await updateProperty(property!.id, { ok: false }, formData)
      : await createProperty({ ok: false }, formData);

    if (!result.ok || !result.id) {
      setPending(false);
      setError(result.error ?? "The property could not be saved.");
      return;
    }

    if (!isEdit && files.length) {
      try {
        const supabase = createClient();
        for (const [index, file] of files.entries()) {
          const invalid = validateImageFile(file);
          if (invalid) {
            setError(invalid);
            continue;
          }
          setNote(`Uploading photograph ${index + 1} of ${files.length}`);
          const path = `${result.id}/${crypto.randomUUID()}.${extensionFor(file)}`;
          const { error: uploadError } = await supabase.storage
            .from("property-images")
            .upload(path, file, { contentType: file.type, upsert: false });
          if (uploadError) {
            setError(uploadError.message);
            continue;
          }
          const {
            data: { publicUrl },
          } = supabase.storage.from("property-images").getPublicUrl(path);
          const saved = await addPropertyImage({
            propertyId: result.id,
            url: publicUrl,
            storagePath: path,
            altText: `${String(formData.get("title") ?? "Property")} photograph`,
            isPrimary: index === 0,
            sortOrder: index,
          });
          if (!saved.ok) {
            // Clean up the orphaned file so storage is not left with an image
            // that has no database row.
            await supabase.storage.from("property-images").remove([path]);
            setError(
              saved.error ?? "A photograph was uploaded but could not be saved.",
            );
            continue;
          }
        }
      } catch (uploadError) {
        setPending(false);
        setError(
          uploadError instanceof Error
            ? `Property saved, but photographs failed: ${uploadError.message}`
            : "Property saved, but photographs failed to upload.",
        );
        router.push(`/admin/properties/${result.id}`);
        router.refresh();
        return;
      }
    }

    setPending(false);
    if (isEdit) {
      setNote("Property saved.");
      router.refresh();
      return;
    }

    router.push(`/admin/properties/${result.id}`);
    router.refresh();
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit(new FormData(event.currentTarget));
      }}
      className="space-y-6"
    >
      {error ? (
        <p
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      {note ? (
        <p className="rounded-md border border-brand/20 bg-brand-muted px-4 py-3 text-sm text-brand-dark">
          {note}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Property title">
          <input
            required
            name="title"
            defaultValue={property?.title ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Location">
          <input
            name="location"
            defaultValue={property?.location ?? ""}
            placeholder="e.g. Georgetown"
            className={inputClass}
          />
        </Field>
        <Field label="Listing type">
          <select
            name="listing_type"
            defaultValue={property?.listing_type ?? "sale"}
            className={inputClass}
          >
            {LISTING_TYPES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select
            name="status"
            defaultValue={property?.status ?? "available"}
            className={inputClass}
          >
            {PROPERTY_STATUSES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Property type">
          <select
            name="property_type"
            defaultValue={property?.property_type ?? "house"}
            className={inputClass}
          >
            {PROPERTY_TYPES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Address" hint="Optional. Shown only if provided.">
          <input
            name="address"
            defaultValue={property?.address ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Price">
          <input
            name="price"
            type="number"
            min="0"
            step="1"
            defaultValue={property?.price ?? ""}
            className={inputClass}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Currency">
            <select
              name="currency"
              defaultValue={property?.currency ?? "GYD"}
              className={inputClass}
            >
              {CURRENCIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Price period">
            <select
              name="price_period"
              defaultValue={property?.price_period ?? ""}
              className={inputClass}
            >
              {PRICE_PERIODS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Bedrooms">
          <input
            name="bedrooms"
            type="number"
            min="0"
            defaultValue={property?.bedrooms ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Bathrooms">
          <input
            name="bathrooms"
            type="number"
            min="0"
            step="0.5"
            defaultValue={property?.bathrooms ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Property size">
          <input
            name="property_size"
            defaultValue={property?.property_size ?? ""}
            placeholder="e.g. 1,800 sq ft"
            className={inputClass}
          />
        </Field>
        <Field label="Lot size">
          <input
            name="lot_size"
            defaultValue={property?.lot_size ?? ""}
            placeholder="e.g. 50 x 100"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Description">
        <textarea
          name="description"
          rows={6}
          defaultValue={property?.description ?? ""}
          className={inputClass}
        />
      </Field>
      <Field label="Features" hint="Separate features with commas or new lines.">
        <textarea
          name="features"
          rows={4}
          defaultValue={property?.features?.join("\n") ?? ""}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Contact phone override"
          hint="Leave blank to use the company number."
        >
          <input
            name="contact_phone"
            defaultValue={property?.contact_phone ?? ""}
            className={inputClass}
          />
        </Field>
        <Field
          label="Contact email override"
          hint="Leave blank to use the company email."
        >
          <input
            name="contact_email"
            type="email"
            defaultValue={property?.contact_email ?? ""}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={property?.is_published ?? true}
          />
          Published on the website
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={property?.is_featured ?? false}
          />
          Featured on the homepage
        </label>
      </div>

      {!isEdit ? (
        <Field label="Photographs" hint="You can add more photographs after saving.">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className={inputClass}
            onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
          />
          {files.length ? (
            <span className="mt-1 block text-xs text-muted">
              {files.length} file{files.length === 1 ? "" : "s"} selected
            </span>
          ) : null}
        </Field>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {pending ? "Saving…" : isEdit ? "Save changes" : "Add property"}
        </button>
      </div>
    </form>
  );
}
