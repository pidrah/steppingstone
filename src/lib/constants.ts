export const COMPANY = {
  name: "Steppingstone Realty",
  tagline: "Your trusted partner in real estate",
  principal: "Deji Aderemi",
  principalTitle: "Principal Realtor",
  addressLines: [
    "56 Brickdam & Austin Place",
    "Georgetown, Guyana",
    "South America",
  ],
  addressSingleLine:
    "56 Brickdam & Austin Place, Georgetown, Guyana, South America",
  phoneDisplay: "+592 653-5888",
  phoneTel: "+5926535888",
  email: "steppingstonerealtygy@gmail.com",
  facebookHandle: "@steppingstonerealty",
  facebookUrl: "https://www.facebook.com/steppingstonerealty",
  whatsappUrl: "https://wa.me/5926535888",
} as const;

export const LISTING_TYPES = [
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
  { value: "managed", label: "Managed" },
] as const;

export const PROPERTY_STATUSES = [
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold" },
  { value: "rented", label: "Rented" },
  { value: "under_offer", label: "Under Offer" },
  { value: "unavailable", label: "Unavailable" },
] as const;

export const PROPERTY_TYPES = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
  { value: "office", label: "Office" },
  { value: "other", label: "Other" },
] as const;

export const CURRENCIES = ["GYD", "USD"] as const;

export const PRICE_PERIODS = [
  { value: "", label: "None" },
  { value: "month", label: "Per month" },
  { value: "year", label: "Per year" },
  { value: "week", label: "Per week" },
] as const;

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;
export const MAX_IMAGES_PER_UPLOAD = 12;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/services", label: "Property Care" },
  { href: "/about", label: "Principal Realtor" },
  { href: "/contact", label: "Contact" },
] as const;

export const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/properties", label: "Properties" },
  { href: "/admin/profile", label: "Realtor Profile" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/content", label: "Site Content" },
] as const;
