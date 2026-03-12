"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ContentMap } from "@/lib/getContent";
import type { Stat } from "@/lib/getStats";

const FALLBACK_STATS = [
  { value: "27+", label: "Aktif Marka" },
  { value: "200+", label: "Creator" },
  { value: "%70", label: "Daha Düşük Maliyet" },
];

type ProductsProps = {
  content?: ContentMap;
  stats?: Stat[];
};

export function Products({ content, stats }: ProductsProps) {
  const shoovoStats = stats?.length
    ? stats
        .filter((s) => ["brands", "creators", "budget"].includes(s.key))
        .slice(0, 3)
        .map((s) => ({ value: s.value, label: s.label_tr }))
    : FALLBACK_STATS;

  const kicker = content?.["shoovo.kicker"] ?? "Flagship Ürün";
  const title = content?.["shoovo.title"] ?? "Türkiye'nin İlk UGC Platformu.";
  const desc = content?.["shoovo.desc"] ?? "Shoovo, markaları içerik üreticileriyle buluşturarak hızlı ve ekonomik video içerik üretimini mümkün kılıyor. İçerik maliyetini %70'e kadar düşürüyoruz.";

  return (
    <section
      id="shoovo"
      className="bg-[#070b17] border-t border-b border-white/[0.06]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-[#f47c20] font-mono">
              <span className="w-3.5 h-px bg-[#f47c20]" />
              {kicker}
            </div>

            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-white whitespace-pre-line">
              {title}
            </h2>

            <p className="text-[#8892a4] text-[0.95rem] leading-relaxed max-w-[420px]">
              {desc}
            </p>

            <div className="flex gap-8 md:gap-10 flex-wrap">
              {shoovoStats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-[#5a6378] uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link
                href="https://shoovo.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#f47c20] text-white font-extrabold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all"
              >
                shoovo.app →
              </Link>
              <Link
                href="https://brand.shoovo.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 text-[#8892a4] font-bold text-sm hover:border-white/30 hover:text-white transition-all"
              >
                Marka Paneli
              </Link>
            </div>
          </motion.div>

          {/* Right: Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden bg-[#0c1120] border border-white/[0.06] aspect-square flex items-center justify-center"
          >
            {/* Background pattern */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(135deg, rgba(244,124,32,.06) 0%, transparent 50%),
                  repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(244,124,32,.05) 40px),
                  repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(244,124,32,.05) 40px)
                `,
              }}
            />

            {/* Wordmark */}
            <div
              className="relative z-10 text-4xl md:text-5xl font-bold tracking-tight text-[#f47c20] opacity-90"
              style={{ textShadow: "0 0 60px rgba(244,124,32,.3)" }}
            >
              shoovo
            </div>

            {/* Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#03050d]/85 backdrop-blur-[10px] border border-[#f47c20]/15 rounded-xl px-5 py-4 flex justify-between items-center text-sm z-20">
              <span className="text-[#8892a4]">Bu ay üretilen içerik</span>
              <span className="font-bold text-[#f47c20]">1.240 video ↑</span>
            </div>
          </motion.div>
        </div>

        {/* App Studio mini reference */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 pt-8 border-t border-white/[0.06]"
        >
          <p className="text-[#5a6378] text-sm font-mono mb-3">
            + Dreemart AI · Benche · Musicifal
          </p>
          <Link
            href="/app-studio"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#5a5fcf] hover:text-[#7c5cdb] transition-colors"
          >
            App Studio&apos;yu Gör →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
