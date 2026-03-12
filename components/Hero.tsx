"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ContentMap } from "@/lib/getContent";
import type { Stat } from "@/lib/getStats";

const FALLBACK_STATS = [
  { value: "200+", label: "Aktif Marka" },
  { value: "₺50M+", label: "Yönetilen Bütçe" },
  { value: "8+", label: "Yıl Deneyim" },
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

type HeroProps = {
  content?: ContentMap;
  stats?: Stat[];
};

export function Hero({ content, stats }: HeroProps) {
  const heroStats = stats?.length
    ? stats
        .filter((s) => ["brands", "budget", "years"].includes(s.key))
        .slice(0, 3)
        .map((s) => ({ value: s.value, label: s.label_tr }))
    : FALLBACK_STATS;

  const eyebrow = content?.["hero.eyebrow"] ?? "Antalya · Türkiye · Tech House";
  const title = content?.["hero.title"] ?? "Ürünler İnşa Ediyoruz.";
  const titleOutline = content?.["hero.title_outline"] ?? "Markalar Büyütüyoruz.";
  const desc = content?.["hero.desc"] ?? "Aspiyas; kendi SaaS ürünlerini geliştiren ve markalara veri odaklı dijital büyüme hizmetleri sunan bir teknoloji şirketidir.";
  const cta1 = content?.["hero.cta1"] ?? "Hizmetleri Keşfet →";
  const cta2 = content?.["hero.cta2"] ?? "Shoovo'yu Gör";

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-x-hidden flex flex-col items-start justify-center pt-24 pb-32 md:pb-24 px-6 md:px-12"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 100% 80% at 30% 40%, black, transparent 80%)",
        }}
      />

      {/* Gradient blobs */}
      <div
        className="absolute w-[600px] h-[500px] rounded-full blur-[120px] pointer-events-none -top-24 -right-12"
        style={{
          background: "rgba(90,95,207,.09)",
          animation: "float 20s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none bottom-[5%] left-[10%]"
        style={{
          background: "rgba(124,92,219,.07)",
          animation: "float 15s ease-in-out infinite alternate-reverse",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-[1200px] mx-auto w-full"
      >
        {/* Eyebrow */}
        <motion.div
          variants={item}
          className="flex items-center gap-3 mb-8 text-xs uppercase tracking-[0.1em] text-[#8892a4] font-mono"
        >
          <span className="w-6 h-px bg-[#5a5fcf]" />
          {eyebrow}
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={item}
          className="text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.93] tracking-[-0.04em] mb-8 text-white"
        >
          <span className="block">{title}</span>
          <span
            className="block text-transparent"
            style={{ WebkitTextStroke: "1.5px rgba(255,255,255,.22)" }}
          >
            {titleOutline}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={item}
          className="max-w-[440px] text-[#8892a4] text-base leading-relaxed mb-12"
        >
          {desc}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex gap-3 flex-wrap">
          <Link
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#03050d] font-extrabold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all"
          >
            {cta1}
          </Link>
          <Link
            href="#shoovo"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 text-[#8892a4] font-bold text-sm hover:border-white/30 hover:text-white transition-all"
          >
            {cta2}
          </Link>
        </motion.div>

        {/* Stats - mobilde akışta, desktop'ta sağ altta */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap gap-6 md:absolute md:bottom-10 md:right-6 md:left-auto md:mt-0 md:flex-nowrap md:gap-12"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-left md:text-right min-w-0">
              <div className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-none">
                {stat.value}
              </div>
              <div className="text-[11px] text-[#5a6378] uppercase tracking-wider mt-1 break-words">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
