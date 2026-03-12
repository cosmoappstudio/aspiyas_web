import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";

const techCards = [
  {
    title: "Veri & Analytics",
    desc: "GA4, Amplitude, Looker Studio, BigQuery — karar almanın merkezinde veri var.",
  },
  {
    title: "AI Entegrasyonu",
    desc: "Gemini, GPT-4, Claude — kendi ürünlerimize ve müşteri projelerine entegre.",
  },
  {
    title: "Modern Geliştirme",
    desc: "Next.js, React Native, Supabase, Vercel — hız ve ölçeklenebilirlik önceliğimiz.",
  },
  {
    title: "Shoovo Ekosistemi",
    desc: "Türkiye'nin ilk UGC platformu. Kendi ürünümüz, kendi growth motoru.",
  },
];

const skillCards = [
  {
    title: "Performans Pazarlama",
    desc: "Google Ads, Meta, TikTok kampanya yönetimi ve optimizasyonu.",
    bars: [
      { label: "Google Ads", value: 95 },
      { label: "Meta Ads", value: 92 },
      { label: "TikTok Ads", value: 80 },
    ],
  },
  {
    title: "Veri & Analytics",
    desc: "GA4, GTM, Looker Studio ve custom dashboard'larla veri altyapısı kuruyoruz.",
    bars: [
      { label: "GA4 & GTM", value: 95 },
      { label: "Looker Studio", value: 90 },
      { label: "Data Engineering", value: 70 },
    ],
  },
  {
    title: "Ürün & Geliştirme",
    desc: "SaaS ürün geliştirme, mobile app growth ve yazılım danışmanlığı.",
    bars: [
      { label: "SaaS Geliştirme", value: 88 },
      { label: "Mobile Growth", value: 85 },
      { label: "AI Entegrasyonu", value: 82 },
    ],
  },
];

const values = [
  {
    title: "Veri Önce Gelir",
    desc: "Her karar veriye dayanır. Sezgi değil, ölçüm.",
  },
  {
    title: "İçeriden Öğrenmek",
    desc: "Kendi ürünlerimizi yönetiyoruz. Growth'u bizzat yaşıyoruz.",
  },
  {
    title: "Hız & Kalite",
    desc: "Hızlı iterasyon, yüksek standart. İkisini birlikte tutuyoruz.",
  },
  {
    title: "Şeffaf Ortaklık",
    desc: "Müşterilerimizle gerçek ortak gibi çalışıyoruz. Sürpriz yok.",
  },
];

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Hakkımızda — Aspiyas | Dijital Büyüme & SaaS Tech House",
  description:
    "Aspiyas; kendi SaaS ürünlerini geliştiren ve markalara veri odaklı dijital büyüme hizmetleri sunan Antalya merkezli bir teknoloji şirketidir.",
};

