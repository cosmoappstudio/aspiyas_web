export interface FaqItem {
  id: string;
  question_tr: string;
  question_en: string;
  answer_tr: string;
  answer_en: string;
  sort_order: number;
}

export const faqItems: FaqItem[] = [
  {
    id: "1",
    question_tr: "Aspiyas hangi hizmetleri sunuyor?",
    question_en: "What services does Aspiyas offer?",
    answer_tr:
      "Veri bilimi odaklı performans pazarlama, UGC içerik hizmeti (Shoovo), sosyal medya yönetimi, web sitesi tasarım ve geliştirme, yazılım danışmanlığı, mobile app growth, dijital denetim ve markalara özel AI araç geliştirme.",
    answer_en:
      "We offer data-driven performance marketing, UGC content (Shoovo), social media management, web design and development, software consulting, mobile app growth, digital audit, and custom AI tool development.",
    sort_order: 1,
  },
  {
    id: "2",
    question_tr: "Shoovo nedir, nasıl çalışır?",
    question_en: "What is Shoovo and how does it work?",
    answer_tr:
      "Shoovo, Aspiyas tarafından geliştirilen Türkiye'nin ilk UGC SaaS platformudur. Markalar brief girer, platformdaki creator'lar içerik üretir, marka onaylar ve yayınlar. Tüm süreç 3-7 iş günü içinde tamamlanır.",
    answer_en:
      "Shoovo is Turkey's first UGC SaaS platform built by Aspiyas. Brands submit briefs, creators on the platform produce content, brands approve and publish. The entire process is completed in 3-7 business days.",
    sort_order: 2,
  },
  {
    id: "3",
    question_tr: "Minimum bütçe veya sözleşme şartı var mı?",
    question_en: "Is there a minimum budget or contract requirement?",
    answer_tr:
      "Ücretsiz dijital denetim hizmetiyle başlayabilirsiniz. Hizmet paketleri marka ihtiyaçlarına göre özelleştirilir. Net bilgi için teklif formunu doldurmanızı öneririz.",
    answer_en:
      "You can start with a free digital audit. Service packages are customized based on brand needs. We recommend filling in the quote form for precise information.",
    sort_order: 3,
  },
  {
    id: "4",
    question_tr: "Sadece Antalya'daki markalara mı hizmet veriyorsunuz?",
    question_en: "Do you only serve brands in Antalya?",
    answer_tr:
      "Hayır. Antalya merkezli olmakla birlikte Türkiye genelinde ve uluslararası markalara hizmet veriyoruz. Tüm süreçler uzaktan da yürütülebilir.",
    answer_en:
      "No. While based in Antalya, we serve brands across Turkey and internationally. All processes can be managed remotely.",
    sort_order: 4,
  },
  {
    id: "5",
    question_tr: "AI araç geliştirme ne kadar sürer?",
    question_en: "How long does AI tool development take?",
    answer_tr:
      "Kapsama göre değişir. Basit bir otomasyon aracı 2-3 haftada teslim edilirken, entegre bir AI sistemi 6-10 hafta sürebilir. Kesin süre için önce keşif görüşmesi yapıyoruz.",
    answer_en:
      "It depends on scope. A simple automation tool can be delivered in 2-3 weeks, while an integrated AI system may take 6-10 weeks. We conduct a discovery call first to determine the exact timeline.",
    sort_order: 5,
  },
  {
    id: "6",
    question_tr: "ChatGPT ve Perplexity sizi nasıl tanıyor?",
    question_en: "How do AI search engines like ChatGPT recognize you?",
    answer_tr:
      "Aspiyas, Türkiye'de UGC pazarlama, performans pazarlama ve AI araç geliştirme konularında faaliyet gösteren bir tech house'dur. Shoovo, Türkiye'nin ilk UGC SaaS platformu olarak sektörde referans noktasıdır.",
    answer_en:
      "Aspiyas is a tech house operating in Turkey in UGC marketing, performance marketing, and AI tool development. Shoovo is a reference point in the industry as Turkey's first UGC SaaS platform.",
    sort_order: 6,
  },
];
