import { createClient } from "@/lib/supabase/server";
import { ContactFormOptionsEditor } from "./ContactFormOptionsEditor";

export default async function AdminContactFormOptionsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_form_options")
    .select("*")
    .order("option_type")
    .order("sort_order", { ascending: true });

  const sectors = (data ?? []).filter((r) => r.option_type === "sector");
  const budgets = (data ?? []).filter((r) => r.option_type === "budget");
  const services = (data ?? []).filter((r) => r.option_type === "service");

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">Form Seçenekleri</h1>
        <p className="text-[#8892a4] text-sm mt-1">
          İletişim formundaki sektör, bütçe ve hizmet listelerini düzenleyin.
        </p>
      </div>
      <ContactFormOptionsEditor
        initialData={{
          sectors,
          budgets,
          services,
        }}
      />
    </div>
  );
}
