"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  addPropertyImage,
  deletePropertyImage,
  reorderPropertyImages,
  setPrimaryImage,
} from "@/app/admin/actions";
import { MAX_IMAGES_PER_UPLOAD } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import type { PropertyImage } from "@/lib/types";
import { extensionFor, validateImageFile } from "@/lib/uploads";
import { cn } from "@/lib/utils";

function isRemote(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

function ImageManagerContent({
  propertyId,
  images,
  altBase,
}: {
  propertyId: string;
  images: PropertyImage[];
  altBase: string;
}) {
  const router = useRouter();
  const [ordered, setOrdered] = useState(images);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");

  async function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    const files = Array.from(fileList).slice(0, MAX_IMAGES_PER_UPLOAD);
    setError(null);
    setMessage(null);
    setUploading(true);

    try {
      const supabase = createClient();
      let saved = 0;
      for (const [index, file] of files.entries()) {
        const invalid = validateImageFile(file);
        if (invalid) {
          setError(invalid);
          continue;
        }
        setProgress(`Uploading ${index + 1} of ${files.length}: ${file.name}`);
        const path = `${propertyId}/${crypto.randomUUID()}.${extensionFor(file)}`;
        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(path, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });
        if (uploadError) {
          setError(uploadError.message);
          continue;
        }
        const {
          data: { publicUrl },
        } = supabase.storage.from("property-images").getPublicUrl(path);
        const isPrimary = ordered.length + saved === 0;
        const result = await addPropertyImage({
          propertyId,
          url: publicUrl,
          storagePath: path,
          altText: `${altBase} photograph`,
          isPrimary,
          sortOrder: ordered.length + saved,
        });
        if (!result.ok) {
          // Clean up the orphaned file so storage is not left with an image
          // that has no database row.
          await supabase.storage.from("property-images").remove([path]);
          setError(result.error ?? "The image uploaded but could not be saved.");
          continue;
        }
        saved += 1;
      }
      if (saved) {
        setMessage(`${saved} photograph${saved === 1 ? "" : "s"} uploaded.`);
        router.refresh();
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "The upload failed. Please try again.",
      );
    } finally {
      setUploading(false);
      setProgress("");
    }
  }

  async function remove(image: PropertyImage) {
    setError(null);
    const result = await deletePropertyImage(image.id, propertyId);
    if (!result.ok) {
      setError(result.error ?? "Could not delete that photograph.");
      return;
    }
    setOrdered((current) => current.filter((item) => item.id !== image.id));
    router.refresh();
  }

  async function makePrimary(image: PropertyImage) {
    const result = await setPrimaryImage(image.id, propertyId);
    if (!result.ok) {
      setError(result.error ?? "Could not set the main photograph.");
      return;
    }
    router.refresh();
  }

  async function move(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= ordered.length) return;
    const next = [...ordered];
    const [item] = next.splice(index, 1);
    next.splice(nextIndex, 0, item);
    setOrdered(next);
    const result = await reorderPropertyImages(
      propertyId,
      next.map((image) => image.id),
    );
    if (!result.ok) {
      setError(result.error ?? "Could not reorder photographs.");
      setOrdered(ordered);
    }
  }

  return (
    <section className="rounded-lg border border-border bg-white p-5">
      <h2 className="font-display text-2xl text-brand-dark">Photographs</h2>
      <p className="mt-1 text-sm text-muted">
        JPEG, PNG, WebP, or GIF. Maximum 8 MB per file. The first photograph becomes
        the main image unless you choose another.
      </p>
      <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background px-4 py-8 text-center">
        <span className="font-medium text-brand-dark">
          {uploading ? "Uploading…" : "Select photographs to upload"}
        </span>
        <span className="mt-1 text-sm text-muted">You can select several at once.</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="sr-only"
          disabled={uploading}
          onChange={(event) => {
            void handleFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </label>
      {progress ? <p className="mt-3 text-sm text-brand">{progress}</p> : null}
      {message ? <p className="mt-3 text-sm text-brand">{message}</p> : null}
      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}

      {ordered.length ? (
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((image, index) => (
            <li key={image.id} className="overflow-hidden rounded-md border border-border">
              <div className="relative aspect-[4/3] bg-neutral-100">
                <Image
                  src={image.url}
                  alt={image.alt_text || altBase}
                  fill
                  sizes="280px"
                  className="object-cover"
                  unoptimized={!isRemote(image.url)}
                />
                {image.is_primary ? (
                  <span className="absolute left-2 top-2 rounded-full bg-brand px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                    Main
                  </span>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2 p-3 text-xs">
                {!image.is_primary ? (
                  <button
                    type="button"
                    className="rounded-full border border-border px-3 py-1 hover:border-brand"
                    onClick={() => void makePrimary(image)}
                  >
                    Set as main
                  </button>
                ) : null}
                <button
                  type="button"
                  className={cn(
                    "rounded-full border border-border px-3 py-1",
                    index === 0 && "opacity-40",
                  )}
                  disabled={index === 0}
                  onClick={() => void move(index, -1)}
                >
                  Move up
                </button>
                <button
                  type="button"
                  className={cn(
                    "rounded-full border border-border px-3 py-1",
                    index === ordered.length - 1 && "opacity-40",
                  )}
                  disabled={index === ordered.length - 1}
                  onClick={() => void move(index, 1)}
                >
                  Move down
                </button>
                <button
                  type="button"
                  className="rounded-full border border-red-200 px-3 py-1 text-red-700 hover:bg-red-50"
                  onClick={() => void remove(image)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-sm text-muted">No photographs yet.</p>
      )}
    </section>
  );
}

export function ImageManager(props: {
  propertyId: string;
  images: PropertyImage[];
  altBase: string;
}) {
  const imageKey = props.images
    .map((image) => `${image.id}:${image.sort_order}:${image.is_primary}`)
    .join("|");

  return <ImageManagerContent key={imageKey} {...props} />;
}
