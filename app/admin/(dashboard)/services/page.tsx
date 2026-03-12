import { createClient } from "@/lib/supabase/server";
import { ServicesEditor } from "./ServicesEditor";

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">Hizmet Kartları</h1>
        <p className="text-[#8892a4] text-sm mt-1">
          Hizmet kartlarını sıralayın ve düzenleyin.
        </p>
      </div>
      <ServicesEditor initialData={data ?? []} />
    </div>
  );
}
