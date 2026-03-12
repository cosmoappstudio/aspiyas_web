"use client";

import { useState } from "react";
import { revalidatePages } from "@/lib/actions/revalidate";
import { createClient } from "@/lib/supabase/client";
const ICONS = [
  "Target",
  "Video",
  "Smartphone",
  "Monitor",
  "Puzzle",
  "Bot",
  "AppWindow",
  "Search",
];

const BADGE_TYPES = ["default", "shoovo", "free"];
const SPANS = [4, 6, 12] as const;

type ServiceRow = {
  id: string;
  icon: string;
  title_tr: string;
  title_en: string;
  desc_tr: string;
  desc_en: string;
  tag: string | null;
  badge_type: string | null;
  sort_order: number;
  span: number;
  is_active: boolean;
};

export function ServicesEditor({ initialData }: { initialData: ServiceRow[] }) {
  const [items, setItems] = useState(initialData);
  const [editing, setEditing] = useState<ServiceRow | null>(null);
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

  async function updateOrder(ordered: ServiceRow[]) {
    setSaving(true);
    for (let i = 0; i < ordered.length; i++) {
      await supabase
        .from("services")
        .update({ sort_order: i })
        .eq("id", ordered[i].id);
    }
    setItems(ordered.map((s, i) => ({ ...s, sort_order: i })));
    setSaving(false);
    await revalidatePages();
    window.location.reload();
  }

  async function handleSave(formData: FormData) {
    setSaving(true);
    const id = formData.get("id") as string;
    const payload = {
      icon: formData.get("icon") as string,
      title_tr: formData.get("title_tr") as string,
      title_en: formData.get("title_en") as string,
      desc_tr: formData.get("desc_tr") as string,
      desc_en: formData.get("desc_en") as string,
      tag: (formData.get("tag") as string) || null,
      badge_type: (formData.get("badge_type") as string) || "default",
      span: parseInt(formData.get("span") as string, 10),
      is_active: formData.get("is_active") === "on",
    };

    if (id) {
      await supabase.from("services").update(payload).eq("id", id);
      setItems((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...payload } : s))
      );
      setEditing(null);
    } else {
      const { data } = await supabase
        .from("services")
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
    if (!confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
    setSaving(true);
    await supabase.from("services").delete().eq("id", id);
    setItems((prev) => prev.filter((s) => s.id !== id));
    setEditing(null);
    setSaving(false);
    await revalidatePages();
    window.location.reload();
  }

  const ServiceForm = ({
    service,
    onCancel,
    onSave,
    onDelete,
  }: {
    service: Partial<ServiceRow> | null;
    onCancel: () => void;
    onSave: (formData: FormData) => void;
    onDelete?: (id: string) => void;
  }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-[#070b17] border border-white/[0.08] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold text-white mb-6">
          {service?.id ? "Hizmet Düzenle" : "Yeni Hizmet Ekle"}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(new FormData(e.currentTarget));
          }}
          className="space-y-4"
        >
          {service?.id && <input type="hidden" name="id" value={service.id} />}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#8892a4] mb-1">İkon</label>
              <select
                name="icon"
                defaultValue={service?.icon ?? "Target"}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
              >
                {ICONS.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#8892a4] mb-1">Badge</label>
              <select
                name="badge_type"
                defaultValue={service?.badge_type ?? "default"}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
              >
                {BADGE_TYPES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Başlık (TR)</label>
            <input
              name="title_tr"
              defaultValue={service?.title_tr ?? ""}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Başlık (EN)</label>
            <input
              name="title_en"
              defaultValue={service?.title_en ?? ""}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Açıklama (TR)</label>
            <textarea
              name="desc_tr"
              defaultValue={service?.desc_tr ?? ""}
              required
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm resize-y"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Açıklama (EN)</label>
            <textarea
              name="desc_en"
              defaultValue={service?.desc_en ?? ""}
              required
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm resize-y"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#8892a4] mb-1">Tag</label>
              <input
                name="tag"
                defaultValue={service?.tag ?? ""}
                placeholder="Google · Meta · TikTok"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-[#8892a4] mb-1">Span</label>
              <select
                name="span"
                defaultValue={service?.span ?? 4}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
              >
                {SPANS.map((s) => (
                  <option key={s} value={s}>
                    {s} (1/{12 / s})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_active"
              id="is_active"
              defaultChecked={service?.is_active ?? true}
              className="rounded border-white/20"
            />
            <label htmlFor="is_active" className="text-sm text-[#8892a4]">
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
            {service?.id && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(service.id!)}
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
          + Yeni Hizmet
        </button>
      </div>

      {items.map((s, i) => (
        <div
          key={s.id}
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
          <div className="flex-1 min-w-0">
            <div className="font-medium text-white truncate">{s.title_tr}</div>
            <div className="text-xs text-[#8892a4]">
              {s.icon} · {s.badge_type || "default"} · span {s.span}
            </div>
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded shrink-0 ${
              s.is_active ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-[#8892a4]"
            }`}
          >
            {s.is_active ? "Aktif" : "Pasif"}
          </span>
          <button
            onClick={() => setEditing(s)}
            className="px-3 py-1.5 text-sm text-[#5a5fcf] hover:bg-[#5a5fcf]/10 rounded-lg"
          >
            Düzenle
          </button>
        </div>
      ))}

      {editing && (
        <ServiceForm
          service={editing}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
      {adding && (
        <ServiceForm
          service={null}
          onCancel={() => setAdding(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
