"use client";

import { motion } from "framer-motion";
import type { ContentMap } from "@/lib/getContent";
import type { Stat } from "@/lib/getStats";
import { tr } from "@/lib/translations";
import type { Locale } from "@/lib/i18n";

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
  locale?: Locale;
};

export function WhyAspiyas({ content, stats, locale = "tr" }: WhyAspiyasProps) {
  const label = content?.["why.label"] ?? (locale === "en" ? "Why Aspiyas?" : "Neden Aspiyas?");
  const title = content?.["why.title"] ?? (locale === "en" ? "We Know Growth From Within." : "Growth'u İçeriden Biliyoruz.");
  const whyStats = stats?.length
    ? stats.slice(0, 4).map((s) => ({ value: s.value, label: locale === "en" ? s.label_en : s.label_tr }))
    : [
        { value: "200+", label: tr("why", "stat1", locale) },
        { value: "500+", label: tr("why", "stat2", locale) },
        { value: "%70", label: tr("why", "stat3", locale) },
        { value: "3", label: tr("why", "stat4", locale) },
      ];
  const yearsStat = stats?.find((s) => s.key === "years");
  const bigYears = yearsStat?.value ?? "8+";

  const reasons = [
    { num: "01", title: tr("why", "reason1Title", locale), text: tr("why", "reason1Text", locale) },
    { num: "02", title: tr("why", "reason2Title", locale), text: tr("why", "reason2Text", locale) },
    { num: "03", title: tr("why", "reason3Title", locale), text: tr("why", "reason3Text", locale) },
    { num: "04", title: tr("why", "reason4Title", locale), text: tr("why", "reason4Text", locale) },
  ];

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
              {tr("why", "yearsExp", locale)}
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
