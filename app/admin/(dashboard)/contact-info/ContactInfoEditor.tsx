"use client";

import { useState } from "react";
import { revalidatePages } from "@/lib/actions/revalidate";
import { createClient } from "@/lib/supabase/client";

type ContactRow = {
  id: string;
  key: string;
  value: string;
};

export function ContactInfoEditor({ initialData }: { initialData: ContactRow[] }) {
  const [items, setItems] = useState(initialData);
  const [saving, setSaving] = useState<string | null>(null);
  const supabase = createClient();

  const labels: Record<string, string> = {
    adres: "Adres",
    email: "E-posta",
    telefon: "Telefon",
    sosyal: "Sosyal Medya (metin)",
    linkedin_url: "LinkedIn URL",
    x_url: "X (Twitter) URL",
    instagram_url: "Instagram URL",
  };

  async function handleSave(row: ContactRow, newValue: string) {
    setSaving(row.id);
    const { error } = await supabase
      .from("contact_info")
      .update({ value: newValue })
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
    <div className="space-y-4">
      {items.map((row) => (
        <div
          key={row.id}
          className="bg-[#070b17] border border-white/[0.06] rounded-xl p-6"
        >
          <label className="block text-sm font-medium text-white mb-2">
            {labels[row.key] ?? row.key}
          </label>
          <input
            type="text"
            defaultValue={row.value}
            onBlur={(e) => {
              const v = e.target.value;
              if (v !== row.value) handleSave(row, v);
            }}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white text-sm"
          />
          {saving === row.id && (
            <span className="text-xs text-[#5a5fcf] mt-2 block">Kaydediliyor...</span>
          )}
        </div>
      ))}
    </div>
  );
}
