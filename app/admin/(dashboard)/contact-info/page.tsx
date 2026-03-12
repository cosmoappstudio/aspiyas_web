import { createClient } from "@/lib/supabase/server";
import { ContactInfoEditor } from "./ContactInfoEditor";

export default async function AdminContactInfoPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("contact_info").select("*");

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">İletişim Bilgileri</h1>
        <p className="text-[#8892a4] text-sm mt-1">
          Adres, e-posta, telefon ve sosyal medya.
        </p>
      </div>
      <ContactInfoEditor initialData={data ?? []} />
    </div>
  );
}
