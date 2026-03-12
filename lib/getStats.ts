import { createClient } from "@/lib/supabase/server";

export type Stat = {
  key: string;
  value: string;
  label_tr: string;
  label_en: string;
};

const FALLBACK_STATS: Stat[] = [
  { key: "brands", value: "200+", label_tr: "Aktif Marka", label_en: "Active Brands" },
  { key: "creators", value: "500+", label_tr: "Creator", label_en: "Creators" },
  { key: "budget", value: "₺50M+", label_tr: "Yönetilen Bütçe", label_en: "Managed Budget" },
  { key: "years", value: "8+", label_tr: "Yıl Deneyim", label_en: "Years Experience" },
];

async function fetchStats(): Promise<Stat[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("stats").select("*");

    if (error) throw error;
    if (!data?.length) throw new Error("No stats");

    return data.map((row) => ({
      key: row.key,
      value: row.value,
      label_tr: row.label_tr,
      label_en: row.label_en,
    }));
  } catch {
    return FALLBACK_STATS;
  }
}

export async function getStats(): Promise<Stat[]> {
  return fetchStats();
}
