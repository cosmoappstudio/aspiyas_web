import { unstable_noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";

export type ContentMap = Record<string, string>;

/**
 * Content tablosundan key-value map döndürür.
 */
export async function getContent(lang?: "tr" | "en"): Promise<ContentMap> {
  unstable_noStore();
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("content")
      .select("key, value, lang");

    if (error) throw error;

    const rows = data ?? [];
    const map: ContentMap = {};

    for (const row of rows) {
      if (lang && !row.key.endsWith(`.${lang}`)) continue;
      const k = lang ? row.key.replace(`.${lang}$`, "") : row.key;
      map[k] = row.value;
    }

    return map;
  } catch {
    return {};
  }
}
