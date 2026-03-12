import { createClient } from "@/lib/supabase/server";
import { FaqEditor } from "./FaqEditor";

export default async function AdminFaqPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faq")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">SSS</h1>
        <p className="text-[#8892a4] text-sm mt-1">
          Sık sorulan soruları yönetin.
        </p>
      </div>
      <FaqEditor initialData={data ?? []} />
    </div>
  );
}
