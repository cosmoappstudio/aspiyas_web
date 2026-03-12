"use client";

import { useState } from "react";
import { revalidatePages } from "@/lib/actions/revalidate";
import { createClient } from "@/lib/supabase/client";

type ContentRow = {
  id: string;
  key: string;
  value: string;
  lang: string;
  section: string;
};

export function ContentEditor({ initialData }: { initialData: ContentRow[] }) {
  const [items, setItems] = useState(initialData);
  const [saving, setSaving] = useState<string | null>(null);
  const supabase = createClient();

  const sections = [...new Set(items.map((i) => i.section))].sort();

  async function handleSave(row: ContentRow, newValue: string) {
    setSaving(row.id);
    const { error } = await supabase
      .from("content")
      .update({ value: newValue, updated_at: new Date().toISOString() })
      .eq("id", row.id);

    setSaving(null);
    if (!error) {
      setItems((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, value: newValue } : r))
      );
      await revalidatePages();
    }
  }

  return (
    <div className="space-y-8">
      {sections.map((section) => {
        const sectionItems = items.filter((i) => i.section === section);
        return (
          <div
            key={section}
            className="bg-[#070b17] border border-white/[0.06] rounded-xl p-6"
          >
            <h2 className="text-lg font-bold text-white mb-4 capitalize">
              {section}
            </h2>
            <div className="space-y-4">
              {sectionItems.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <label className="text-sm text-[#8892a4] w-48 shrink-0 font-mono">
                    {row.key}
                  </label>
                  <input
                    type="text"
                    defaultValue={row.value}
                    onBlur={(e) => {
                      const v = e.target.value;
                      if (v !== row.value) handleSave(row, v);
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
        );
      })}
    </div>
  );
}
