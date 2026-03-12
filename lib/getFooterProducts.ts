import { unstable_noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";

export type FooterProduct = {
  id: string;
  name: string;
  url: string;
};

const FALLBACK: FooterProduct[] = [
  { id: "1", name: "Shoovo", url: "https://shoovo.app" },
];

export async function getFooterProducts(): Promise<FooterProduct[]> {
  unstable_noStore();
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("footer_products")
      .select("id, name, url")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (!data?.length) return FALLBACK;
    return data;
  } catch {
    return FALLBACK;
  }
}
