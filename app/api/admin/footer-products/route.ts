import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePages } from "@/lib/actions/revalidate";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, url, sort_order } = body;
    const supabase = createAdminClient();

    if (id) {
      const { error } = await supabase
        .from("footer_products")
        .update({ name, url })
        .eq("id", id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("footer_products").insert({
        name,
        url,
        sort_order: sort_order ?? 0,
      });
      if (error) throw error;
    }
    await revalidatePages();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Footer products save error:", err);
    return NextResponse.json({ error: "Kaydetme başarısız" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id gerekli" }, { status: 400 });
    const supabase = createAdminClient();
    const { error } = await supabase.from("footer_products").delete().eq("id", id);
    if (error) throw error;
    await revalidatePages();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Footer products delete error:", err);
    return NextResponse.json({ error: "Silme başarısız" }, { status: 500 });
  }
}
