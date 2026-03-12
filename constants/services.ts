import type { LucideIcon } from "lucide-react";
import {
  Target,
  Video,
  Smartphone,
  Monitor,
  Puzzle,
  Bot,
  AppWindow,
  Search,
} from "lucide-react";

export type BadgeType = "default" | "shoovo" | "free";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  tag?: string;
  badgeType?: BadgeType;
  span: 4 | 6 | 12;
  visual?: string;
}

export const services: Service[] = [
  {
    icon: Target,
    title: "Veri Bilimi Odaklı Performans Pazarlama",
    description:
      "Google Ads, Meta ve TikTok kampanyalarınızı yapay zeka destekli optimizasyon ile yönetiyoruz. ROAS'ınız sistematik şekilde büyüyor.",
    tag: "Google · Meta · TikTok · Data Science",
    span: 12,
    visual: "ROAS↑",
  },
  {
    icon: Video,
    title: "UGC Hizmeti",
    description:
      "Shoovo altyapısıyla markanız için hızlı ve ekonomik video içerikler üretiyoruz. Ajans fiyatının çok altında, creator kalitesinde.",
    badgeType: "shoovo",
    span: 6,
  },
  {
    icon: Smartphone,
    title: "Sosyal Medya Yönetimi",
    description:
      "Strateji, içerik üretimi ve topluluk yönetimini tek çatı altında sunuyoruz.",
    tag: "Instagram · TikTok · LinkedIn",
    span: 6,
  },
  {
    icon: Monitor,
    title: "Web Sitesi Tasarım & Geliştirme",
    description:
      "Hızlı, modern ve dönüşüm odaklı web siteleri. Next.js ve performans odaklı mimari.",
    tag: "Next.js · SEO · CRO",
    span: 4,
  },
  {
    icon: Puzzle,
    title: "Yazılım Danışmanlığı",
    description:
      "Ürün yol haritası, teknik mimari ve geliştirme süreç danışmanlığı.",
    tag: "Roadmap · Architecture",
    span: 4,
  },
  {
    icon: Bot,
    title: "Markalara Özel AI Araç Geliştirme",
    description:
      "İş süreçlerinize özel yapay zeka araçları ve otomasyonlar geliştiriyoruz.",
    tag: "LLM · Automation · API",
    span: 4,
  },
  {
    icon: AppWindow,
    title: "Mobile App Growth",
    description:
      "ASO, kullanıcı edinimi ve retention stratejileriyle uygulamanızı büyütüyoruz.",
    tag: "ASO · UA · Retention",
    span: 6,
  },
  {
    icon: Search,
    title: "Dijital Denetim Hizmeti",
    description:
      "Mevcut dijital varlıklarınızı analiz ederek büyüme fırsatlarını raporluyoruz. Ücretsiz başlayın.",
    badgeType: "free",
    span: 6,
  },
];
