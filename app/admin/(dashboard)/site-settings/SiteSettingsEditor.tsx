"use client";

import { useState, useRef } from "react";
import { revalidatePages } from "@/lib/actions/revalidate";
import { createClient } from "@/lib/supabase/client";

type SiteSettingsData = {
  logo_url: string;
  favicon_url: string;
  site_name: string;
  site_tagline: string;
  meta_title: string;
  meta_description: string;
  og_image_url: string;
};

export function SiteSettingsEditor({ initialData }: { initialData: SiteSettingsData }) {
  const [data, setData] = useState(initialData);
  const [uploading, setUploading] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const ogInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.set("file", file);

    try {
      const res = await fetch("/api/admin/upload/site-logo", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Yükleme başarısız");
      setData((prev) => ({ ...prev, logo_url: json.url }));
      await revalidatePages();
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Logo yüklenemedi");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleRemoveLogo() {
    if (!confirm("Logoyu kaldırmak istediğinize emin misiniz?")) return;
    setSaving(true);
    await supabase
      .from("site_settings")
      .upsert({ key: "logo_url", value: "" }, { onConflict: "key" });
    setData((prev) => ({ ...prev, logo_url: "" }));
    setSaving(false);
    await revalidatePages();
    window.location.reload();
  }

  async function handleFaviconUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFavicon(true);
    const formData = new FormData();
    formData.set("file", file);
    try {
      const res = await fetch("/api/admin/upload/site-favicon", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Yükleme başarısız");
      setData((prev) => ({ ...prev, favicon_url: json.url }));
      await revalidatePages();
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Favicon yüklenemedi");
    } finally {
      setUploadingFavicon(false);
      e.target.value = "";
    }
  }

  async function handleRemoveFavicon() {
    if (!confirm("Faviconu kaldırmak istediğinize emin misiniz?")) return;
    setSaving(true);
    await supabase
      .from("site_settings")
      .upsert({ key: "favicon_url", value: "" }, { onConflict: "key" });
    setData((prev) => ({ ...prev, favicon_url: "" }));
    setSaving(false);
    await revalidatePages();
    window.location.reload();
  }

  async function handleOgImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingOg(true);
    const formData = new FormData();
    formData.set("file", file);
    try {
      const res = await fetch("/api/admin/upload/site-og-image", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Yükleme başarısız");
      setData((prev) => ({ ...prev, og_image_url: json.url }));
      await revalidatePages();
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "OG görseli yüklenemedi");
    } finally {
      setUploadingOg(false);
      e.target.value = "";
    }
  }

  async function handleRemoveOgImage() {
    if (!confirm("OG görselini kaldırmak istediğinize emin misiniz?")) return;
    setSaving(true);
    await supabase
      .from("site_settings")
      .upsert({ key: "og_image_url", value: "" }, { onConflict: "key" });
    setData((prev) => ({ ...prev, og_image_url: "" }));
    setSaving(false);
    await revalidatePages();
    window.location.reload();
  }

  async function handleSaveField(key: string, value: string) {
    setSaving(true);
    await supabase
      .from("site_settings")
      .upsert({ key, value }, { onConflict: "key" });
    setData((prev) => ({ ...prev, [key]: value }));
    setSaving(false);
    await revalidatePages();
    window.location.reload();
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
        onChange={handleLogoUpload}
      />
      <input
        ref={faviconInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/x-icon,.ico"
        className="hidden"
        onChange={handleFaviconUpload}
      />
      <input
        ref={ogInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleOgImageUpload}
      />

      {/* Logo */}
      <div className="bg-[#070b17] border border-white/[0.06] rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Logo</h3>
        <div className="flex items-center gap-6">
          <div className="w-32 h-12 flex items-center justify-center bg-white/[0.03] border border-white/[0.06] rounded-lg">
            {data.logo_url ? (
              <img
                src={data.logo_url}
                alt="Logo"
                className="max-h-8 max-w-full object-contain"
              />
            ) : (
              <span className="text-white font-bold text-sm">
                asp<span className="text-[#5a5fcf]">·</span>iyas
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 bg-[#5a5fcf] text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-70"
            >
              {uploading ? "Yükleniyor..." : "Logo Yükle"}
            </button>
            {data.logo_url && (
              <button
                type="button"
                onClick={handleRemoveLogo}
                disabled={saving}
                className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium hover:bg-red-500/30"
              >
                Kaldır
              </button>
            )}
          </div>
        </div>
        <p className="text-xs text-[#5a6378] mt-2">
          Logo yoksa &quot;asp·iyas&quot; metin logosu gösterilir.
        </p>
      </div>

      {/* Favicon */}
      <div className="bg-[#070b17] border border-white/[0.06] rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Favicon</h3>
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 flex items-center justify-center bg-white/[0.03] border border-white/[0.06] rounded-lg overflow-hidden">
            {data.favicon_url ? (
              <img
                src={data.favicon_url}
                alt="Favicon"
                className="w-8 h-8 object-contain"
              />
            ) : (
              <span className="text-[#5a6378] text-xs">Yok</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => faviconInputRef.current?.click()}
              disabled={uploadingFavicon}
              className="px-4 py-2 bg-[#5a5fcf] text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-70"
            >
              {uploadingFavicon ? "Yükleniyor..." : "Favicon Yükle"}
            </button>
            {data.favicon_url && (
              <button
                type="button"
                onClick={handleRemoveFavicon}
                disabled={saving}
                className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium hover:bg-red-500/30"
              >
                Kaldır
              </button>
            )}
          </div>
        </div>
        <p className="text-xs text-[#5a6378] mt-2">
          Tarayıcı sekmesinde görünen ikon. PNG, ICO veya SVG (önerilen: 32x32).
        </p>
      </div>

      {/* Site name */}
      <div className="bg-[#070b17] border border-white/[0.06] rounded-xl p-6">
        <label className="block text-sm font-bold text-white mb-2">Site Adı</label>
        <input
          type="text"
          defaultValue={data.site_name}
          onBlur={(e) => {
            const v = e.target.value.trim();
            if (v && v !== data.site_name) handleSaveField("site_name", v);
          }}
          className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
        />
      </div>

      {/* Tagline */}
      <div className="bg-[#070b17] border border-white/[0.06] rounded-xl p-6">
        <label className="block text-sm font-bold text-white mb-2">Tagline</label>
        <textarea
          defaultValue={data.site_tagline}
          onBlur={(e) => {
            const v = e.target.value.trim();
            if (v !== data.site_tagline) handleSaveField("site_tagline", v);
          }}
          rows={2}
          className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm resize-y"
        />
      </div>

      {/* SEO */}
      <div className="bg-[#070b17] border border-white/[0.06] rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">SEO Meta</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#8892a4] mb-1">
              Meta Başlık
            </label>
            <input
              type="text"
              defaultValue={data.meta_title}
              onBlur={(e) => {
                const v = e.target.value.trim();
                if (v && v !== data.meta_title) handleSaveField("meta_title", v);
              }}
              placeholder="Aspiyas — Dijital Büyüme & SaaS Tech House"
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#8892a4] mb-1">
              Meta Açıklama
            </label>
            <textarea
              defaultValue={data.meta_description}
              onBlur={(e) => {
                const v = e.target.value.trim();
                if (v && v !== data.meta_description)
                  handleSaveField("meta_description", v);
              }}
              rows={2}
              placeholder="Aspiyas; Shoovo UGC platformu..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm resize-y"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#8892a4] mb-2">
              OG Görsel (sosyal paylaşım)
            </label>
            <div className="flex items-center gap-4">
              {data.og_image_url ? (
                <img
                  src={data.og_image_url}
                  alt="OG"
                  className="w-24 h-24 object-cover rounded-lg border border-white/10"
                />
              ) : (
                <div className="w-24 h-24 bg-white/[0.03] border border-white/[0.06] rounded-lg flex items-center justify-center">
                  <span className="text-[#5a6378] text-xs">Yok</span>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => ogInputRef.current?.click()}
                  disabled={uploadingOg}
                  className="px-4 py-2 bg-[#5a5fcf] text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-70"
                >
                  {uploadingOg ? "Yükleniyor..." : "Görsel Yükle"}
                </button>
                {data.og_image_url && (
                  <button
                    type="button"
                    onClick={handleRemoveOgImage}
                    disabled={saving}
                    className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium hover:bg-red-500/30"
                  >
                    Kaldır
                  </button>
                )}
              </div>
            </div>
            <p className="text-xs text-[#5a6378] mt-2">
              Facebook, Twitter, LinkedIn paylaşımlarında görünen görsel (önerilen: 1200x630).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
