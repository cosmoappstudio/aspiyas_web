import { createClient } from "@/lib/supabase/server";
import { SiteSettingsEditor } from "./SiteSettingsEditor";

export default async function AdminSiteSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");

  const map = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">Site Ayarları</h1>
        <p className="text-[#8892a4] text-sm mt-1">
          Logo, favicon, site adı, tagline ve SEO meta verileri.
        </p>
      </div>
      <SiteSettingsEditor
        initialData={{
          logo_url: map.logo_url ?? "",
          favicon_url: map.favicon_url ?? "",
          site_name: map.site_name ?? "Aspiyas",
          site_tagline: map.site_tagline ?? "We build products. We grow brands.",
          meta_title: map.meta_title ?? "Aspiyas — Dijital Büyüme & SaaS Tech House | Antalya, Türkiye",
          meta_description:
            map.meta_description ??
            "Aspiyas; Shoovo UGC platformu, performans pazarlama ve AI araç geliştirme hizmetleriyle Türk markalarını büyüten bir teknoloji şirketidir. Antalya merkezli, global vizyonlu.",
          og_image_url: map.og_image_url ?? "",
        }}
      />
    </div>
  );
}
