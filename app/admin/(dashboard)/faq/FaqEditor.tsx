"use client";

import { useState } from "react";
import { revalidatePages } from "@/lib/actions/revalidate";
import { createClient } from "@/lib/supabase/client";

type FaqRow = {
  id: string;
  question_tr: string;
  question_en: string;
  answer_tr: string;
  answer_en: string;
  sort_order: number;
  is_active: boolean;
};

export function FaqEditor({ initialData }: { initialData: FaqRow[] }) {
  const [items, setItems] = useState(initialData);
  const [editing, setEditing] = useState<FaqRow | null>(null);
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

  async function updateOrder(ordered: FaqRow[]) {
    setSaving(true);
    for (let i = 0; i < ordered.length; i++) {
      await supabase.from("faq").update({ sort_order: i }).eq("id", ordered[i].id);
    }
    setItems(ordered.map((f, i) => ({ ...f, sort_order: i })));
    setSaving(false);
    await revalidatePages();
    window.location.reload();
  }

  async function handleSave(formData: FormData) {
    setSaving(true);
    const id = formData.get("id") as string;
    const payload = {
      question_tr: formData.get("question_tr") as string,
      question_en: formData.get("question_en") as string,
      answer_tr: formData.get("answer_tr") as string,
      answer_en: formData.get("answer_en") as string,
      is_active: formData.get("is_active") === "on",
    };

    if (id) {
      await supabase.from("faq").update(payload).eq("id", id);
      setItems((prev) =>
        prev.map((f) => (f.id === id ? { ...f, ...payload } : f))
      );
      setEditing(null);
    } else {
      const { data } = await supabase
        .from("faq")
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
    if (!confirm("Bu soruyu silmek istediğinize emin misiniz?")) return;
    setSaving(true);
    await supabase.from("faq").delete().eq("id", id);
    setItems((prev) => prev.filter((f) => f.id !== id));
    setEditing(null);
    setSaving(false);
    await revalidatePages();
    window.location.reload();
  }

  const FaqForm = ({
    faq,
    onCancel,
    onSave,
    onDelete,
  }: {
    faq: Partial<FaqRow> | null;
    onCancel: () => void;
    onSave: (formData: FormData) => void;
    onDelete?: (id: string) => void;
  }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-[#070b17] border border-white/[0.08] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold text-white mb-6">
          {faq?.id ? "Soru Düzenle" : "Yeni Soru Ekle"}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(new FormData(e.currentTarget));
          }}
          className="space-y-4"
        >
          {faq?.id && <input type="hidden" name="id" value={faq.id} />}
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Soru (TR)</label>
            <input
              name="question_tr"
              defaultValue={faq?.question_tr ?? ""}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Soru (EN)</label>
            <input
              name="question_en"
              defaultValue={faq?.question_en ?? ""}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Cevap (TR)</label>
            <textarea
              name="answer_tr"
              defaultValue={faq?.answer_tr ?? ""}
              required
              rows={4}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm resize-y"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Cevap (EN)</label>
            <textarea
              name="answer_en"
              defaultValue={faq?.answer_en ?? ""}
              required
              rows={4}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm resize-y"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_active"
              id="faq_is_active"
              defaultChecked={faq?.is_active ?? true}
              className="rounded border-white/20"
            />
            <label htmlFor="faq_is_active" className="text-sm text-[#8892a4]">
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
            {faq?.id && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(faq.id!)}
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
          + Yeni Soru
        </button>
      </div>

      {items.map((f, i) => (
        <div
          key={f.id}
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
            <div className="font-medium text-white text-sm line-clamp-2">
              {f.question_tr}
            </div>
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded shrink-0 ${
              f.is_active ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-[#8892a4]"
            }`}
          >
            {f.is_active ? "Aktif" : "Pasif"}
          </span>
          <button
            onClick={() => setEditing(f)}
            className="px-3 py-1.5 text-sm text-[#5a5fcf] hover:bg-[#5a5fcf]/10 rounded-lg shrink-0"
          >
            Düzenle
          </button>
        </div>
      ))}

      {editing && (
        <FaqForm
          faq={editing}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
      {adding && (
        <FaqForm
          faq={null}
          onCancel={() => setAdding(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
