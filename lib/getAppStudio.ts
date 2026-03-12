import { unstable_noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";
import { getContent } from "@/lib/getContent";

export type AppStudioWhat = {
  id: string;
  title: string;
  desc: string;
};

export type AppStudioHow = {
  id: string;
  num: string;
  title: string;
  desc: string;
};

export type AppStudioContent = {
  label: string;
  hero: {
    title1: string;
    title2: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  what: {
    label: string;
    title: string;
    desc1: string;
    desc2: string;
    cta: string;
  };
  how: {
    label: string;
    title: string;
  };
  cta: {
    label: string;
    title: string;
    subtext: string;
    cta1: string;
    cta2: string;
  };
};

const FALLBACK_WHAT: AppStudioWhat[] = [
  { id: "1", title: "SaaS Ürün Geliştirme", desc: "Fikir → MVP → lansman. Next.js, Supabase, Stripe/LemonSqueezy entegrasyonlu tam ürün." },
  { id: "2", title: "Mobil Uygulama", desc: "React Native ile iOS & Android. RevenueCat abonelik, App Store yayın süreçleri." },
  { id: "3", title: "Markalara Özel AI Araçlar", desc: "LLM entegrasyonu, otomasyon workflow'ları, dahili AI asistanlar. Rakiplerinizden önce." },
  { id: "4", title: "Web Uygulama & Dashboard", desc: "Admin paneller, analitik dashboard'lar, müşteri portalleri. Tam yetki, tam mülkiyet." },
];

const FALLBACK_HOW: AppStudioHow[] = [
  { id: "1", num: "01", title: "Problem Tanımı", desc: "Çözdüğümüz problemi, hedef kullanıcıyı ve başarı kriterlerini netleştiriyoruz." },
  { id: "2", num: "02", title: "Mimari & Tasarım", desc: "Tech stack, veri modeli ve UI/UX tasarımı. Geliştirmeden önce tam plan." },
  { id: "3", num: "03", title: "MVP Geliştirme", desc: "Hızlı iterasyon. İlk çalışan versiyon 4-8 haftada hazır." },
  { id: "4", num: "04", title: "Lansman", desc: "App Store yayını, domain kurulumu, test & QA." },
  { id: "5", num: "05", title: "Growth", desc: "Kullanıcı edinimi, retention ve sürekli geliştirme. Ürün bitmiyor, büyüyor." },
];

async function fetchWhat(lang: "tr" | "en"): Promise<AppStudioWhat[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("app_studio_what")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (!data?.length) return FALLBACK_WHAT;
    return data.map((r) => ({
      id: r.id,
      title: lang === "tr" ? r.title_tr : r.title_en,
      desc: lang === "tr" ? r.desc_tr : r.desc_en,
    }));
  } catch {
    return FALLBACK_WHAT;
  }
}

async function fetchHow(lang: "tr" | "en"): Promise<AppStudioHow[]> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("app_studio_how")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (!data?.length) return FALLBACK_HOW;
    return data.map((r) => ({
      id: r.id,
      num: r.num,
      title: lang === "tr" ? r.title_tr : r.title_en,
      desc: lang === "tr" ? r.desc_tr : r.desc_en,
    }));
  } catch {
    return FALLBACK_HOW;
  }
}

function buildContent(map: Record<string, string>): AppStudioContent {
  return {
    label: map["app_studio.label"] ?? "ASP App Studio",
    hero: {
      title1: map["app_studio.hero.title1"] ?? "Fikri Ürüne",
      title2: map["app_studio.hero.title2"] ?? "Dönüştürüyoruz.",
      subtitle:
        map["app_studio.hero.subtitle"] ??
        "Markanıza özel dijital ürünler, AI araçlar ve mobil uygulamalar geliştiriyoruz. Fikir aşamasından canlıya kadar uçtan uca.",
      cta1: map["app_studio.hero.cta1"] ?? "Projeyi Konuşalım →",
      cta2: map["app_studio.hero.cta2"] ?? "Portföy Gör",
    },
    what: {
      label: map["app_studio.what.label"] ?? "Ne Yapıyoruz",
      title: map["app_studio.what.title"] ?? "Sadece Kod Yazmıyoruz.",
      desc1:
        map["app_studio.what.desc1"] ??
        "Her dijital ürün bir iş sorununu çözüyor olmalı. Bu yüzden geliştirmeye başlamadan önce problemi, kullanıcıyı ve büyüme modelini birlikte tanımlıyoruz.",
      desc2:
        map["app_studio.what.desc2"] ??
        "Shoovo, Dreemart ve Benche — kendi ürünlerimizi inşa ederek kazandığımız deneyimi müşteri projelerine taşıyoruz.",
      cta: map["app_studio.what.cta"] ?? "İletişime Geç →",
    },
    how: {
      label: map["app_studio.how.label"] ?? "Sürecimiz",
      title: map["app_studio.how.title"] ?? "Fikir → Canlı",
    },
    cta: {
      label: map["app_studio.cta.label"] ?? "Proje Başlat",
      title: map["app_studio.cta.title"] ?? "Bir Fikrin mi Var?",
      subtext:
        map["app_studio.cta.subtext"] ??
        "Konsepten canlıya — ürününüzü birlikte inşa edelim.",
      cta1: map["app_studio.cta.cta1"] ?? "Projeyi Anlat →",
      cta2: map["app_studio.cta.cta2"] ?? "Fiyat Sor",
    },
  };
}

export async function getAppStudio(lang: "tr" | "en" = "tr") {
  unstable_noStore();
  const [contentMap, what, how] = await Promise.all([
    getContent(lang),
    fetchWhat(lang),
    fetchHow(lang),
  ]);

  return {
    content: buildContent(contentMap),
    what,
    how,
  };
}
