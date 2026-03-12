-- SEO ve favicon için site_settings alanları
insert into site_settings (key, value) values
  ('meta_title', 'Aspiyas — Dijital Büyüme & SaaS Tech House | Antalya, Türkiye'),
  ('meta_description', 'Aspiyas; Shoovo UGC platformu, performans pazarlama ve AI araç geliştirme hizmetleriyle Türk markalarını büyüten bir teknoloji şirketidir. Antalya merkezli, global vizyonlu.')
on conflict (key) do nothing;
