import { createAdminClient } from "@/lib/supabase/server";
import { AppStudioEditor, type WhatRow, type HowRow, type ContentRow } from "./AppStudioEditor";

export default async function AdminAppStudioPage() {
  let whatData: WhatRow[] = [];
  let howData: HowRow[] = [];
  let contentData: ContentRow[] = [];
  let migrationError = false;

  try {
    const supabase = createAdminClient();
    const [whatRes, howRes, contentRes] = await Promise.all([
      supabase.from("app_studio_what").select("*").order("sort_order", { ascending: true }),
      supabase.from("app_studio_how").select("*").order("sort_order", { ascending: true }),
      supabase.from("content").select("id, key, value, lang").like("key", "app_studio.%"),
    ]);
    if (whatRes.error || howRes.error) migrationError = true;
    whatData = (whatRes.data ?? []) as WhatRow[];
    howData = (howRes.data ?? []) as HowRow[];
    contentData = (contentRes.data ?? []) as ContentRow[];
  } catch {
    migrationError = true;
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">App Studio</h1>
        <p className="text-[#8892a4] text-sm mt-1">
          App Studio sayfasındaki metinleri, Ne Yapıyoruz kartlarını ve süreç adımlarını düzenleyin.
        </p>
        {migrationError && (
          <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-3 text-amber-400 text-sm">
            Migration çalıştırılmamış olabilir. Supabase SQL Editor&apos;da{" "}
            <code className="bg-white/10 px-1 rounded">supabase/migrations/20250312_app_studio.sql</code> dosyasını çalıştırın.
          </div>
        )}
      </div>
      <AppStudioEditor
        initialWhat={whatData ?? []}
        initialHow={howData ?? []}
        initialContent={contentData ?? []}
      />
    </div>
  );
}
