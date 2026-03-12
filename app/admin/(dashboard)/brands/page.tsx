import { createClient } from "@/lib/supabase/server";
import { BrandsEditor } from "./BrandsEditor";

export default async function AdminBrandsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("brands")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">Referans Markalar</h1>
        <p className="text-[#8892a4] text-sm mt-1">
          Marquee bölümündeki marka listesini düzenleyin.
        </p>
      </div>
      <BrandsEditor initialData={data ?? []} />
    </div>
  );
}
