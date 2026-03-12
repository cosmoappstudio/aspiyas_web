"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FaqItem } from "@/constants/faq";

interface FAQProps {
  items: FaqItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="bg-[#070b17] border-t border-white/[0.06]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          {/* Intro - sticky on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-4">
              Sık Sorulan Sorular
              <span className="w-7 h-px bg-[#5a5fcf]" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white mb-4">
              Aklınızdaki
              <br />
              Sorular.
            </h2>
            <p className="text-[#8892a4] text-sm md:text-base leading-relaxed">
              Başka sorunuz varsa bize ulaşın — genellikle 1 iş günü içinde
              yanıt veriyoruz.
            </p>
          </motion.div>

          {/* FAQ list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border-t border-white/[0.06]"
          >
            {items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="border-b border-white/[0.06]"
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="w-full text-left py-6 flex justify-between items-center gap-4 font-bold text-sm md:text-base text-white hover:text-white/80 transition-colors"
                  >
                    <span>{item.question_tr}</span>
                    <motion.span
                      className="text-[#5a6378] text-sm font-mono flex-shrink-0"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-sm text-[#8892a4] leading-relaxed pr-8">
                          {item.answer_tr}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
