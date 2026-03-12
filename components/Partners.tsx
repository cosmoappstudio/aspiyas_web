"use client";

import { motion } from "framer-motion";
import type { ContentMap } from "@/lib/getContent";
import type { Partner } from "@/lib/getPartners";
import { tr } from "@/lib/translations";
import type { Locale } from "@/lib/i18n";

type PartnersProps = {
  content?: ContentMap;
  partners: Partner[];
  locale?: Locale;
};

export function Partners({ content, partners, locale = "tr" }: PartnersProps) {
  const label = content?.["partners.label"] ?? (locale === "en" ? "Our Partners" : "Partnerlerimiz");
  const title = content?.["partners.title"] ?? (locale === "en" ? "Our Trusted Ecosystem." : "Güvendiğimiz Ekosistem.");

  // Pad to 10 slots for grid layout
  const slots = [...partners];
  while (slots.length < 10) {
    slots.push({
      id: `empty-${slots.length}`,
      name: null,
      logo_url: null,
      sort_order: slots.length,
    });
  }

  return (
    <section
      id="partners"
      className="bg-[#03050d] border-t border-white/[0.06]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-4">
              {label}
              <span className="w-7 h-px bg-[#5a5fcf]" />
            </div>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white whitespace-pre-line">
              {title}
            </h2>
          </div>
          <p className="text-[#8892a4] text-sm md:text-base leading-relaxed max-w-[320px]">
            {tr("partners", "subtext", locale)}
          </p>
        </motion.div>

        {/* Grid - 5x2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden"
        >
          {slots.slice(0, 10).map((partner) => (
            <div
              key={partner.id}
              className="aspect-[3/2] flex items-center justify-center relative overflow-hidden group bg-[#070b17]"
            >
              {partner.logo_url ? (
                <img
                  src={partner.logo_url}
                  alt={partner.name ?? "Partner logo"}
                  className="max-w-[65%] max-h-[50%] object-contain brightness-0 invert opacity-35 group-hover:opacity-60 transition-opacity"
                />
              ) : (
                <div className="w-7 h-7 rounded-lg border border-dashed border-white/20 flex items-center justify-center text-[#5a6378] text-sm opacity-40">
                  +
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
