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
          Logo, site adı ve tagline.
        </p>
      </div>
      <SiteSettingsEditor
        initialData={{
          logo_url: map.logo_url ?? "",
          site_name: map.site_name ?? "Aspiyas",
          site_tagline: map.site_tagline ?? "We build products. We grow brands.",
        }}
      />
    </div>
  );
}
