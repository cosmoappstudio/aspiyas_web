import { createClient } from "@/lib/supabase/server";
import { ContentEditor } from "./ContentEditor";

export default async function AdminContentPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("content").select("*").order("section");

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">Metin & Butonlar</h1>
        <p className="text-[#8892a4] text-sm mt-1">
          Hero, CTA ve section başlıklarını düzenleyin.
        </p>
      </div>
      <ContentEditor initialData={data ?? []} />
    </div>
  );
}
