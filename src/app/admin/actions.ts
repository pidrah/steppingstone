"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, getUser } from "@/lib/supabase/server";
import type { ActionResult, ListingType, PropertyStatus, PropertyType } from "@/lib/types";
import {
  parseOptionalNumber,
  parseOptionalText,
  splitFeatures,
  uniqueSlug,
} from "@/lib/utils";

async function requireUser() {
  const user = await getUser();
  if (!user) {
    throw new Error("You must be signed in to do that.");
  }
  return user;
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath("/services");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin");
  revalidatePath("/admin/properties");
  revalidatePath("/admin/profile");
  revalidatePath("/admin/services");
  revalidatePath("/admin/content");
}

const LISTING_VALUES = new Set(["sale", "rent", "managed"]);
const STATUS_VALUES = new Set([
  "available",
  "sold",
  "rented",
  "under_offer",
  "unavailable",
]);
const TYPE_VALUES = new Set([
  "house",
  "apartment",
  "land",
  "commercial",
  "office",
  "other",
]);

function readPropertyFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) {
    throw new Error("A property title is required.");
  }

  const listingType = String(formData.get("listing_type") ?? "sale");
  const status = String(formData.get("status") ?? "available");
  const propertyType = String(formData.get("property_type") ?? "house");

  if (!LISTING_VALUES.has(listingType)) {
    throw new Error("Please choose a valid listing type.");
  }
  if (!STATUS_VALUES.has(status)) {
    throw new Error("Please choose a valid status.");
  }
  if (!TYPE_VALUES.has(propertyType)) {
    throw new Error("Please choose a valid property type.");
  }

  const slugInput = parseOptionalText(formData.get("slug"));

  return {
    title,
    slug: slugInput ? slugInput : uniqueSlug(title),
    description: parseOptionalText(formData.get("description")),
    listing_type: listingType as ListingType,
    status: status as PropertyStatus,
    property_type: propertyType as PropertyType,
    price: parseOptionalNumber(formData.get("price")),
    currency: parseOptionalText(formData.get("currency")) ?? "GYD",
    price_period: parseOptionalText(formData.get("price_period")),
    location: parseOptionalText(formData.get("location")),
    address: parseOptionalText(formData.get("address")),
    bedrooms: parseOptionalNumber(formData.get("bedrooms")),
    bathrooms: parseOptionalNumber(formData.get("bathrooms")),
    property_size: parseOptionalText(formData.get("property_size")),
    lot_size: parseOptionalText(formData.get("lot_size")),
    features: splitFeatures(String(formData.get("features") ?? "")),
    is_featured: formData.get("is_featured") === "on",
    is_published: formData.get("is_published") === "on",
    contact_phone: parseOptionalText(formData.get("contact_phone")),
    contact_email: parseOptionalText(formData.get("contact_email")),
  };
}

export async function signIn(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { ok: false, error: "Email and password are required." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { ok: false, error: error.message };
    }
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to sign in. Check that Supabase is configured.",
    };
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createProperty(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireUser();
    const fields = readPropertyFields(formData);
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("properties")
      .insert(fields)
      .select("id, slug")
      .single();

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePublic();
    return { ok: true, id: data.id, slug: data.slug };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not create the property.",
    };
  }
}

export async function updateProperty(
  id: string,
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireUser();
    const fields = readPropertyFields(formData);
    const supabase = await createClient();
    const { error } = await supabase.from("properties").update(fields).eq("id", id);

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePublic();
    revalidatePath(`/admin/properties/${id}`);
    return { ok: true, id };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not update the property.",
    };
  }
}

export async function deleteProperty(id: string): Promise<ActionResult> {
  try {
    await requireUser();
    const supabase = await createClient();

    const { data: images } = await supabase
      .from("property_images")
      .select("storage_path")
      .eq("property_id", id);

    const paths = (images ?? [])
      .map((image) => image.storage_path)
      .filter((path): path is string => Boolean(path));

    if (paths.length) {
      await supabase.storage.from("property-images").remove(paths);
    }

    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePublic();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not delete the property.",
    };
  }
}

export async function deleteDemoProperties(): Promise<ActionResult> {
  try {
    await requireUser();
    const supabase = await createClient();
    const { data: demos, error: loadError } = await supabase
      .from("properties")
      .select("id")
      .eq("is_demo", true);

    if (loadError) {
      return { ok: false, error: loadError.message };
    }

    for (const demo of demos ?? []) {
      const result = await deleteProperty(demo.id);
      if (!result.ok) return result;
    }

    revalidatePublic();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Could not delete demo properties.",
    };
  }
}

export async function addPropertyImage(input: {
  propertyId: string;
  url: string;
  storagePath: string | null;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
}): Promise<ActionResult> {
  try {
    await requireUser();
    const supabase = await createClient();

    if (input.isPrimary) {
      await supabase
        .from("property_images")
        .update({ is_primary: false })
        .eq("property_id", input.propertyId);
    }

    const { error } = await supabase.from("property_images").insert({
      property_id: input.propertyId,
      url: input.url,
      storage_path: input.storagePath,
      alt_text: input.altText,
      is_primary: input.isPrimary,
      sort_order: input.sortOrder,
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePublic();
    revalidatePath(`/admin/properties/${input.propertyId}`);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not save the image.",
    };
  }
}

export async function deletePropertyImage(
  imageId: string,
  propertyId: string,
): Promise<ActionResult> {
  try {
    await requireUser();
    const supabase = await createClient();
    const { data: image, error: loadError } = await supabase
      .from("property_images")
      .select("*")
      .eq("id", imageId)
      .maybeSingle();

    if (loadError) {
      return { ok: false, error: loadError.message };
    }

    if (image?.storage_path) {
      await supabase.storage.from("property-images").remove([image.storage_path]);
    }

    const { error } = await supabase.from("property_images").delete().eq("id", imageId);
    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePublic();
    revalidatePath(`/admin/properties/${propertyId}`);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not delete the image.",
    };
  }
}

