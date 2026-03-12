import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { getAppStudio } from "@/lib/getAppStudio";

export const metadata = {
  title: "App Studio — Aspiyas | Dijital Ürün & AI Araç Geliştirme",
  description:
    "Markanıza özel dijital ürünler, AI araçlar ve mobil uygulamalar. Fikir aşamasından canlıya kadar uçtan uca geliştirme.",
};

export default async function AppStudioPage() {
  const { content, what, how } = await getAppStudio("tr");

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden border-b border-white/[0.06] text-center">
        <div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none -top-24 -left-24 opacity-50"
          style={{
            background: "radial-gradient(circle, rgba(90,95,207,.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none -top-20 -right-20 opacity-50"
          style={{
            background: "radial-gradient(circle, rgba(244,124,32,.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(90,95,207,.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="max-w-[680px] mx-auto relative">
          <div className="flex items-center justify-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-6">
            {content.label}
            <span className="w-7 h-px bg-[#5a5fcf]" />
          </div>
          <h1 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.93] tracking-[-0.04em] text-white mb-6">
            {content.hero.title1}
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px rgba(255,255,255,.2)" }}
            >
              {content.hero.title2}
            </span>
          </h1>
          <p className="text-[#8892a4] text-base leading-relaxed mb-12">
            {content.hero.subtitle}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#03050d] font-extrabold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all"
            >
              {content.hero.cta1}
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 text-[#8892a4] font-bold text-sm hover:border-white/30 hover:text-white transition-all"
            >
              {content.hero.cta2}
            </Link>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-[#070b17] border-b border-white/[0.06] py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-4">
              {content.what.label}
              <span className="w-7 h-px bg-[#5a5fcf]" />
            </div>
            <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-6">
              {content.what.title}
            </h2>
            <p className="text-[#8892a4] text-sm md:text-base leading-relaxed mb-4">
              {content.what.desc1}
            </p>
            <p className="text-[#8892a4] text-sm md:text-base leading-relaxed mb-8">
              {content.what.desc2}
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#03050d] font-extrabold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all"
            >
              {content.what.cta}
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {what.map((card) => (
              <div
                key={card.id}
                className="bg-[#0c1120] border border-white/[0.06] rounded-xl p-5 md:p-6 flex gap-4 hover:border-[#5a5fcf]/25 transition-colors"
              >
                <div className="w-1 min-h-8 bg-gradient-to-b from-[#5a5fcf] to-[#7c5cdb] rounded-full flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#8892a4] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section className="bg-[#03050d] border-b border-white/[0.06] py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-4">
            {content.how.label}
            <span className="w-7 h-px bg-[#5a5fcf]" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white mb-12">
            {content.how.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {how.map((step) => (
              <div
                key={step.id}
                className="bg-[#070b17] p-6 md:p-8 hover:bg-[#0c1120] transition-colors"
              >
                <div className="text-[10px] font-mono text-[#5a5fcf] tracking-[0.08em] mb-6">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-tight">
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

      {/* CTA */}
      <section className="bg-[#03050d] border-b border-white/[0.06] py-24 px-6 md:px-12">
        <div className="max-w-[480px] mx-auto text-center">
          <div className="flex items-center justify-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-6">
            {content.cta.label}
            <span className="w-7 h-px bg-[#5a5fcf]" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.03em] text-white mb-4">
            {content.cta.title}
          </h2>
          <p className="text-[#8892a4] text-sm md:text-base mb-10">
            {content.cta.subtext}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#03050d] font-extrabold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all"
            >
              {content.cta.cta1}
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 text-[#8892a4] font-bold text-sm hover:border-white/30 hover:text-white transition-all"
            >
              {content.cta.cta2}
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
