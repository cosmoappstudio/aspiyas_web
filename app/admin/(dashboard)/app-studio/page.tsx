import { createClient } from "@/lib/supabase/server";
import { AppStudioEditor } from "./AppStudioEditor";

export default async function AdminAppStudioPage() {
  const supabase = await createClient();

  const [
    { data: whatData },
    { data: howData },
    { data: contentData },
  ] = await Promise.all([
    supabase.from("app_studio_what").select("*").order("sort_order", { ascending: true }),
    supabase.from("app_studio_how").select("*").order("sort_order", { ascending: true }),
    supabase.from("content").select("id, key, value, lang").like("key", "app_studio.%"),
  ]);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">App Studio</h1>
        <p className="text-[#8892a4] text-sm mt-1">
          App Studio sayfasındaki metinleri, Ne Yapıyoruz kartlarını ve süreç adımlarını düzenleyin.
        </p>
      </div>
      <AppStudioEditor
        initialWhat={whatData ?? []}
        initialHow={howData ?? []}
        initialContent={contentData ?? []}
      />
    </div>
  );
}
