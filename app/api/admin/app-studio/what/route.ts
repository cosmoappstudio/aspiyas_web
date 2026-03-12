import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePages } from "@/lib/actions/revalidate";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, title_tr, title_en, desc_tr, desc_en, sort_order } = body;
    const supabase = createAdminClient();

    if (id) {
      const { error } = await supabase
        .from("app_studio_what")
        .update({ title_tr, title_en, desc_tr, desc_en })
        .eq("id", id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("app_studio_what").insert({
        title_tr,
        title_en,
        desc_tr,
        desc_en,
        sort_order: sort_order ?? 0,
      });
      if (error) throw error;
    }
    await revalidatePages();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("App Studio what save error:", err);
    return NextResponse.json({ error: "Kaydetme başarısız" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id gerekli" }, { status: 400 });
    const supabase = createAdminClient();
    const { error } = await supabase.from("app_studio_what").delete().eq("id", id);
    if (error) throw error;
    await revalidatePages();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("App Studio what delete error:", err);
    return NextResponse.json({ error: "Silme başarısız" }, { status: 500 });
  }
}
