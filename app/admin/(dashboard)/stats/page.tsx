import { createClient } from "@/lib/supabase/server";
import { StatsEditor } from "./StatsEditor";

export default async function AdminStatsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("stats").select("*");

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">İstatistikler</h1>
        <p className="text-[#8892a4] text-sm mt-1">
          200+, ₺50M+ gibi hero ve why bölümü rakamları.
        </p>
      </div>
      <StatsEditor initialData={data ?? []} />
    </div>
  );
}
