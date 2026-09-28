import type { MetadataRoute } from "next";
import { getPublishedProperties } from "@/lib/queries";
import { siteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = siteUrl();
  const properties = await getPublishedProperties();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/properties",
    "/services",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${url}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${url}/properties/${property.slug}`,
    lastModified: property.updated_at,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
