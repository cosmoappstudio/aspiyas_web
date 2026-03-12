import { unstable_noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";

export type SiteSettings = {
  site_name: string;
  site_tagline: string;
  logo_url?: string;
  favicon_url?: string;
  meta_title?: string;
  meta_description?: string;
  og_image_url?: string;
};

const FALLBACK: SiteSettings = {
  site_name: "Aspiyas",
  site_tagline: "We build products. We grow brands.",
  meta_title: "Aspiyas — Dijital Büyüme & SaaS Tech House | Antalya, Türkiye",
  meta_description:
    "Aspiyas; Shoovo UGC platformu, performans pazarlama ve AI araç geliştirme hizmetleriyle Türk markalarını büyüten bir teknoloji şirketidir. Antalya merkezli, global vizyonlu.",
};

async function fetchSiteSettings(): Promise<SiteSettings> {
  unstable_noStore();
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error) throw error;
    if (!data?.length) throw new Error("No site settings");

    const map = Object.fromEntries(data.map((r) => [r.key, r.value]));

    return {
      site_name: map.site_name ?? FALLBACK.site_name,
      site_tagline: map.site_tagline ?? FALLBACK.site_tagline,
      logo_url: map.logo_url,
      favicon_url: map.favicon_url,
      meta_title: map.meta_title ?? FALLBACK.meta_title,
      meta_description: map.meta_description ?? FALLBACK.meta_description,
      og_image_url: map.og_image_url,
    };
  } catch {
    return FALLBACK;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchSiteSettings();
}
