"use client";

import { useState } from "react";
import { revalidatePages } from "@/lib/actions/revalidate";

type ProductRow = {
  id: string;
  name: string;
  url: string;
  sort_order: number;
};

export function FooterProductsEditor({ initialData }: { initialData: ProductRow[] }) {
  const [items, setItems] = useState(initialData);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(formData: FormData) {
    setSaving(true);
    setError(null);
    const id = formData.get("id") as string;
    const payload = {
      id: id || undefined,
      name: formData.get("name") as string,
      url: formData.get("url") as string,
      sort_order: items.length,
    };
    const res = await fetch("/api/admin/footer-products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      setError("Kaydetme başarısız");
      return;
    }
    setEditing(null);
    setAdding(false);
    await revalidatePages();
    window.location.reload();
  }

  async function remove(id: string) {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    setError(null);
    const res = await fetch(`/api/admin/footer-products?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Silme başarısız");
      return;
    }
    setItems((prev) => prev.filter((p) => p.id !== id));
    setEditing(null);
    await revalidatePages();
    window.location.reload();
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">Footer Ürünleri</h2>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="text-sm text-[#5a5fcf] hover:underline"
          >
            + Ürün Ekle
          </button>
        )}
      </div>

      {(adding || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-[#070b17] border border-white/[0.08] rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-lg font-bold text-white mb-6">
              {editing ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                save(new FormData(e.currentTarget));
              }}
              className="space-y-4"
            >
              {editing?.id && <input type="hidden" name="id" value={editing.id} />}
              <div>
                <label className="block text-xs text-[#8892a4] mb-1">Ürün Adı</label>
                <input
                  name="name"
                  defaultValue={editing?.name ?? ""}
                  required
                  placeholder="Shoovo"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[#8892a4] mb-1">URL (App Store / Web)</label>
                <input
                  name="url"
                  type="text"
                  defaultValue={editing?.url ?? ""}
                  required
                  placeholder="https://apps.apple.com/app/..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-[#5a5fcf] text-white text-sm font-medium hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? "Kaydediliyor..." : "Kaydet"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAdding(false);
                    setEditing(null);
                  }}
                  className="text-sm text-[#8892a4] hover:text-white"
                >
                  İptal
                </button>
                {editing && (
                  <button
                    type="button"
                    onClick={() => remove(editing.id)}
                    className="text-sm text-red-400 hover:text-red-300 ml-auto"
                  >
                    Sil
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg border border-white/[0.06]"
          >
            <div>
              <div className="font-medium text-white">{p.name}</div>
              <div className="text-xs text-[#8892a4] truncate max-w-md">{p.url}</div>
            </div>
            <button
              onClick={() => setEditing(p)}
              className="text-xs text-[#5a5fcf] hover:underline"
            >
              Düzenle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
