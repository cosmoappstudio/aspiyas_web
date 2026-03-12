"use client";

import { useState } from "react";
import { revalidatePages } from "@/lib/actions/revalidate";
import { createClient } from "@/lib/supabase/client";

type OptionRow = {
  id: string;
  option_type: string;
  value: string;
  sort_order: number;
};

type OptionSectionProps = {
  title: string;
  type: "sector" | "budget" | "service";
  items: OptionRow[];
  onUpdate: () => void;
};

function OptionSection({ title, type, items, onUpdate }: OptionSectionProps) {
  const [adding, setAdding] = useState(false);
  const [newValue, setNewValue] = useState("");
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

  async function updateOrder(ordered: OptionRow[]) {
    setSaving(true);
    for (let i = 0; i < ordered.length; i++) {
      await supabase
        .from("contact_form_options")
        .update({ sort_order: i })
        .eq("id", ordered[i].id);
    }
    setSaving(false);
    await revalidatePages();
    onUpdate();
  }

  async function handleAdd() {
    if (!newValue.trim()) return;
    setSaving(true);
    await supabase.from("contact_form_options").insert({
      option_type: type,
      value: newValue.trim(),
      sort_order: items.length,
    });
    setNewValue("");
    setAdding(false);
    setSaving(false);
    await revalidatePages();
    onUpdate();
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu seçeneği silmek istediğinize emin misiniz?")) return;
    setSaving(true);
    await supabase.from("contact_form_options").delete().eq("id", id);
    setSaving(false);
    await revalidatePages();
    onUpdate();
  }

  return (
    <div className="bg-[#070b17] border border-white/[0.06] rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <button
          onClick={() => setAdding(!adding)}
          className="px-4 py-2 bg-[#5a5fcf] text-white rounded-lg text-sm font-medium hover:opacity-90"
        >
          + Ekle
        </button>
      </div>

      {adding && (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder={
              type === "sector"
                ? "Örn: E-ticaret & Perakende"
                : type === "budget"
                  ? "Örn: ₺10K-50K"
                  : "Örn: Performans Pazarlama"
            }
            className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button
            onClick={handleAdd}
            disabled={saving || !newValue.trim()}
            className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm font-medium hover:bg-emerald-500/30 disabled:opacity-50"
          >
            Kaydet
          </button>
          <button
            onClick={() => {
              setAdding(false);
              setNewValue("");
            }}
            className="px-4 py-2 bg-white/5 border border-white/10 text-[#8892a4] rounded-lg text-sm"
          >
            İptal
          </button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0"
          >
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => moveUp(i)}
                disabled={i === 0 || saving}
                className="p-1 text-[#5a6378] hover:text-white disabled:opacity-30"
                aria-label="Yukarı"
              >
                ▲
              </button>
              <button
                onClick={() => moveDown(i)}
                disabled={i === items.length - 1 || saving}
                className="p-1 text-[#5a6378] hover:text-white disabled:opacity-30"
                aria-label="Aşağı"
              >
                ▼
              </button>
            </div>
            <span className="text-sm text-[#5a6378] w-6">{i + 1}</span>
            <span className="flex-1 text-white text-sm">{item.value}</span>
            <button
              onClick={() => handleDelete(item.id)}
              disabled={saving}
              className="text-xs text-red-400 hover:text-red-300 px-2 py-1"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

type Props = {
  initialData: {
    sectors: OptionRow[];
    budgets: OptionRow[];
    services: OptionRow[];
  };
};

export function ContactFormOptionsEditor({ initialData }: Props) {
  return (
    <div>
      <OptionSection
        title="Sektörler"
        type="sector"
        items={initialData.sectors}
        onUpdate={() => window.location.reload()}
      />
      <OptionSection
        title="Bütçe Aralıkları"
        type="budget"
        items={initialData.budgets}
        onUpdate={() => window.location.reload()}
      />
      <OptionSection
        title="Hizmet Listesi"
        type="service"
        items={initialData.services}
        onUpdate={() => window.location.reload()}
      />
    </div>
  );
}
