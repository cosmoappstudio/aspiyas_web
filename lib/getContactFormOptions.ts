import { createClient } from "@/lib/supabase/server";

export type ContactFormOptions = {
  sectors: string[];
  budgets: string[];
  services: string[];
};

const FALLBACK: ContactFormOptions = {
  sectors: [
    "E-ticaret & Perakende",
    "Turizm & Otelcilik",
    "Fintech & Finans",
    "Sağlık & Wellness",
    "Gıda & İçecek",
    "Moda & Güzellik",
    "Teknoloji & SaaS",
    "Eğitim & EdTech",
    "Gayrimenkul",
    "Otomotiv",
    "Diğer",
  ],
  budgets: ["₺0", "₺10K-50K", "₺50K-150K", "₺150K-500K", "₺500K-1M", "₺1M+"],
  services: [
    "Veri Bilimi Odaklı Performans Pazarlama",
    "UGC Hizmeti (Shoovo)",
    "Sosyal Medya Yönetimi",
    "Web Sitesi Tasarım & Geliştirme",
    "Yazılım Danışmanlığı",
    "Markalara Özel AI Araç Geliştirme",
    "Mobile App Growth",
    "Dijital Denetim Hizmeti",
    "Birden Fazla Hizmet",
  ],
};

async function fetchContactFormOptions(): Promise<ContactFormOptions> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contact_form_options")
      .select("option_type, value, sort_order")
      .order("sort_order", { ascending: true });

    if (error) throw error;
    if (!data?.length) throw new Error("No options");

    const sectors: string[] = [];
    const budgets: string[] = [];
    const services: string[] = [];

    for (const row of data) {
      const val = row.value as string;
      if (row.option_type === "sector") sectors.push(val);
      else if (row.option_type === "budget") budgets.push(val);
      else if (row.option_type === "service") services.push(val);
    }

    return {
      sectors: sectors.length ? sectors : FALLBACK.sectors,
      budgets: budgets.length ? budgets : FALLBACK.budgets,
      services: services.length ? services : FALLBACK.services,
    };
  } catch {
    return FALLBACK;
  }
}

export async function getContactFormOptions(): Promise<ContactFormOptions> {
  return fetchContactFormOptions();
}
