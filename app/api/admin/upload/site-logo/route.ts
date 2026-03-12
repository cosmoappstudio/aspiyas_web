import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const BUCKET = "site";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "file gerekli" }, { status: 400 });
    }

    const ext = file.name.split(".").pop() || "png";
    const path = `logo.${ext}`;

    const supabase = createAdminClient();

    await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 524288, // 512KB
      allowedMimeTypes: ["image/png", "image/jpeg", "image/webp", "image/svg+xml"],
    });

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { upsert: true });

    if (error) {
      console.error("Storage upload error:", error);
      return NextResponse.json(
        { error: error.message || "Yükleme başarısız" },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(path);

    await supabase
      .from("site_settings")
      .upsert({ key: "logo_url", value: publicUrl }, { onConflict: "key" });

    revalidatePath("/");

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Beklenmeyen hata" },
      { status: 500 }
    );
  }
}