export default function HakkimizdaPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden border-b border-white/[0.06]">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.015) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 60% 60% at 80% 50%, black, transparent 80%)",
          }}
        />
        <div className="max-w-[1200px] mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-6">
              Hakkımızda
              <span className="w-7 h-px bg-[#5a5fcf]" />
            </div>
            <h1 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.93] tracking-[-0.04em] text-white mb-6">
              Ürünler
              <br />
              İnşa Ediyoruz.
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,.2)" }}
              >
                Markalar
                <br />
                Büyütüyoruz.
              </span>
            </h1>
            <p className="text-[#8892a4] text-base md:text-[0.95rem] leading-relaxed max-w-[400px]">
              Aspiyas; kendi SaaS ürünlerini geliştiren ve markalara veri odaklı
              dijital büyüme hizmetleri sunan Antalya merkezli bir teknoloji
              şirketidir.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              {
                val: "8+",
                label:
                  "Yıl sektör deneyimi. Morhipo, Boyner, Vakko, LC Waikiki gibi markalarda yöneticilik.",
              },
              {
                val: "₺50M+",
                label: "Kariyer boyunca yönetilen toplam reklam bütçesi.",
              },
              {
                val: "3",
                label:
                  "Aktif SaaS ürün. Shoovo, Dreemart ve Benche — aynı zamanda kendi growth laboratuvarımız.",
              },
            ].map((kpi) => (
              <div
                key={kpi.val}
                className="bg-[#0c1120] border border-white/[0.06] rounded-xl p-5 md:p-6 grid grid-cols-[auto_1fr] gap-5 hover:border-white/20 transition-colors"
              >
                <div className="text-2xl font-bold tracking-tight text-white whitespace-nowrap">
                  {kpi.val}
                </div>
                <div className="text-sm text-[#8892a4] leading-relaxed">
                  {kpi.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Tech House */}
      <section className="bg-[#070b17] border-b border-white/[0.06] py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-4">
              Tech House Kavramı
              <span className="w-7 h-px bg-[#5a5fcf]" />
            </div>
            <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-6">
              Neden Sadece Ajans Olmak Yetersizdi?
            </h2>
            <p className="text-[#8892a4] text-sm md:text-base leading-relaxed mb-4">
              Yıllar içinde şunu fark ettik: en etkili growth stratejileri, ürünü
              bizzat büyüten ekiplerden çıkıyor. Bir reklam ajansı reklamı
              yönetir; biz reklamı, ürünü ve teknolojiyi birlikte yönetiyoruz.
            </p>
            <p className="text-[#8892a4] text-sm md:text-base leading-relaxed mb-8">
              Bu yüzden &quot;Tech House&quot; olmayı seçtik — kendi SaaS
              ürünlerimizi geliştiriyor, bu deneyimi müşterilerimize doğrudan
              yansıtıyoruz.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#03050d] font-extrabold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all"
              >
                İletişime Geç →
              </Link>
              <Link
                href="https://shoovo.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 text-[#8892a4] font-bold text-sm hover:border-white/30 hover:text-white transition-all"
              >
                Shoovo&apos;yu Gör
              </Link>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-6">
              Teknoloji Altyapımız
              <span className="w-7 h-px bg-[#5a5fcf]" />
            </div>
            <div className="flex flex-col gap-3">
              {techCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-[#0c1120] border border-white/[0.06] rounded-xl p-5 hover:border-[#5a5fcf]/25 transition-colors"
                >
                  <h3 className="text-sm font-bold text-white mb-0.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#8892a4] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-[#03050d] border-b border-white/[0.06] py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-4">
            Yetkinliklerimiz
            <span className="w-7 h-px bg-[#5a5fcf]" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white mb-12">
            Ne Konusunda İyiyiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {skillCards.map((skill) => (
              <div
                key={skill.title}
                className="bg-[#070b17] p-8 md:p-9 hover:bg-[#0c1120] transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-4">
                  {skill.title}
                </h3>
                <p className="text-sm text-[#8892a4] leading-relaxed mb-6">
                  {skill.desc}
                </p>
                <div className="space-y-4">
                  {skill.bars.map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between mb-1.5 text-xs">
                        <span className="text-[#8892a4]">{bar.label}</span>
                        <span className="text-[#5a5fcf] font-mono">
                          {bar.value}%
                        </span>
                      </div>
                      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#5a5fcf] to-[#7c5cdb]"
                          style={{ width: `${bar.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#070b17] border-b border-white/[0.06] py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-4">
            Değerlerimiz
            <span className="w-7 h-px bg-[#5a5fcf]" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white mb-12">
            Ne&apos;ye İnanıyoruz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="bg-[#0c1120] border border-white/[0.06] rounded-2xl p-6 md:p-7 hover:border-white/20 hover:-translate-y-1 transition-all"
              >
                <div className="w-8 h-0.5 bg-gradient-to-r from-[#5a5fcf] to-[#7c5cdb] rounded-full mb-5" />
                <h3 className="text-base font-bold text-white mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-[#8892a4] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
