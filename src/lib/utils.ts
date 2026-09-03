import {
  COMPANY,
  LISTING_TYPES,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
} from "@/lib/constants";
import type { ListingType, Property, PropertyStatus, PropertyType } from "@/lib/types";

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

export function slugify(value: string) {
  const base = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
  return base || "property";
}

export function uniqueSlug(title: string) {
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${slugify(title)}-${suffix}`;
}

export function listingLabel(type: ListingType | string) {
  return LISTING_TYPES.find((item) => item.value === type)?.label ?? type;
}

export function statusLabel(status: PropertyStatus | string) {
  return PROPERTY_STATUSES.find((item) => item.value === status)?.label ?? status;
}

export function propertyTypeLabel(type: PropertyType | string) {
  return PROPERTY_TYPES.find((item) => item.value === type)?.label ?? type;
}

export function formatPrice(
  price: number | null | undefined,
  currency = "GYD",
  period?: string | null,
) {
  if (price === null || price === undefined || Number.isNaN(Number(price))) {
    return null;
  }

  const amount = new Intl.NumberFormat("en-GY", {
    maximumFractionDigits: 0,
  }).format(Number(price));

  const code = currency || "GYD";
  const periodLabel =
    period === "month"
      ? " / month"
      : period === "year"
        ? " / year"
        : period === "week"
          ? " / week"
          : "";

  return `${code} ${amount}${periodLabel}`;
}

export function primaryImage(property: Property) {
  if (!property.images?.length) return null;
  return (
    property.images.find((image) => image.is_primary) ??
    [...property.images].sort((a, b) => a.sort_order - b.sort_order)[0]
  );
}

export function hasText(value: string | null | undefined) {
  return Boolean(value && value.trim().length > 0);
}

export function splitFeatures(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseOptionalNumber(value: FormDataEntryValue | null) {
  if (value === null || value === undefined) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseOptionalText(value: FormDataEntryValue | null) {
  if (value === null || value === undefined) return null;
  const raw = String(value).trim();
  return raw.length ? raw : null;
}

export function enquiryMailto(propertyTitle?: string) {
  const subject = propertyTitle
    ? `Enquiry: ${propertyTitle}`
    : "Property enquiry — Steppingstone Realty";
  return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}`;
}

export function whatsappHref(message?: string) {
  if (!message) return COMPANY.whatsappUrl;
  return `${COMPANY.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function emptyProfile(): {
  name: string;
  title: string;
  photo_url: string | null;
  photo_path: string | null;
  biography: string | null;
  experience: string | null;
  years_of_experience: string | null;
  areas_of_expertise: string | null;
  qualifications: string | null;
  achievements: string | null;
  areas_served: string | null;
  philosophy: string | null;
} {
  return {
    name: COMPANY.principal,
    title: COMPANY.principalTitle,
    photo_url: null,
    photo_path: null,
    biography: null,
    experience: null,
    years_of_experience: null,
    areas_of_expertise: null,
    qualifications: null,
    achievements: null,
    areas_served: null,
    philosophy: null,
  };
}

export const DEFAULT_AGENCY_SERVICES = [
  "Property and facility administration and management",
  "Survey and valuation",
  "Brokerage",
  "Short- and long-term rentals",
  "Property sales",
  "House agency",
  "Property consultation and advisory",
  "Letting services",
];

export function defaultSiteContent(): Record<string, string> {
  return {
    home_intro:
      "Steppingstone Realty provides estate agency services in Guyana. That includes property and facility administration and management, survey and valuation, brokerage, short- and long-term rentals, property sales, house agency, property consultation and advisory, and letting services.",
    home_services: DEFAULT_AGENCY_SERVICES.join("\n"),
    services_intro:
      "Steppingstone Realty also assists landlords and property owners with caretaking and management. If you are away, or simply want a local partner looking after your property, we would be glad to talk.",
    services_cta: "Looking for someone to care for your property in Guyana?",
  };
}

export function parseLines(value: string | undefined) {
  return (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
