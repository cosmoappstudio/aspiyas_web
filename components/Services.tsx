"use client";

import {
  Target,
  Video,
  Smartphone,
  Monitor,
  Puzzle,
  Bot,
  AppWindow,
  Search,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ContentMap } from "@/lib/getContent";
import type { SerializableService } from "@/lib/getServices";
import { tr } from "@/lib/translations";
import type { Locale } from "@/lib/i18n";

const ICON_MAP: Record<string, LucideIcon> = {
  Target,
  Video,
  Smartphone,
  Monitor,
  Puzzle,
  Bot,
  AppWindow,
  Search,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

type ServicesProps = {
  content?: ContentMap;
  services: SerializableService[];
  locale?: Locale;
};

export function Services({ content, services: serviceList, locale = "tr" }: ServicesProps) {
  const label = content?.["services.label"] ?? "Hizmetlerimiz";
  const title = content?.["services.title"] ?? "Entegre Dijital Büyüme";
  const subtext = content?.["services.subtext"] ?? "Performans pazarlamadan AI araç geliştirmeye kadar — veri odaklı, ölçülebilir ve entegre hizmetler.";

  return (
    <section id="services" className="bg-[#03050d]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-16"
        >
          <div>
            <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-4">
              {label}
              <span className="w-7 h-px bg-[#5a5fcf]" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white whitespace-pre-line">
              {title}
            </h2>
          </div>
          <p className="text-[#8892a4] text-sm md:text-base leading-relaxed max-w-[360px]">
            {subtext}
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-12 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden"
        >
          {serviceList.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? Target;
            return (
              <motion.div
                key={service.title}
                variants={item}
                className={cn(
                  "bg-[#070b17] p-6 md:p-9 relative overflow-hidden transition-colors duration-250 hover:bg-[#0c1120] group",
                  service.span === 12 && "col-span-12",
                  service.span === 6 && "col-span-12 md:col-span-6",
                  service.span === 4 && "col-span-12 md:col-span-4"
                )}
              >
                {service.span === 12 ? (
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-10 items-center">
                    <div>
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/[0.06] flex items-center justify-center mb-7">
                        <Icon className="w-4 h-4 text-white/70" />
                      </div>
                      <h3 className="text-base md:text-lg font-bold tracking-tight text-white mb-2.5 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-[13px] md:text-sm text-[#8892a4] leading-relaxed mb-6">
                        {service.description}
                      </p>
                      {service.tag && (
                        <span className="inline-flex text-[10px] font-mono uppercase tracking-wider text-[#5a6378] px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded">
                          {service.tag}
                        </span>
                      )}
                    </div>
                    {service.visual === "ROAS↑" ? (
                      <div className="bg-[#0c1120] border border-white/[0.06] rounded-xl p-6 flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#5a5fcf]/20 border border-[#5a5fcf]/30 flex items-center justify-center">
                              <BarChart3 className="w-4 h-4 text-[#5a5fcf]" />
                            </div>
                            <span className="text-[11px] font-mono text-[#5a6378] tracking-wider">
                              {tr("services", "roasLabel", locale)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#5a6378]">
                            <TrendingUp className="w-3.5 h-3.5 text-[#4ade80]" />
                            <span>{tr("services", "dataDriven", locale)}</span>
                          </div>
                        </div>
                        <div className="h-[72px] w-full">
                          <svg viewBox="0 0 200 72" className="w-full h-full" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="roas-line-fill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(90,95,207,0.25)" />
                                <stop offset="100%" stopColor="rgba(90,95,207,0)" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M 0 43.2 L 33.3 28.8 L 66.6 36 L 100 18 L 133.3 25.2 L 166.6 10.8 L 200 0 L 200 72 L 0 72 Z"
                              fill="url(#roas-line-fill)"
                            />
                            <path
                              d="M 0 43.2 L 33.3 28.8 L 66.6 36 L 100 18 L 133.3 25.2 L 166.6 10.8 L 200 0"
                              fill="none"
                              stroke="rgba(124,92,219,0.9)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex items-end justify-between pt-1 border-t border-white/[0.06]">
                          <div>
                            <span className="text-2xl font-bold text-white">×4.8</span>
                            <span className="text-sm font-normal text-[#8892a4] ml-1.5">
                              {tr("services", "avgRoas", locale)}
                            </span>
                          </div>
                          <div className="flex gap-3 text-[10px] font-mono text-[#5a6378] uppercase tracking-wider">
                            <span>{tr("services", "strategy", locale)}</span>
                            <span>•</span>
                            <span>Growth</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl aspect-video flex items-center justify-center">
                        <span className="text-3xl md:text-4xl font-bold tracking-tight text-white/[0.06]">
                          {service.visual}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/[0.06] flex items-center justify-center mb-7">
                      <Icon className="w-4 h-4 text-white/70" />
                    </div>
                    <h3 className="text-base font-bold tracking-tight text-white mb-2.5 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-[13px] text-[#8892a4] leading-relaxed mb-4">
                      {service.description}
                    </p>
                    {service.tag && (
                      <span className="inline-flex text-[10px] font-mono uppercase tracking-wider text-[#5a6378] px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded mt-2">
                        {service.tag}
                      </span>
                    )}
                    {service.badgeType === "shoovo" && (
                      <span className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-bold uppercase tracking-wider text-[#f47c20] bg-[#f47c20]/7 border border-[#f47c20]/20 rounded-md px-2.5 py-1 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f47c20]" />
                        Shoovo Powered
                      </span>
                    )}
                    {service.badgeType === "free" && (
                      <span className="inline-flex mt-4 text-[11px] font-bold uppercase tracking-wider text-[#4ade80] bg-[#4ade80]/7 border border-[#4ade80]/15 rounded-md px-2.5 py-1 font-mono">
                        {tr("services", "freeStart", locale)}
                      </span>
                    )}
                  </>
                )}

                {/* Arrow */}
                <span className="absolute top-8 right-8 text-sm text-[#5a6378] opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
                  ↗
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
