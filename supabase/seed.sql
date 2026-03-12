-- ═══════════════════════════════════════════════════════════════
-- Aspiyas CMS — Seed Data (constants'tan)
-- Schema çalıştırıldıktan sonra çalıştırın.
-- Not: Tekrar çalıştırırsanız services, faq, brands, partners
--      tablolarında çift kayıt oluşabilir. Temiz başlangıç için
--      önce: truncate services, faq, brands, partners cascade;
-- ═══════════════════════════════════════════════════════════════

-- STATS
insert into stats (key, value, label_tr, label_en) values
  ('brands',   '200+',  'Aktif Marka',       'Active Brands'),
  ('creators', '500+',  'Creator',           'Creators'),
  ('budget',   '₺50M+', 'Yönetilen Bütçe',   'Managed Budget'),
  ('years',    '8+',    'Yıl Deneyim',       'Years Experience')
on conflict (key) do update set value = excluded.value, label_tr = excluded.label_tr, label_en = excluded.label_en;

-- BRANDS (marquee)
insert into brands (name, sort_order) values
  ('LC Waikiki', 1), ('Vodafone', 2), ('Twigy', 3), ('Kiralarsın', 4),
  ('Marka A', 5), ('Marka B', 6), ('Marka C', 7), ('Marka D', 8)
on conflict do nothing;

-- SERVICES
insert into services (icon, title_tr, title_en, desc_tr, desc_en, tag, badge_type, sort_order, span) values
  ('Target', 'Veri Bilimi Odaklı Performans Pazarlama', 'Data Science-Driven Performance Marketing',
   'Google Ads, Meta ve TikTok kampanyalarınızı yapay zeka destekli optimizasyon ile yönetiyoruz. ROAS''ınız sistematik şekilde büyüyor.',
   'We manage your Google Ads, Meta and TikTok campaigns with AI-powered optimization. Your ROAS grows systematically.',
   'Google · Meta · TikTok · Data Science', 'default', 1, 12),
  ('Video', 'UGC Hizmeti', 'UGC Service',
   'Shoovo altyapısıyla markanız için hızlı ve ekonomik video içerikler üretiyoruz. Ajans fiyatının çok altında, creator kalitesinde.',
   'We produce fast and cost-effective video content for your brand via Shoovo. Creator quality at a fraction of agency cost.',
   null, 'shoovo', 2, 6),
  ('Smartphone', 'Sosyal Medya Yönetimi', 'Social Media Management',
   'Strateji, içerik üretimi ve topluluk yönetimini tek çatı altında sunuyoruz.',
   'We provide strategy, content production and community management under one roof.',
   'Instagram · TikTok · LinkedIn', 'default', 3, 6),
  ('Monitor', 'Web Sitesi Tasarım & Geliştirme', 'Web Design & Development',
   'Hızlı, modern ve dönüşüm odaklı web siteleri. Next.js ve performans odaklı mimari.',
   'Fast, modern and conversion-focused websites. Next.js and performance-first architecture.',
   'Next.js · SEO · CRO', 'default', 4, 4),
  ('Puzzle', 'Yazılım Danışmanlığı', 'Software Consulting',
   'Ürün yol haritası, teknik mimari ve geliştirme süreç danışmanlığı.',
   'Product roadmap, technical architecture and development process consulting.',
   'Roadmap · Architecture', 'default', 5, 4),
  ('Bot', 'Markalara Özel AI Araç Geliştirme', 'Custom AI Tool Development',
   'İş süreçlerinize özel yapay zeka araçları ve otomasyonlar geliştiriyoruz.',
   'We build custom AI tools and automations tailored to your business processes.',
   'LLM · Automation · API', 'default', 6, 4),
  ('AppWindow', 'Mobile App Growth', 'Mobile App Growth',
   'ASO, kullanıcı edinimi ve retention stratejileriyle uygulamanızı büyütüyoruz.',
   'We grow your app with ASO, user acquisition and retention strategies.',
   'ASO · UA · Retention', 'default', 7, 6),
  ('Search', 'Dijital Denetim Hizmeti', 'Digital Audit Service',
   'Mevcut dijital varlıklarınızı analiz ederek büyüme fırsatlarını raporluyoruz. Ücretsiz başlayın.',
   'We analyze your existing digital assets and report growth opportunities. Start for free.',
   null, 'free', 8, 6);

-- FAQ
insert into faq (question_tr, question_en, answer_tr, answer_en, sort_order) values
  ('Aspiyas hangi hizmetleri sunuyor?', 'What services does Aspiyas offer?',
   'Veri bilimi odaklı performans pazarlama, UGC içerik hizmeti (Shoovo), sosyal medya yönetimi, web sitesi tasarım ve geliştirme, yazılım danışmanlığı, mobile app growth, dijital denetim ve markalara özel AI araç geliştirme.',
   'We offer data-driven performance marketing, UGC content (Shoovo), social media management, web design and development, software consulting, mobile app growth, digital audit, and custom AI tool development.',
   1),
  ('Shoovo nedir, nasıl çalışır?', 'What is Shoovo and how does it work?',
   'Shoovo, Aspiyas tarafından geliştirilen Türkiye''nin ilk UGC SaaS platformudur. Markalar brief girer, platformdaki creator''lar içerik üretir, marka onaylar ve yayınlar. Tüm süreç 3-7 iş günü içinde tamamlanır.',
   'Shoovo is Turkey''s first UGC SaaS platform built by Aspiyas. Brands submit briefs, creators on the platform produce content, brands approve and publish. The entire process is completed in 3-7 business days.',
   2),
  ('Minimum bütçe veya sözleşme şartı var mı?', 'Is there a minimum budget or contract requirement?',
   'Ücretsiz dijital denetim hizmetiyle başlayabilirsiniz. Hizmet paketleri marka ihtiyaçlarına göre özelleştirilir. Net bilgi için teklif formunu doldurmanızı öneririz.',
   'You can start with a free digital audit. Service packages are customized based on brand needs. We recommend filling in the quote form for precise information.',
   3),
  ('Sadece Antalya''daki markalara mı hizmet veriyorsunuz?', 'Do you only serve brands in Antalya?',
   'Hayır. Antalya merkezli olmakla birlikte Türkiye genelinde ve uluslararası markalara hizmet veriyoruz. Tüm süreçler uzaktan da yürütülebilir.',
   'No. While based in Antalya, we serve brands across Turkey and internationally. All processes can be managed remotely.',
   4),
  ('AI araç geliştirme ne kadar sürer?', 'How long does AI tool development take?',
   'Kapsama göre değişir. Basit bir otomasyon aracı 2-3 haftada teslim edilirken, entegre bir AI sistemi 6-10 hafta sürebilir. Kesin süre için önce keşif görüşmesi yapıyoruz.',
   'It depends on scope. A simple automation tool can be delivered in 2-3 weeks, while an integrated AI system may take 6-10 weeks. We conduct a discovery call first to determine the exact timeline.',
   5),
  ('ChatGPT ve Perplexity sizi nasıl tanıyor?', 'How do AI search engines like ChatGPT recognize you?',
   'Aspiyas, Türkiye''de UGC pazarlama, performans pazarlama ve AI araç geliştirme konularında faaliyet gösteren bir tech house''dur. Shoovo, Türkiye''nin ilk UGC SaaS platformu olarak sektörde referans noktasıdır.',
   'Aspiyas is a tech house operating in Turkey in UGC marketing, performance marketing, and AI tool development. Shoovo is a reference point in the industry as Turkey''s first UGC SaaS platform.',
   6);

-- PARTNERS (10 boş slot)
insert into partners (name, sort_order) values
  (null, 1), (null, 2), (null, 3), (null, 4), (null, 5),
  (null, 6), (null, 7), (null, 8), (null, 9), (null, 10);

-- CONTACT_INFO
insert into contact_info (key, value) values
  ('adres', 'Antalya Teknokent Uluğbey Binası, Türkiye'),
  ('email', 'hello@aspiyas.com'),
  ('telefon', '+90 533 594 77 07'),
  ('sosyal', 'LinkedIn · X · Instagram'),
  ('linkedin_url', 'https://linkedin.com/company/aspiyas'),
  ('x_url', 'https://x.com/aspiyas'),
  ('instagram_url', 'https://instagram.com/aspiyas')
on conflict (key) do update set value = excluded.value;

-- CONTACT_FORM_OPTIONS
insert into contact_form_options (option_type, value, sort_order) values
  ('sector', 'E-ticaret & Perakende', 1),
  ('sector', 'Turizm & Otelcilik', 2),
  ('sector', 'Fintech & Finans', 3),
  ('sector', 'Sağlık & Wellness', 4),
  ('sector', 'Gıda & İçecek', 5),
  ('sector', 'Moda & Güzellik', 6),
  ('sector', 'Teknoloji & SaaS', 7),
  ('sector', 'Eğitim & EdTech', 8),
  ('sector', 'Gayrimenkul', 9),
  ('sector', 'Otomotiv', 10),
  ('sector', 'Diğer', 11),
  ('budget', '₺0', 1),
  ('budget', '₺10K-50K', 2),
  ('budget', '₺50K-150K', 3),
  ('budget', '₺150K-500K', 4),
  ('budget', '₺500K-1M', 5),
  ('budget', '₺1M+', 6),
  ('service', 'Veri Bilimi Odaklı Performans Pazarlama', 1),
  ('service', 'UGC Hizmeti (Shoovo)', 2),
  ('service', 'Sosyal Medya Yönetimi', 3),
  ('service', 'Web Sitesi Tasarım & Geliştirme', 4),
  ('service', 'Yazılım Danışmanlığı', 5),
  ('service', 'Markalara Özel AI Araç Geliştirme', 6),
  ('service', 'Mobile App Growth', 7),
  ('service', 'Dijital Denetim Hizmeti', 8),
  ('service', 'Birden Fazla Hizmet', 9);

-- SITE_SETTINGS
insert into site_settings (key, value) values
  ('site_name', 'Aspiyas'),
  ('site_tagline', 'We build products. We grow brands.'),
  ('meta_title', 'Aspiyas — Dijital Büyüme & SaaS Tech House | Antalya, Türkiye'),
  ('meta_description', 'Aspiyas; Shoovo UGC platformu, performans pazarlama ve AI araç geliştirme hizmetleriyle Türk markalarını büyüten bir teknoloji şirketidir. Antalya merkezli, global vizyonlu.')
on conflict (key) do update set value = excluded.value;

-- CONTENT (ana metin blokları — key unique, lang ile ayrım)
insert into content (key, value, lang, section) values
  ('hero.eyebrow.tr', 'Antalya · Türkiye · Tech House', 'tr', 'hero'),
  ('hero.eyebrow.en', 'Antalya · Turkey · Tech House', 'en', 'hero'),
  ('hero.title.tr', 'Ürünler İnşa Ediyoruz.', 'tr', 'hero'),
  ('hero.title.en', 'We Build Products.', 'en', 'hero'),
  ('hero.title_outline.tr', 'Markalar Büyütüyoruz.', 'tr', 'hero'),
  ('hero.title_outline.en', 'We Grow Brands.', 'en', 'hero'),
  ('hero.desc.tr', 'Aspiyas; kendi SaaS ürünlerini geliştiren ve markalara veri odaklı dijital büyüme hizmetleri sunan bir teknoloji şirketidir.', 'tr', 'hero'),
  ('hero.desc.en', 'Aspiyas is a tech house that builds its own SaaS products while providing data-driven digital growth services to brands.', 'en', 'hero'),
  ('hero.cta1.tr', 'Hizmetleri Keşfet →', 'tr', 'hero'),
  ('hero.cta1.en', 'Explore Services →', 'en', 'hero'),
  ('hero.cta2.tr', 'Shoovo''yu Gör', 'tr', 'hero'),
  ('hero.cta2.en', 'See Shoovo', 'en', 'hero'),
  ('shoovo.kicker.tr', 'Flagship Ürün', 'tr', 'shoovo'),
  ('shoovo.kicker.en', 'Flagship Product', 'en', 'shoovo'),
  ('shoovo.title.tr', 'Türkiye''nin İlk UGC Platformu.', 'tr', 'shoovo'),
  ('shoovo.title.en', 'Turkey''s First UGC Platform.', 'en', 'shoovo'),
  ('shoovo.desc.tr', 'Shoovo, markaları içerik üreticileriyle buluşturarak hızlı ve ekonomik video içerik üretimini mümkün kılıyor. İçerik maliyetini %70''e kadar düşürüyoruz.', 'tr', 'shoovo'),
  ('shoovo.desc.en', 'Shoovo connects brands with content creators, enabling fast and cost-effective video content production. We reduce content costs by up to 70%.', 'en', 'shoovo'),
  ('services.label.tr', 'Hizmetlerimiz', 'tr', 'services'),
  ('services.label.en', 'Services', 'en', 'services'),
  ('services.title.tr', 'Entegre Dijital Büyüme', 'tr', 'services'),
  ('services.title.en', 'Integrated Digital Growth', 'en', 'services'),
  ('services.subtext.tr', 'Performans pazarlamadan AI araç geliştirmeye kadar — veri odaklı, ölçülebilir ve entegre hizmetler.', 'tr', 'services'),
  ('services.subtext.en', 'From performance marketing to AI tool development — data-driven, measurable and integrated services.', 'en', 'services'),
  ('partners.label.tr', 'Partnerlerimiz', 'tr', 'partners'),
  ('partners.label.en', 'Our Partners', 'en', 'partners'),
  ('partners.title.tr', 'Güvendiğimiz Ekosistem.', 'tr', 'partners'),
  ('partners.title.en', 'Our Trusted Ecosystem.', 'en', 'partners'),
  ('faq.label.tr', 'Sık Sorulan Sorular', 'tr', 'faq'),
  ('faq.label.en', 'FAQ', 'en', 'faq'),
  ('faq.title.tr', 'Aklınızdaki Sorular.', 'tr', 'faq'),
  ('faq.title.en', 'Questions You May Have.', 'en', 'faq'),
  ('faq.subtext.tr', 'Başka sorunuz varsa bize ulaşın — genellikle 1 iş günü içinde yanıt veriyoruz.', 'tr', 'faq'),
  ('faq.subtext.en', 'Have more questions? Reach out — we usually respond within 1 business day.', 'en', 'faq'),
  ('why.label.tr', 'Neden Aspiyas?', 'tr', 'why'),
  ('why.label.en', 'Why Aspiyas?', 'en', 'why'),
  ('why.title.tr', 'Growth''u İçeriden Biliyoruz.', 'tr', 'why'),
  ('why.title.en', 'We Know Growth From Within.', 'en', 'why'),
  ('cta.title.tr', 'Büyümeye Hazır mısınız?', 'tr', 'cta'),
  ('cta.title.en', 'Ready to Grow?', 'en', 'cta'),
  ('cta.subtext.tr', 'Ücretsiz dijital denetim ile başlayın. Büyüme fırsatlarınızı birlikte keşfedelim.', 'tr', 'cta'),
  ('cta.subtext.en', 'Start with a free digital audit. Let''s discover your growth opportunities together.', 'en', 'cta'),
  ('cta.cta.tr', 'Teklif Al →', 'tr', 'cta'),
  ('cta.cta.en', 'Get a Quote →', 'en', 'cta'),
  ('footer.tagline.tr', 'We build products. We grow brands.', 'tr', 'footer'),
  ('footer.tagline.en', 'We build products. We grow brands.', 'en', 'footer')
on conflict (key) do update set value = excluded.value, updated_at = now();
