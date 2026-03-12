"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ContentMap } from "@/lib/getContent";

type CTASectionProps = {
  content?: ContentMap;
};

export function CTASection({ content }: CTASectionProps) {
  const title = content?.["cta.title"] ?? "Büyümeye Hazır mısınız?";
  const subtext = content?.["cta.subtext"] ?? "Ücretsiz dijital denetim ile başlayın. Büyüme fırsatlarınızı birlikte keşfedelim.";
  const cta = content?.["cta.cta"] ?? "Teklif Al →";

  return (
    <section
      id="cta"
      className="bg-[#070b17] border-t border-white/[0.06] py-24 md:py-40 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Gradient blob */}
      <div
        className="absolute w-[500px] h-[400px] rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ background: "rgba(90,95,207,.07)" }}
      />

      <div className="max-w-[1200px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-[560px]"
        >
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white mb-6 whitespace-pre-line">
            {title}
          </h2>
          <p className="text-[#8892a4] text-base md:text-[0.95rem] leading-relaxed max-w-[420px] mb-10">
            {subtext}
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#03050d] font-extrabold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all"
            >
              {cta}
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 text-[#8892a4] font-bold text-sm hover:border-white/30 hover:text-white transition-all"
            >
              Demo Talep Et
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
