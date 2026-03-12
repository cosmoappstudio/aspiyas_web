import { createClient } from "@/lib/supabase/server";
import { PartnersEditor } from "./PartnersEditor";

export default async function AdminPartnersPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("partners")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">Partnerler</h1>
        <p className="text-[#8892a4] text-sm mt-1">
          Partner logolarını yönetin (10 slot). Tıklayarak logo yükleyin.
        </p>
      </div>
      <PartnersEditor initialData={data ?? []} />
    </div>
  );
}
