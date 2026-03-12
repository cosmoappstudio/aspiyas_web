"use client";

import { motion } from "framer-motion";
import type { ContentMap } from "@/lib/getContent";
import type { Stat } from "@/lib/getStats";

const FALLBACK_REASONS = [
  { num: "01", title: "Teknoloji şirketiyiz, sadece ajans değil", text: "Kendi SaaS ürünlerimizi yönetiyoruz. Ölçekleme sorunlarını bizzat çözüyoruz." },
  { num: "02", title: "UGC'den performance'a entegre hizmet", text: "Shoovo ile içerik üretip aynı çatıda yönetiyoruz. Maliyet %70 daha düşük." },
  { num: "03", title: "Veri ve AI odaklı karar alma", text: "Her kararı veriye dayandırıyoruz. Ölçülebilir ve sürdürülebilir büyüme." },
  { num: "04", title: "8+ yıl büyük marka deneyimi", text: "LC Waikiki, Vodafone, Morhipo ve Boyner ile çalışmış ekip." },
];

const FALLBACK_STATS = [
  { value: "200+", label: "Aktif Marka" },
  { value: "500+", label: "Creator" },
  { value: "%70", label: "Düşük İçerik Maliyeti" },
  { value: "3", label: "Aktif SaaS Ürün" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

type WhyAspiyasProps = {
  content?: ContentMap;
  stats?: Stat[];
};

export function WhyAspiyas({ content, stats }: WhyAspiyasProps) {
  const label = content?.["why.label"] ?? "Neden Aspiyas?";
  const title = content?.["why.title"] ?? "Growth'u İçeriden Biliyoruz.";
  const whyStats = stats?.length
    ? stats.slice(0, 4).map((s) => ({ value: s.value, label: s.label_tr }))
    : FALLBACK_STATS;
  const yearsStat = stats?.find((s) => s.key === "years");
  const bigYears = yearsStat?.value ?? "8+";

  // Reasons stay hardcoded for now (no CMS field)
  const reasons = FALLBACK_REASONS;

  return (
    <section
      id="why"
      className="bg-[#03050d] border-t border-white/[0.06]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-12 lg:gap-24 items-start">
          {/* Left: Reasons */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-4">
              {label}
              <span className="w-7 h-px bg-[#5a5fcf]" />
            </div>
            <motion.h2
              variants={item}
              className="text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white mb-12 whitespace-pre-line"
            >
              {title}
            </motion.h2>

            <div className="mt-12 border-t border-white/[0.06]">
              {reasons.map((reason) => (
                <motion.div
                  key={reason.num}
                  variants={item}
                  className="grid grid-cols-[2.5rem_1fr] gap-5 py-7 border-b border-white/[0.06]"
                >
                  <div className="text-[11px] text-[#5a6378] font-mono pt-0.5">
                    {reason.num}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5">
                      {reason.title}
                    </h3>
                    <p className="text-[13px] text-[#8892a4] leading-relaxed">
                      {reason.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Big stat + grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="pt-4"
          >
            <div className="text-6xl md:text-7xl font-bold leading-[0.9] tracking-[-0.05em] text-white/[0.07] mb-2">
              {bigYears}
            </div>
            <div className="text-sm text-[#8892a4] tracking-wide mb-12">
              Yıl Sektör Deneyimi
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/[0.06] rounded-xl overflow-hidden border border-white/[0.06]">
              {whyStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#0c1120] p-6"
                >
                  <div className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-[#5a6378] uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
