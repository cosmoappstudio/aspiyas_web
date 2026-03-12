import { createClient } from "@/lib/supabase/server";

const FALLBACK_BRANDS = [
  "LC Waikiki",
  "Vodafone",
  "Twigy",
  "Kiralarsın",
  "Marka A",
  "Marka B",
  "Marka C",
  "Marka D",
];

async function fetchBrands(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("brands")
      .select("name")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    if (!data?.length) throw new Error("No brands");

    return data.map((row) => row.name).filter(Boolean);
  } catch {
    return FALLBACK_BRANDS;
  }
}

export async function getBrands(): Promise<string[]> {
  return fetchBrands();
}
