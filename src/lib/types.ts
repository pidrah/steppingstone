export type ListingType = "sale" | "rent" | "managed";
export type PropertyStatus =
  | "available"
  | "sold"
  | "rented"
  | "under_offer"
  | "unavailable";
export type PropertyType =
  | "house"
  | "apartment"
  | "land"
  | "commercial"
  | "office"
  | "other";

export type PropertyImage = {
  id: string;
  property_id: string;
  url: string;
  storage_path: string | null;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
};

export type Property = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  listing_type: ListingType;
  status: PropertyStatus;
  property_type: PropertyType;
  price: number | null;
  currency: string;
  price_period: string | null;
  location: string | null;
  address: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  property_size: string | null;
  lot_size: string | null;
  features: string[];
  is_featured: boolean;
  is_published: boolean;
  is_demo: boolean;
  contact_phone: string | null;
  contact_email: string | null;
  created_at: string;
  updated_at: string;
  images: PropertyImage[];
};

export type RealtorProfile = {
  id: string;
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
  updated_at: string;
};

export type Service = {
  id: string;
  title: string;
  description: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type SiteContent = Record<string, string>;

export type PropertyFilters = {
  listing?: string;
  type?: string;
  location?: string;
  q?: string;
  bedrooms?: string;
  minPrice?: string;
  maxPrice?: string;
  status?: string;
};

export type ActionResult = {
  ok: boolean;
  error?: string;
  id?: string;
  slug?: string;
};