export async function setPrimaryImage(
  imageId: string,
  propertyId: string,
): Promise<ActionResult> {
  try {
    await requireUser();
    const supabase = await createClient();
    await supabase
      .from("property_images")
      .update({ is_primary: false })
      .eq("property_id", propertyId);
    const { error } = await supabase
      .from("property_images")
      .update({ is_primary: true })
      .eq("id", imageId);

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePublic();
    revalidatePath(`/admin/properties/${propertyId}`);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Could not update the primary image.",
    };
  }
}

export async function reorderPropertyImages(
  propertyId: string,
  orderedIds: string[],
): Promise<ActionResult> {
  try {
    await requireUser();
    const supabase = await createClient();
    for (const [index, id] of orderedIds.entries()) {
      const { error } = await supabase
        .from("property_images")
        .update({ sort_order: index })
        .eq("id", id)
        .eq("property_id", propertyId);
      if (error) {
        return { ok: false, error: error.message };
      }
    }
    revalidatePublic();
    revalidatePath(`/admin/properties/${propertyId}`);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not reorder images.",
    };
  }
}

export async function updateRealtorProfile(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireUser();
    const supabase = await createClient();
    const { data: existing } = await supabase
      .from("realtor_profile")
      .select("id")
      .limit(1)
      .maybeSingle();

    const payload = {
      name: String(formData.get("name") ?? "").trim() || "Deji Aderemi",
      title: String(formData.get("title") ?? "").trim() || "Principal Realtor",
      biography: parseOptionalText(formData.get("biography")),
      experience: parseOptionalText(formData.get("experience")),
      years_of_experience: parseOptionalText(formData.get("years_of_experience")),
      areas_of_expertise: parseOptionalText(formData.get("areas_of_expertise")),
      qualifications: parseOptionalText(formData.get("qualifications")),
      achievements: parseOptionalText(formData.get("achievements")),
      areas_served: parseOptionalText(formData.get("areas_served")),
      philosophy: parseOptionalText(formData.get("philosophy")),
    };

    const query = existing
      ? supabase.from("realtor_profile").update(payload).eq("id", existing.id)
      : supabase.from("realtor_profile").insert(payload);

    const { error } = await query;
    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePublic();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not save the profile.",
    };
  }
}

export async function updateRealtorPhoto(input: {
  url: string;
  path: string;
}): Promise<ActionResult> {
  try {
    await requireUser();
    const supabase = await createClient();
    const { data: existing } = await supabase
      .from("realtor_profile")
      .select("id, photo_path")
      .limit(1)
      .maybeSingle();

    if (existing?.photo_path && existing.photo_path !== input.path) {
      await supabase.storage.from("profile-images").remove([existing.photo_path]);
    }

    const payload = { photo_url: input.url, photo_path: input.path };
    const query = existing
      ? supabase.from("realtor_profile").update(payload).eq("id", existing.id)
      : supabase.from("realtor_profile").insert({
          name: "Deji Aderemi",
          title: "Principal Realtor",
          ...payload,
        });

    const { error } = await query;
    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePublic();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not save the photograph.",
    };
  }
}

export async function removeRealtorPhoto(): Promise<ActionResult> {
  try {
    await requireUser();
    const supabase = await createClient();
    const { data: existing } = await supabase
      .from("realtor_profile")
      .select("id, photo_path")
      .limit(1)
      .maybeSingle();

    if (!existing) {
      return { ok: true };
    }

    if (existing.photo_path) {
      await supabase.storage.from("profile-images").remove([existing.photo_path]);
    }

    const { error } = await supabase
      .from("realtor_profile")
      .update({ photo_url: null, photo_path: null })
      .eq("id", existing.id);

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePublic();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not remove the photograph.",
    };
  }
}

export async function createService(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireUser();
    const title = String(formData.get("title") ?? "").trim();
    if (!title) {
      return { ok: false, error: "A service title is required." };
    }

    const supabase = await createClient();
    const { data: last } = await supabase
      .from("services")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { error } = await supabase.from("services").insert({
      title,
      description: parseOptionalText(formData.get("description")),
      is_published: formData.get("is_published") === "on",
      sort_order: (last?.sort_order ?? 0) + 10,
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePublic();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not add the service.",
    };
  }
}

export async function updateService(
  id: string,
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireUser();
    const title = String(formData.get("title") ?? "").trim();
    if (!title) {
      return { ok: false, error: "A service title is required." };
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("services")
      .update({
        title,
        description: parseOptionalText(formData.get("description")),
        is_published: formData.get("is_published") === "on",
        sort_order: parseOptionalNumber(formData.get("sort_order")) ?? 0,
      })
      .eq("id", id);

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePublic();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not update the service.",
    };
  }
}

export async function deleteService(id: string): Promise<ActionResult> {
  try {
    await requireUser();
    const supabase = await createClient();
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      return { ok: false, error: error.message };
    }
    revalidatePublic();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not delete the service.",
    };
  }
}

export async function updateSiteContent(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireUser();
    const supabase = await createClient();
    const keys = [
      "home_intro",
      "home_services",
      "services_intro",
      "services_cta",
    ] as const;

    for (const key of keys) {
      const value = String(formData.get(key) ?? "");
      const { error } = await supabase
        .from("site_content")
        .upsert({ key, value }, { onConflict: "key" });
      if (error) {
        return { ok: false, error: error.message };
      }
    }

    revalidatePublic();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not save site content.",
    };
  }
}
