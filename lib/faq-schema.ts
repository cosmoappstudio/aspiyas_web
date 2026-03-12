import type { FaqItem } from "@/constants/faq";

/**
 * FAQ verilerinden FAQPage JSON-LD schema üretir.
 * GEO / AI search optimizasyonu için.
 */
export function buildFaqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question" as const,
      name: item.question_tr,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.answer_tr,
      },
    })),
  };
}
