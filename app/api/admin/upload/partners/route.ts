import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const BUCKET = "partners";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const partnerId = formData.get("partnerId") as string;

    if (!file || !partnerId) {
      return NextResponse.json(
        { error: "file ve partnerId gerekli" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() || "png";
    const path = `${partnerId}.${ext}`;

    const supabase = createAdminClient();

    // Bucket yoksa oluştur (service role ile)
    await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 1048576,
      allowedMimeTypes: ["image/png", "image/jpeg", "image/webp", "image/svg+xml"],
    });
    // Bucket zaten varsa ignore

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

    await supabase.from("partners").update({ logo_url: publicUrl }).eq("id", partnerId);

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
