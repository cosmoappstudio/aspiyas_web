"use client";

import { useState } from "react";
import { revalidatePages } from "@/lib/actions/revalidate";
import { createClient } from "@/lib/supabase/client";

type BrandRow = {
  id: string;
  name: string;
  logo_url: string | null;
  sort_order: number;
  is_active: boolean;
};

export function BrandsEditor({ initialData }: { initialData: BrandRow[] }) {
  const [items, setItems] = useState(initialData);
  const [editing, setEditing] = useState<BrandRow | null>(null);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  async function moveUp(index: number) {
    if (index <= 0) return;
    const newOrder = [...items];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    await updateOrder(newOrder);
  }

  async function moveDown(index: number) {
    if (index >= items.length - 1) return;
    const newOrder = [...items];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    await updateOrder(newOrder);
  }

  async function updateOrder(ordered: BrandRow[]) {
    setSaving(true);
    for (let i = 0; i < ordered.length; i++) {
      await supabase
        .from("brands")
        .update({ sort_order: i })
        .eq("id", ordered[i].id);
    }
    setItems(ordered.map((b, i) => ({ ...b, sort_order: i })));
    setSaving(false);
    await revalidatePages();
    window.location.reload();
  }

  async function handleSave(formData: FormData) {
    setSaving(true);
    const id = formData.get("id") as string;
    const payload = {
      name: (formData.get("name") as string) || "",
      logo_url: (formData.get("logo_url") as string) || null,
      is_active: formData.get("is_active") === "on",
    };

    if (id) {
      await supabase.from("brands").update(payload).eq("id", id);
      setItems((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...payload } : b))
      );
      setEditing(null);
    } else {
      const { data } = await supabase
        .from("brands")
        .insert({ ...payload, sort_order: items.length })
        .select()
        .single();
      if (data) setItems((prev) => [...prev, { ...data, sort_order: items.length }]);
      setAdding(false);
    }
    setSaving(false);
    await revalidatePages();
    window.location.reload();
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu markayı silmek istediğinize emin misiniz?")) return;
    setSaving(true);
    await supabase.from("brands").delete().eq("id", id);
    setItems((prev) => prev.filter((b) => b.id !== id));
    setEditing(null);
    setSaving(false);
    await revalidatePages();
    window.location.reload();
  }

  const BrandForm = ({
    brand,
    onCancel,
    onSave,
    onDelete,
  }: {
    brand: Partial<BrandRow> | null;
    onCancel: () => void;
    onSave: (formData: FormData) => void;
    onDelete?: (id: string) => void;
  }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-[#070b17] border border-white/[0.08] rounded-2xl p-8 max-w-md w-full">
        <h3 className="text-lg font-bold text-white mb-6">
          {brand?.id ? "Marka Düzenle" : "Yeni Marka Ekle"}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(new FormData(e.currentTarget));
          }}
          className="space-y-4"
        >
          {brand?.id && <input type="hidden" name="id" value={brand.id} />}
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Marka Adı</label>
            <input
              name="name"
              defaultValue={brand?.name ?? ""}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
              placeholder="LC Waikiki"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">
              Logo URL <span className="text-[#5a6378]">(opsiyonel)</span>
            </label>
            <input
              name="logo_url"
              defaultValue={brand?.logo_url ?? ""}
              type="url"
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
              placeholder="https://..."
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_active"
              id="brand_is_active"
              defaultChecked={brand?.is_active ?? true}
              className="rounded border-white/20"
            />
            <label htmlFor="brand_is_active" className="text-sm text-[#8892a4]">
              Aktif
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-[#5a5fcf] text-white rounded-lg font-medium text-sm hover:opacity-90 disabled:opacity-70"
            >
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-white/5 border border-white/10 text-[#8892a4] rounded-lg font-medium text-sm hover:bg-white/10"
            >
              İptal
            </button>
            {brand?.id && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(brand.id!)}
                className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-medium text-sm hover:bg-red-500/30 ml-auto"
              >
                Sil
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setAdding(true)}
          className="px-4 py-2 bg-[#5a5fcf] text-white rounded-lg font-medium text-sm hover:opacity-90"
        >
          + Yeni Marka
        </button>
      </div>

      {items.map((b, i) => (
        <div
          key={b.id}
          className="bg-[#070b17] border border-white/[0.06] rounded-xl p-4 flex items-center gap-4"
        >
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => moveUp(i)}
              disabled={i === 0 || saving}
              className="p-1 text-[#5a6378] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Yukarı"
            >
              ▲
            </button>
            <button
              onClick={() => moveDown(i)}
              disabled={i === items.length - 1 || saving}
              className="p-1 text-[#5a6378] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Aşağı"
            >
              ▼
            </button>
          </div>
          <span className="text-sm text-[#5a6378] w-6">{i + 1}</span>
          <div className="flex-1 min-w-0 flex items-center gap-3">
            {b.logo_url ? (
              <img
                src={b.logo_url}
                alt={b.name}
                className="h-8 w-auto object-contain opacity-80"
              />
            ) : null}
            <span className="font-medium text-white">{b.name}</span>
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded shrink-0 ${
              b.is_active ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-[#8892a4]"
            }`}
          >
            {b.is_active ? "Aktif" : "Pasif"}
          </span>
          <button
            onClick={() => setEditing(b)}
            className="px-3 py-1.5 text-sm text-[#5a5fcf] hover:bg-[#5a5fcf]/10 rounded-lg shrink-0"
          >
            Düzenle
          </button>
        </div>
      ))}

      {editing && (
        <BrandForm
          brand={editing}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
      {adding && (
        <BrandForm
          brand={null}
          onCancel={() => setAdding(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
