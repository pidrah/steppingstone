"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import { LISTING_TYPES, PROPERTY_TYPES } from "@/lib/constants";
import type { PropertyFilters as Filters } from "@/lib/types";

const field =
  "w-full rounded-xl border border-leaf-900/15 bg-white px-3.5 py-2.5 text-base shadow-sm transition focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20 sm:text-sm";

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
      className="rounded-2xl border border-leaf-900/10 bg-white/90 p-4 shadow-soft backdrop-blur md:p-5"
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
                  ? "rounded-full bg-linear-to-r from-leaf-600 to-leaf-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
                  : "rounded-full bg-leaf-50 px-4 py-2.5 text-sm font-medium text-leaf-800 transition hover:bg-leaf-100"
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
            className={field}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Property type</span>
          <select
            name="type"
            defaultValue={current.type ?? "all"}
            className={field}
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
              className={field}
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
              className={field}
            />
          )}
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Min. bedrooms</span>
          <select
            name="bedrooms"
            defaultValue={current.bedrooms ?? ""}
            className={field}
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
              className={field}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Max price</span>
            <input
              name="maxPrice"
              type="number"
              min="0"
              defaultValue={current.maxPrice ?? ""}
              className={field}
            />
          </label>
        </div>
      </div>
      <input type="hidden" name="listing" value={current.listing ?? "all"} />
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-full bg-linear-to-r from-leaf-600 to-leaf-700 px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:from-leaf-700 hover:to-leaf-800"
        >
          Apply filters
        </button>
        <Link
          href="/properties"
          className="rounded-full border border-leaf-900/15 bg-white px-6 py-2.5 text-sm font-medium transition hover:border-gold-400 hover:text-leaf-900"
        >
          Clear
        </Link>
      </div>
    </form>
  );
}
