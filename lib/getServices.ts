import { createClient } from "@/lib/supabase/server";
import { services as fallbackServices } from "@/constants/services";

export type ServiceRow = {
  id: string;
  icon: string;
  title_tr: string;
  title_en: string;
  desc_tr: string;
  desc_en: string;
  tag: string | null;
  badge_type: string | null;
  sort_order: number;
  span: number;
  visual?: string;
};

/** Server'dan Client'a geçirilebilir, icon string olarak (LucideIcon değil) */
export type SerializableService = {
  icon: string;
  title: string;
  description: string;
  tag?: string;
  badgeType?: "default" | "shoovo" | "free";
  span: 4 | 6 | 12;
  visual?: string;
};

function toService(row: ServiceRow, lang: "tr" | "en"): SerializableService {
  const visual =
    row.span === 12 && row.title_tr?.includes("Performans") ? "ROAS↑" : undefined;
  return {
    icon: row.icon ?? "Target",
    title: lang === "tr" ? row.title_tr : row.title_en,
    description: lang === "tr" ? row.desc_tr : row.desc_en,
    tag: row.tag ?? undefined,
    badgeType: (row.badge_type as SerializableService["badgeType"]) ?? undefined,
    span: (row.span as 4 | 6 | 12) ?? 4,
    visual,
  };
}

/**
 * Hizmet kartlarını döndürür. Supabase'den çeker, hata olursa constants'a fallback.
 */
async function fetchServices(lang: "tr" | "en"): Promise<SerializableService[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    if (!data?.length) throw new Error("No services");

    return data.map((row) => toService(row as ServiceRow, lang));
  } catch {
    const iconOrder = ["Target", "Video", "Smartphone", "Monitor", "Puzzle", "Bot", "AppWindow", "Search"];
    return fallbackServices.map((s, i) => ({
      icon: iconOrder[i] ?? "Target",
      title: s.title,
      description: s.description,
      tag: s.tag,
      badgeType: s.badgeType,
      span: s.span,
      visual: s.visual,
    }));
  }
}

export async function getServices(lang: "tr" | "en" = "tr"): Promise<SerializableService[]> {
  return fetchServices(lang);
}
