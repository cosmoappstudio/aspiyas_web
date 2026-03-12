import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePages } from "@/lib/actions/revalidate";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const { id, value } = await request.json();
    if (!id || value === undefined) {
      return NextResponse.json({ error: "id ve value gerekli" }, { status: 400 });
    }
    const supabase = createAdminClient();
    const { error } = await supabase.from("content").update({ value }).eq("id", id);
    if (error) throw error;
    await revalidatePages();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("App Studio content update error:", err);
    return NextResponse.json({ error: "Güncelleme başarısız" }, { status: 500 });
  }
}
