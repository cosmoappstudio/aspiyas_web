import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import type { Locale } from "@/lib/i18n";

const serviceCards = [
  {
    num: "01",
    title: "Performans Pazarlama",
    desc: "Reklam bütçenizi boşa harcatmıyoruz. Google, Meta ve TikTok kampanyalarınızı veriyle yönetiyor, her lira için hesap veriyoruz.",
    tags: ["Google Ads", "Meta", "ROAS"],
  },
  {
    num: "02",
    title: "UGC İçerik",
    desc: "Kendi platformumuz Shoovo ile gerçek içerik üreticilerinden markanıza özel videolar. Ajans prodüksiyonuna kıyasla %70 daha ucuz, 3-7 günde teslim.",
    tags: ["Shoovo", "Creator", "Video"],
  },
  {
    num: "03",
    title: "Sosyal Medya",
    desc: "Strateji, içerik ve topluluk yönetimi birlikte. Her platformun kendine has dilini konuşuyoruz; performans hedeflerini de gözden kaçırmıyoruz.",
    tags: ["İçerik", "Strateji", "Community"],
  },
  {
    num: "04",
    title: "Web Tasarım & Geliştirme",
    desc: "Şık görünmek yeterli değil — hızlı açılmalı, sıralamada yükselmeli ve ziyaretçiyi müşteriye dönüştürmeli. Hepsini birden yapıyoruz.",
    tags: ["Next.js", "SEO", "CRO"],
  },
  {
    num: "05",
    title: "Yazılım Danışmanlığı",
    desc: "Hangi teknolojiyi seçmeli, ekibi nasıl kurmalı, yol haritası nasıl önceliklendirilmeli? Bunlar için dışarıdan bir teknik ortak arıyorsanız buradayız.",
    tags: ["Roadmap", "Architecture"],
  },
  {
    num: "06",
    title: "Mobile App Growth",
    desc: "Uygulamanız App Store'da kaybolup gitmesin. ASO'dan kullanıcı edinimi kampanyalarına, retention stratejilerine kadar büyümeyi bütünsel görüyoruz.",
    tags: ["ASO", "UA", "Retention"],
  },
  {
    num: "07",
    title: "Dijital Denetim",
    desc: "Reklam hesaplarınızda, SEO'nuzda ve analytics kurulumunuzda neler kaybediyorsunuz? Ücretsiz denetimle masaya yatırıyoruz.",
    tags: ["Ücretsiz", "Ads", "SEO"],
  },
  {
    num: "08",
    title: "AI Araç Geliştirme",
    desc: "Rakipleriniz yapay zekayı kullanmaya başlamadan önce siz kullanın. İş akışlarınıza özel, çalışan ve ölçeklenen AI araçlar geliştiriyoruz.",
    tags: ["LLM", "Automation", "API"],
  },
];

const processSteps = [
  { num: "01", title: "Keşif & Denetim", desc: "Mevcut durumu analiz ediyoruz. Ücretsiz." },
  { num: "02", title: "Strateji", desc: "Büyüme yol haritası ve KPI'lar belirliyoruz." },
  { num: "03", title: "Uygulama", desc: "Kampanyaları kuruyoruz, sistemleri devreye alıyoruz." },
  { num: "04", title: "Optimizasyon", desc: "Sürekli A/B testi ve haftalık raporlama." },
];

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Hizmetler — Aspiyas | Dijital Büyüme & SaaS Tech House",
  description:
    "Performans pazarlama, UGC içerik, sosyal medya, web geliştirme, AI araçlar ve dijital denetim. Veri odaklı, ölçülebilir hizmetler.",
};

