import { createAdminClient } from "@/lib/supabase/server";
import { FooterProductsEditor } from "./FooterProductsEditor";

export default async function AdminFooterProductsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("footer_products")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">Footer Ürünleri</h1>
        <p className="text-[#8892a4] text-sm mt-1">
          Footer&apos;daki Ürünler bölümüne ekleme/çıkarma yapın. Tıklandığında URL&apos;ye yönlendirir (App Store vb.).
        </p>
      </div>
      <div className="bg-[#070b17] border border-white/[0.06] rounded-xl p-6">
        <FooterProductsEditor initialData={data ?? []} />
      </div>
    </div>
  );
}
