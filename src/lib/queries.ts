import { cache } from "react";
import { defaultSiteContent, emptyProfile, isSupabaseConfigured } from "@/lib/utils";
import type {
  Property,
  PropertyFilters,
  PropertyImage,
  RealtorProfile,
  Service,
  SiteContent,
} from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

const PROPERTY_SELECT = `
  *,
  images:property_images (
    id,
    property_id,
    url,
    storage_path,
    alt_text,
    sort_order,
    is_primary,
    created_at
  )
`;

function sortImages(images: PropertyImage[] | null | undefined) {
  return [...(images ?? [])].sort((a, b) => a.sort_order - b.sort_order);
}

function mapProperty(row: Property & { images?: PropertyImage[] | null }): Property {
  return {
    ...row,
    price: row.price === null || row.price === undefined ? null : Number(row.price),
    bathrooms:
      row.bathrooms === null || row.bathrooms === undefined
        ? null
        : Number(row.bathrooms),
    features: row.features ?? [],
    images: sortImages(row.images),
  };
}

export const getPublishedProperties = cache(async function getPublishedProperties(
  filters: PropertyFilters = {},
): Promise<Property[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = await createClient();
    let query = supabase
      .from("properties")
      .select(PROPERTY_SELECT)
      .eq("is_published", true)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (filters.listing && filters.listing !== "all") {
      query = query.eq("listing_type", filters.listing);
    }
    if (filters.type && filters.type !== "all") {
      query = query.eq("property_type", filters.type);
    }
    if (filters.location) {
      query = query.ilike("location", `%${filters.location}%`);
    }
    if (filters.q) {
      query = query.or(
        `title.ilike.%${filters.q}%,description.ilike.%${filters.q}%,location.ilike.%${filters.q}%,address.ilike.%${filters.q}%`,
      );
    }
    if (filters.bedrooms) {
      const bedrooms = Number(filters.bedrooms);
      if (Number.isFinite(bedrooms)) {
        query = query.gte("bedrooms", bedrooms);
      }
    }
    if (filters.minPrice) {
      const minPrice = Number(filters.minPrice);
      if (Number.isFinite(minPrice)) {
        query = query.gte("price", minPrice);
      }
    }
    if (filters.maxPrice) {
      const maxPrice = Number(filters.maxPrice);
      if (Number.isFinite(maxPrice)) {
        query = query.lte("price", maxPrice);
      }
    }

    const { data, error } = await query;
    if (error) {
      console.error("Failed to load properties:", error.message);
      return [];
    }
    return (data ?? []).map((row) => mapProperty(row as Property));
  } catch (error) {
    console.error("Failed to load properties:", error);
    return [];
  }
});

export const getFeaturedProperties = cache(async function getFeaturedProperties() {
  const properties = await getPublishedProperties();
  const featured = properties.filter((property) => property.is_featured);
  return (featured.length ? featured : properties).slice(0, 3);
});

export const getPropertyBySlug = cache(async function getPropertyBySlug(
  slug: string,
): Promise<Property | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("properties")
      .select(PROPERTY_SELECT)
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) {
      console.error("Failed to load property:", error.message);
      return null;
    }
    return data ? mapProperty(data as Property) : null;
  } catch (error) {
    console.error("Failed to load property:", error);
    return null;
  }
});

export const getAdminProperties = cache(async function getAdminProperties(): Promise<
  Property[]
> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("properties")
      .select(PROPERTY_SELECT)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load admin properties:", error.message);
      return [];
    }
    return (data ?? []).map((row) => mapProperty(row as Property));
  } catch (error) {
    console.error("Failed to load admin properties:", error);
    return [];
  }
});

export const getAdminProperty = cache(async function getAdminProperty(
  id: string,
): Promise<Property | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("properties")
      .select(PROPERTY_SELECT)
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Failed to load admin property:", error.message);
      return null;
    }
    return data ? mapProperty(data as Property) : null;
  } catch (error) {
    console.error("Failed to load admin property:", error);
    return null;
  }
});

export const getRealtorProfile = cache(async function getRealtorProfile(): Promise<
  RealtorProfile | null
> {
  if (!isSupabaseConfigured()) {
    return {
      id: "local",
      ...emptyProfile(),
      updated_at: new Date().toISOString(),
    };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("realtor_profile")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Failed to load realtor profile:", error.message);
      return {
        id: "local",
        ...emptyProfile(),
        updated_at: new Date().toISOString(),
      };
    }

    if (!data) {
      return {
        id: "local",
        ...emptyProfile(),
        updated_at: new Date().toISOString(),
      };
    }

    return data as RealtorProfile;
  } catch (error) {
    console.error("Failed to load realtor profile:", error);
    return {
      id: "local",
      ...emptyProfile(),
      updated_at: new Date().toISOString(),
    };
  }
});

export const getPublishedServices = cache(async function getPublishedServices(): Promise<
  Service[]
> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Failed to load services:", error.message);
      return [];
    }
    return (data ?? []) as Service[];
  } catch (error) {
    console.error("Failed to load services:", error);
    return [];
  }
});

export const getAdminServices = cache(async function getAdminServices(): Promise<
  Service[]
> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Failed to load admin services:", error.message);
      return [];
    }
    return (data ?? []) as Service[];
  } catch (error) {
    console.error("Failed to load admin services:", error);
    return [];
  }
});

export const getSiteContent = cache(async function getSiteContent(): Promise<SiteContent> {
  const fallback = defaultSiteContent();
  if (!isSupabaseConfigured()) return fallback;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("site_content").select("key, value");
    if (error) {
      console.error("Failed to load site content:", error.message);
      return fallback;
    }
    const mapped = { ...fallback };
    for (const row of data ?? []) {
      if (row.key && typeof row.value === "string") {
        mapped[row.key] = row.value;
      }
    }
    return mapped;
  } catch (error) {
    console.error("Failed to load site content:", error);
    return fallback;
  }
});

export async function getLocations() {
  const properties = await getPublishedProperties();
  return Array.from(
    new Set(
      properties
        .map((property) => property.location?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  ).sort((a, b) => a.localeCompare(b));
}
