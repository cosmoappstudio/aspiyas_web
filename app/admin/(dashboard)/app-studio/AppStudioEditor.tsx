"use client";

import { useState } from "react";
import { revalidatePages } from "@/lib/actions/revalidate";

export type WhatRow = {
  id: string;
  title_tr: string;
  title_en: string;
  desc_tr: string;
  desc_en: string;
  sort_order: number;
};

export type HowRow = {
  id: string;
  num: string;
  title_tr: string;
  title_en: string;
  desc_tr: string;
  desc_en: string;
  sort_order: number;
};

export type ContentRow = {
  id: string;
  key: string;
  value: string;
  lang: string;
};

export function AppStudioEditor({
  initialWhat,
  initialHow,
  initialContent,
}: {
  initialWhat: WhatRow[];
  initialHow: HowRow[];
  initialContent: ContentRow[];
}) {
  const [what, setWhat] = useState(initialWhat);
  const [how, setHow] = useState(initialHow);
  const [content, setContent] = useState(initialContent);
  const [editingWhat, setEditingWhat] = useState<WhatRow | null>(null);
  const [editingHow, setEditingHow] = useState<HowRow | null>(null);
  const [addingWhat, setAddingWhat] = useState(false);
  const [addingHow, setAddingHow] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "what" | "how">("content");
  const [error, setError] = useState<string | null>(null);

  async function saveContent(row: ContentRow, value: string) {
    setSaving(row.id);
    setError(null);
    const res = await fetch("/api/admin/app-studio/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: row.id, value }),
    });
    setSaving(null);
    if (!res.ok) {
      setError("Kaydetme başarısız");
      return;
    }
    setContent((prev) => prev.map((r) => (r.id === row.id ? { ...r, value } : r)));
    await revalidatePages();
  }

  async function saveWhat(formData: FormData) {
    setSaving("what");
    setError(null);
    const id = formData.get("id") as string;
    const payload = {
      id: id || undefined,
      title_tr: formData.get("title_tr") as string,
      title_en: formData.get("title_en") as string,
      desc_tr: formData.get("desc_tr") as string,
      desc_en: formData.get("desc_en") as string,
      sort_order: what.length,
    };
    const res = await fetch("/api/admin/app-studio/what", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(null);
    if (!res.ok) {
      setError("Kaydetme başarısız");
      return;
    }
    setEditingWhat(null);
    setAddingWhat(false);
    await revalidatePages();
    window.location.reload();
  }

  async function saveHow(formData: FormData) {
    setSaving("how");
    setError(null);
    const id = formData.get("id") as string;
    const payload = {
      id: id || undefined,
      num: formData.get("num") as string,
      title_tr: formData.get("title_tr") as string,
      title_en: formData.get("title_en") as string,
      desc_tr: formData.get("desc_tr") as string,
      desc_en: formData.get("desc_en") as string,
      sort_order: how.length,
    };
    const res = await fetch("/api/admin/app-studio/how", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(null);
    if (!res.ok) {
      setError("Kaydetme başarısız");
      return;
    }
    setEditingHow(null);
    setAddingHow(false);
    await revalidatePages();
    window.location.reload();
  }

  async function deleteWhat(id: string) {
    if (!confirm("Bu kartı silmek istediğinize emin misiniz?")) return;
    setError(null);
    const res = await fetch(`/api/admin/app-studio/what?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Silme başarısız");
      return;
    }
    setWhat((prev) => prev.filter((w) => w.id !== id));
    setEditingWhat(null);
    await revalidatePages();
    window.location.reload();
  }

  async function deleteHow(id: string) {
    if (!confirm("Bu adımı silmek istediğinize emin misiniz?")) return;
    setError(null);
    const res = await fetch(`/api/admin/app-studio/how?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Silme başarısız");
      return;
    }
    setHow((prev) => prev.filter((h) => h.id !== id));
    setEditingHow(null);
    await revalidatePages();
    window.location.reload();
  }

  const contentItems = content.filter((c) => c.key.startsWith("app_studio"));

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}
      <div className="flex gap-2 border-b border-white/[0.06] pb-4">
        {(["content", "what", "how"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-[#5a5fcf]/20 text-white border border-[#5a5fcf]/40"
                : "text-[#8892a4] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {tab === "content" ? "Metinler" : tab === "what" ? "Ne Yapıyoruz Kartları" : "Süreç Adımları"}
          </button>
        ))}
      </div>

      {activeTab === "content" && (
        <div className="bg-[#070b17] border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">App Studio Metinleri</h2>
          <div className="space-y-4">
            {contentItems.map((row) => (
              <div key={row.id} className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="text-sm text-[#8892a4] w-56 shrink-0 font-mono truncate">
                  {row.key}
                </label>
                <input
                  type="text"
                  defaultValue={row.value}
                  onBlur={(e) => {
                    const v = e.target.value;
                    if (v !== row.value) saveContent(row, v);
                  }}
                  className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
                />
                <span className="text-xs text-[#5a6378] w-8">{row.lang}</span>
                {saving === row.id && (
                  <span className="text-xs text-[#5a5fcf]">Kaydediliyor...</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "what" && (
        <div className="bg-[#070b17] border border-white/[0.06] rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Ne Yapıyoruz Kartları</h2>
            {!addingWhat && (
              <button
                onClick={() => setAddingWhat(true)}
                className="text-sm text-[#5a5fcf] hover:underline"
              >
                + Kart Ekle
              </button>
            )}
          </div>
          {(addingWhat || editingWhat) && (
            <WhatForm
              item={editingWhat ?? undefined}
              onCancel={() => {
                setAddingWhat(false);
                setEditingWhat(null);
              }}
              onSave={saveWhat}
              onDelete={editingWhat ? () => deleteWhat(editingWhat.id) : undefined}
            />
          )}
          <div className="space-y-3">
            {what.map((w) => (
              <div
                key={w.id}
                className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg border border-white/[0.06]"
              >
                <div>
                  <div className="font-medium text-white">{w.title_tr}</div>
                  <div className="text-xs text-[#8892a4] truncate max-w-md">{w.desc_tr}</div>
                </div>
                <button
                  onClick={() => setEditingWhat(w)}
                  className="text-xs text-[#5a5fcf] hover:underline"
                >
                  Düzenle
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "how" && (
        <div className="bg-[#070b17] border border-white/[0.06] rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Süreç Adımları</h2>
            {!addingHow && (
              <button
                onClick={() => setAddingHow(true)}
                className="text-sm text-[#5a5fcf] hover:underline"
              >
                + Adım Ekle
              </button>
            )}
          </div>
          {(addingHow || editingHow) && (
            <HowForm
              item={editingHow ?? undefined}
              onCancel={() => {
                setAddingHow(false);
                setEditingHow(null);
              }}
              onSave={saveHow}
              onDelete={editingHow ? () => deleteHow(editingHow.id) : undefined}
            />
          )}
          <div className="space-y-3">
            {how.map((h) => (
              <div
                key={h.id}
                className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg border border-white/[0.06]"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-[#5a5fcf] w-6">{h.num}</span>
                  <div>
                    <div className="font-medium text-white">{h.title_tr}</div>
                    <div className="text-xs text-[#8892a4] truncate max-w-md">{h.desc_tr}</div>
                  </div>
                </div>
                <button
                  onClick={() => setEditingHow(h)}
                  className="text-xs text-[#5a5fcf] hover:underline"
                >
                  Düzenle
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function WhatForm({
  item,
  onCancel,
  onSave,
  onDelete,
}: {
  item?: WhatRow;
  onCancel: () => void;
  onSave: (formData: FormData) => void;
  onDelete?: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-[#070b17] border border-white/[0.08] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold text-white mb-6">
          {item ? "Kart Düzenle" : "Yeni Kart Ekle"}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(new FormData(e.currentTarget));
          }}
          className="space-y-4"
        >
          {item?.id && <input type="hidden" name="id" value={item.id} />}
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Başlık (TR)</label>
            <input
              name="title_tr"
              defaultValue={item?.title_tr ?? ""}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Başlık (EN)</label>
            <input
              name="title_en"
              defaultValue={item?.title_en ?? ""}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Açıklama (TR)</label>
            <textarea
              name="desc_tr"
              defaultValue={item?.desc_tr ?? ""}
              required
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Açıklama (EN)</label>
            <textarea
              name="desc_en"
              defaultValue={item?.desc_en ?? ""}
              required
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#5a5fcf] text-white text-sm font-medium hover:opacity-90"
            >
              Kaydet
            </button>
            <button type="button" onClick={onCancel} className="text-sm text-[#8892a4] hover:text-white">
              İptal
            </button>
            {onDelete && item && (
              <button
                type="button"
                onClick={onDelete}
                className="text-sm text-red-400 hover:text-red-300 ml-auto"
              >
                Sil
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function HowForm({
  item,
  onCancel,
  onSave,
  onDelete,
}: {
  item?: HowRow;
  onCancel: () => void;
  onSave: (formData: FormData) => void;
  onDelete?: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-[#070b17] border border-white/[0.08] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold text-white mb-6">
          {item ? "Adım Düzenle" : "Yeni Adım Ekle"}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(new FormData(e.currentTarget));
          }}
          className="space-y-4"
        >
          {item?.id && <input type="hidden" name="id" value={item.id} />}
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Numara (01, 02, ...)</label>
            <input
              name="num"
              defaultValue={item?.num ?? ""}
              required
              placeholder="01"
              className="w-20 bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Başlık (TR)</label>
            <input
              name="title_tr"
              defaultValue={item?.title_tr ?? ""}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Başlık (EN)</label>
            <input
              name="title_en"
              defaultValue={item?.title_en ?? ""}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Açıklama (TR)</label>
            <textarea
              name="desc_tr"
              defaultValue={item?.desc_tr ?? ""}
              required
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-[#8892a4] mb-1">Açıklama (EN)</label>
            <textarea
              name="desc_en"
              defaultValue={item?.desc_en ?? ""}
              required
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#5a5fcf] text-white text-sm font-medium hover:opacity-90"
            >
              Kaydet
            </button>
            <button type="button" onClick={onCancel} className="text-sm text-[#8892a4] hover:text-white">
              İptal
            </button>
            {onDelete && item && (
              <button
                type="button"
                onClick={onDelete}
                className="text-sm text-red-400 hover:text-red-300 ml-auto"
              >
                Sil
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
