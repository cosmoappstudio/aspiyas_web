import { createClient } from "@/lib/supabase/server";

export type Partner = {
  id: string;
  name: string | null;
  logo_url: string | null;
  sort_order: number;
};

async function fetchPartners(): Promise<Partner[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("partners")
      .select("id, name, logo_url, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;

    return (data ?? []).map((row) => ({
      id: row.id,
      name: row.name ?? null,
      logo_url: row.logo_url ?? null,
      sort_order: row.sort_order ?? 0,
    }));
  } catch {
    return Array(10)
      .fill(null)
      .map((_, i) => ({
        id: `fallback-${i}`,
        name: null,
        logo_url: null,
        sort_order: i + 1,
      }));
  }
}

export async function getPartners(): Promise<Partner[]> {
  return fetchPartners();
}
