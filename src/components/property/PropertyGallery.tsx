"use client";

import Image from "next/image";
import { useState } from "react";
import type { PropertyImage } from "@/lib/types";
import { cn } from "@/lib/utils";

function isRemote(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

export function PropertyGallery({
  images,
  title,
}: {
  images: PropertyImage[];
  title: string;
}) {
  const ordered = [...images].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return a.sort_order - b.sort_order;
  });
  const [active, setActive] = useState(0);
  const current = ordered[active];

  if (!ordered.length) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-brand-muted text-brand-dark">
        No photographs have been added for this property yet.
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200">
        <Image
          src={current.url}
          alt={current.alt_text || title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          unoptimized={!isRemote(current.url)}
        />
      </div>
      {ordered.length > 1 ? (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {ordered.map((image, index) => (
            <li key={image.id}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show photograph ${index + 1} of ${ordered.length}`}
                aria-current={index === active}
                className={cn(
                  "relative aspect-square w-full overflow-hidden rounded-md border-2",
                  index === active ? "border-brand" : "border-transparent",
                )}
              >
                <Image
                  src={image.url}
                  alt={image.alt_text || `${title} photograph ${index + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                  unoptimized={!isRemote(image.url)}
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
