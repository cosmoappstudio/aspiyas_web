import { createClient } from "@/lib/supabase/server";
import { faqItems } from "@/constants/faq";
import type { FaqItem } from "@/constants/faq";

async function fetchFaqs(): Promise<FaqItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("faq")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    if (!data?.length) throw new Error("No faq");

    return data.map((row) => ({
      id: row.id,
      question_tr: row.question_tr,
      question_en: row.question_en,
      answer_tr: row.answer_tr,
      answer_en: row.answer_en,
      sort_order: row.sort_order ?? 0,
    }));
  } catch {
    return [...faqItems].sort((a, b) => a.sort_order - b.sort_order);
  }
}

export async function getFaqs(): Promise<FaqItem[]> {
  return fetchFaqs();
}
