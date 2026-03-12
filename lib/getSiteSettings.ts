import { createClient } from "@/lib/supabase/server";

export type SiteSettings = {
  site_name: string;
  site_tagline: string;
  logo_url?: string;
  favicon_url?: string;
};

const FALLBACK: SiteSettings = {
  site_name: "Aspiyas",
  site_tagline: "We build products. We grow brands.",
};

async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
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
    };
  } catch {
    return FALLBACK;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchSiteSettings();
}