export default async function HizmetlerPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const base = `/${locale}`;

  return (
    <PageLayout locale={locale}>
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
            maskImage: "radial-gradient(ellipse 80% 80% at 20% 50%, black, transparent 80%)",
          }}
        />
        <div className="max-w-[1200px] mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-6">
              Hizmetler
              <span className="w-7 h-px bg-[#5a5fcf]" />
            </div>
            <h1 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.93] tracking-[-0.04em] text-white mb-6">
              Entegre
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,.2)" }}
              >
                Dijital Büyüme
              </span>
            </h1>
            <p className="text-[#8892a4] text-base md:text-[0.95rem] leading-relaxed max-w-[430px] mb-10">
              Veri bilimi odaklı pazarlamadan AI araç geliştirmeye — kendi
              ürünlerimizi yönettiğimiz için growth&apos;u içeriden biliyoruz.
            </p>
            <div className="flex gap-3 flex-wrap mb-10">
              <Link
                href={`${base}/iletisim`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#03050d] font-extrabold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all"
              >
                Ücretsiz Denetim →
              </Link>
              <Link
                href={`${base}/iletisim`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 text-[#8892a4] font-bold text-sm hover:border-white/30 hover:text-white transition-all"
              >
                Teklif Al
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
              {[
                { val: "8+", label: "Yıl Deneyim" },
                { val: "200+", label: "Müşteri Marka" },
                { val: "₺50M+", label: "Yönetilen Bütçe" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#070b17] px-5 py-5"
                >
                  <div className="text-xl md:text-2xl font-bold tracking-tight text-white">
                    {stat.val}
                  </div>
                  <div className="text-[11px] text-[#5a6378] uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 relative">
            <div
              className="absolute w-[350px] h-[350px] rounded-full pointer-events-none opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                background: "radial-gradient(circle, rgba(90,95,207,.15) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10 bg-[#0c1120] border border-white/[0.06] rounded-2xl p-6">
              <div className="text-[11px] font-mono text-[#5a6378] mb-4 tracking-wider">
                ROAS — Son 30 Gün
              </div>
              <div className="flex items-end gap-1.5 h-14">
                {[40, 60, 50, 75, 65, 85, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-[#5a5fcf] transition-all"
                    style={{
                      height: `${h}%`,
                      opacity: 0.15 + (i + 1) * 0.1,
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 text-2xl font-bold text-white">
                ×4.8{" "}
                <span className="text-sm font-normal text-[#8892a4]">
                  ort. ROAS
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-[#0c1120] border border-white/[0.06] rounded-2xl p-5">
                <div className="text-[10px] font-mono text-[#5a6378] mb-2">
                  UGC İçerik
                </div>
                <div className="text-2xl font-bold text-white">%70</div>
                <div className="text-xs text-[#8892a4]">Daha Düşük Maliyet</div>
              </div>
              <div className="bg-[#0c1120] border border-white/[0.06] rounded-2xl p-5">
                <div className="text-[10px] font-mono text-[#5a6378] mb-2">
                  Teslimat
                </div>
                <div className="text-2xl font-bold text-white">3-7</div>
                <div className="text-xs text-[#8892a4]">İş Günü</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-[#070b17] border-b border-white/[0.06] py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-4">
            Tüm Hizmetler
            <span className="w-7 h-px bg-[#5a5fcf]" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white mb-12">
            Ne Yapıyoruz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {serviceCards.map((card) => (
              <div
                key={card.num}
                className="bg-[#070b17] p-6 md:p-7 relative hover:bg-[#0c1120] transition-colors group"
              >
                <div className="text-[10px] font-mono text-[#5a6378] mb-6 flex justify-between">
                  {card.num} ↗
                </div>
                <div className="w-6 h-0.5 bg-[#5a5fcf] rounded-full mb-5 group-hover:w-10 transition-all" />
                <h3 className="text-base font-bold text-white mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-[#8892a4] leading-relaxed mb-4">
                  {card.desc}
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono uppercase tracking-wider text-[#5a6378] px-2 py-0.5 bg-white/[0.03] border border-white/[0.06] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="absolute bottom-7 right-7 text-sm text-[#5a6378] opacity-0 -translate-x-1 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
                  ↗
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#03050d] border-b border-white/[0.06] py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-4">
            Süreç
            <span className="w-7 h-px bg-[#5a5fcf]" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white mb-12">
            Nasıl Çalışıyoruz
          </h2>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 mt-12">
            <div
              className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#5a5fcf] to-[#7c5cdb] opacity-30"
              aria-hidden
            />
            {processSteps.map((step) => (
              <div key={step.num} className="text-center px-4 relative z-10">
                <div className="w-12 h-12 rounded-full border border-[#5a5fcf]/30 bg-[#5a5fcf]/10 flex items-center justify-center mx-auto mb-5 text-sm font-mono text-[#5a5fcf]">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-[#8892a4] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#070b17] border-b border-white/[0.06] py-20 px-6 md:px-12">
        <div className="max-w-[460px] mx-auto text-center">
          <h3 className="text-[clamp(1.75rem,3vw,2.4rem)] font-bold tracking-tight text-white mb-4">
            Ücretsiz Denetimle Başlayın
          </h3>
          <p className="text-[#8892a4] text-sm md:text-base mb-8">
            Hangi hizmetin size uygun olduğundan emin değil misiniz?
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href={`${base}/iletisim`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#03050d] font-extrabold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all"
            >
              Denetim Talep Et →
            </Link>
            <Link
              href={`${base}/iletisim`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 text-[#8892a4] font-bold text-sm hover:border-white/30 hover:text-white transition-all"
            >
              Demo İzle
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
