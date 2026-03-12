"use client";

import { useState, useRef } from "react";
import { revalidatePages } from "@/lib/actions/revalidate";
import { createClient } from "@/lib/supabase/client";

type PartnerRow = {
  id: string;
  name: string | null;
  logo_url: string | null;
  sort_order: number;
  is_active: boolean;
};

export function PartnersEditor({ initialData }: { initialData: PartnerRow[] }) {
  const [items, setItems] = useState(initialData);
  const [uploading, setUploading] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingPartnerId, setPendingPartnerId] = useState<string | null>(null);
  const supabase = createClient();

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const partnerId = pendingPartnerId;
    if (!file || !partnerId) return;

    setUploading(partnerId);

    const formData = new FormData();
    formData.set("file", file);
    formData.set("partnerId", partnerId);

    try {
      const res = await fetch("/api/admin/upload/partners", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yükleme başarısız");

      setItems((prev) =>
        prev.map((p) =>
          p.id === partnerId ? { ...p, logo_url: data.url } : p
        )
      );
      await revalidatePages();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Logo yüklenemedi");
    } finally {
      setUploading(null);
      setPendingPartnerId(null);
      e.target.value = "";
    }
  }

  async function handleRemoveLogo(partnerId: string) {
    if (!confirm("Logoyu kaldırmak istediğinize emin misiniz?")) return;
    setSaving(true);
    await supabase
      .from("partners")
      .update({ logo_url: null })
      .eq("id", partnerId);
    setItems((prev) =>
      prev.map((p) => (p.id === partnerId ? { ...p, logo_url: null } : p))
    );
    setSaving(false);
    await revalidatePages();
    window.location.reload();
  }

  async function toggleActive(partner: PartnerRow) {
    setSaving(true);
    await supabase
      .from("partners")
      .update({ is_active: !partner.is_active })
      .eq("id", partner.id);
    setItems((prev) =>
      prev.map((p) =>
        p.id === partner.id ? { ...p, is_active: !p.is_active } : p
      )
    );
    setSaving(false);
    await revalidatePages();
    window.location.reload();
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {items.map((p, i) => (
          <div
            key={p.id}
            className="bg-[#070b17] border border-white/[0.06] rounded-xl aspect-[3/2] flex flex-col overflow-hidden group"
          >
            <button
              type="button"
              onClick={() => {
                setPendingPartnerId(p.id);
                fileInputRef.current?.click();
              }}
              disabled={uploading === p.id}
              className="flex-1 flex items-center justify-center p-4 hover:bg-white/[0.03] transition-colors cursor-pointer min-h-0"
            >
              {uploading === p.id ? (
                <span className="text-sm text-[#5a5fcf]">Yükleniyor...</span>
              ) : p.logo_url ? (
                <img
                  src={p.logo_url}
                  alt={p.name ?? `Partner ${i + 1}`}
                  className="max-w-[80%] max-h-[60%] object-contain opacity-60 group-hover:opacity-80 transition-opacity"
                />
              ) : (
                <span className="text-[#5a6378] text-sm text-center">
                  + Logo Yükle
                  <br />
                  <span className="text-xs">Slot {i + 1}</span>
                </span>
              )}
            </button>
            <div className="flex items-center justify-between px-3 py-2 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => toggleActive(p)}
                disabled={saving}
                className={`text-xs px-2 py-0.5 rounded ${
                  p.is_active
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-white/10 text-[#8892a4]"
                } hover:opacity-80`}
              >
                {p.is_active ? "Aktif" : "Pasif"}
              </button>
              {p.logo_url && (
                <button
                  type="button"
                  onClick={() => handleRemoveLogo(p.id)}
                  disabled={saving}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Kaldır
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-[#5a6378]">
        Boş alana tıklayarak logo yükleyin. PNG, JPG, WebP, SVG (max 1MB).
      </p>
    </div>
  );
}
