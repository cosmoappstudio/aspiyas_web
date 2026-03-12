"use client";

import { useState } from "react";
import { revalidatePages } from "@/lib/actions/revalidate";
import { createClient } from "@/lib/supabase/client";

type StatRow = {
  id: string;
  key: string;
  value: string;
  label_tr: string;
  label_en: string;
};

export function StatsEditor({ initialData }: { initialData: StatRow[] }) {
  const [items, setItems] = useState(initialData);
  const [saving, setSaving] = useState<string | null>(null);
  const supabase = createClient();

  async function handleSave(row: StatRow, field: "value" | "label_tr" | "label_en", newVal: string) {
    setSaving(row.id);
    const update: Record<string, string> = { [field]: newVal };
    const { error } = await supabase.from("stats").update(update).eq("id", row.id);
    setSaving(null);
    if (!error) {
      setItems((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, [field]: newVal } : r))
      );
      await revalidatePages();
    }
  }

  return (
    <div className="space-y-4">
      {items.map((row) => (
        <div
          key={row.id}
          className="bg-[#070b17] border border-white/[0.06] rounded-xl p-6"
        >
          <div className="font-mono text-sm text-[#5a5fcf] mb-4">{row.key}</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#8892a4] mb-1">Değer</label>
              <input
                type="text"
                defaultValue={row.value}
                onBlur={(e) => {
                  const v = e.target.value;
                  if (v !== row.value) handleSave(row, "value", v);
                }}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-[#8892a4] mb-1">Label (TR)</label>
              <input
                type="text"
                defaultValue={row.label_tr}
                onBlur={(e) => {
                  const v = e.target.value;
                  if (v !== row.label_tr) handleSave(row, "label_tr", v);
                }}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-[#8892a4] mb-1">Label (EN)</label>
              <input
                type="text"
                defaultValue={row.label_en}
                onBlur={(e) => {
                  const v = e.target.value;
                  if (v !== row.label_en) handleSave(row, "label_en", v);
                }}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2 text-white text-sm"
              />
            </div>
          </div>
          {saving === row.id && (
            <span className="text-xs text-[#5a5fcf] mt-2 block">Kaydediliyor...</span>
          )}
        </div>
      ))}
    </div>
  );
}
