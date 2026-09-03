"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import { LISTING_TYPES, PROPERTY_TYPES } from "@/lib/constants";
import type { PropertyFilters as Filters } from "@/lib/types";

export function PropertyFilters({
  current,
  locations,
}: {
  current: Filters;
  locations: string[];
}) {
  const router = useRouter();

  const listingTabs = useMemo(
    () => [{ value: "all", label: "All" }, ...LISTING_TYPES],
    [],
  );

  function apply(form: HTMLFormElement) {
    const data = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      const raw = String(value).trim();
      if (raw && raw !== "all") params.set(key, raw);
    }
    const query = params.toString();
    router.push(query ? `/properties?${query}` : "/properties");
  }

  return (
    <form
      className="rounded-lg border border-border bg-white p-4 shadow-sm md:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        apply(event.currentTarget);
      }}
    >
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Listing type">
        {listingTabs.map((tab) => {
          const active = (current.listing ?? "all") === tab.value;
          return (
            <Link
              key={tab.value}
              href={tab.value === "all" ? "/properties" : `/properties?listing=${tab.value}`}
              className={
                active
                  ? "rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
                  : "rounded-full bg-brand-muted px-4 py-2 text-sm font-medium text-brand-dark hover:bg-brand/15"
              }
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Keyword</span>
          <input
            name="q"
            defaultValue={current.q ?? ""}
            placeholder="Title or area"
            className="w-full rounded-md border border-border px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Property type</span>
          <select
            name="type"
            defaultValue={current.type ?? "all"}
            className="w-full rounded-md border border-border px-3 py-2"
          >
            <option value="all">Any type</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Location</span>
          {locations.length ? (
            <select
              name="location"
              defaultValue={current.location ?? ""}
              className="w-full rounded-md border border-border px-3 py-2"
            >
              <option value="">Any location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          ) : (
            <input
              name="location"
              defaultValue={current.location ?? ""}
              placeholder="e.g. Georgetown"
              className="w-full rounded-md border border-border px-3 py-2"
            />
          )}
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Min. bedrooms</span>
          <select
            name="bedrooms"
            defaultValue={current.bedrooms ?? ""}
            className="w-full rounded-md border border-border px-3 py-2"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((count) => (
              <option key={count} value={count}>
                {count}+
              </option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Min price</span>
            <input
              name="minPrice"
              type="number"
              min="0"
              defaultValue={current.minPrice ?? ""}
              className="w-full rounded-md border border-border px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Max price</span>
            <input
              name="maxPrice"
              type="number"
              min="0"
              defaultValue={current.maxPrice ?? ""}
              className="w-full rounded-md border border-border px-3 py-2"
            />
          </label>
        </div>
      </div>
      <input type="hidden" name="listing" value={current.listing ?? "all"} />
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Apply filters
        </button>
        <Link
          href="/properties"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-brand"
        >
          Clear
        </Link>
      </div>
    </form>
  );
}
