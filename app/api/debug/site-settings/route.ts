import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

/** Debug: Supabase'den okunan site_settings değerlerini döndürür. */
export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value, updated_at");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ site_settings: data });
}
