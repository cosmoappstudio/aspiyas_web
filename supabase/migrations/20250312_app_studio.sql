-- App Studio CMS tabloları ve içerik

-- Ne Yapıyoruz kartları
create table if not exists app_studio_what (
  id uuid primary key default gen_random_uuid(),
  title_tr text not null,
  title_en text not null,
  desc_tr text not null,
  desc_en text not null,
  sort_order int default 0,
  is_active bool default true,
  updated_at timestamptz default now()
);

-- Süreç adımları (Fikir → Canlı)
create table if not exists app_studio_how (
  id uuid primary key default gen_random_uuid(),
  num text not null,
  title_tr text not null,
  title_en text not null,
  desc_tr text not null,
  desc_en text not null,
  sort_order int default 0,
  is_active bool default true,
  updated_at timestamptz default now()
);

alter table app_studio_what enable row level security;
alter table app_studio_how enable row level security;

create policy "public_read_app_studio_what" on app_studio_what for select using (true);
create policy "public_read_app_studio_how" on app_studio_how for select using (true);
create policy "auth_write_app_studio_what" on app_studio_what for all using (auth.role() = 'authenticated');
create policy "auth_write_app_studio_how" on app_studio_how for all using (auth.role() = 'authenticated');

-- App Studio content keys
insert into content (key, value, lang, section) values
  ('app_studio.label.tr', 'ASP App Studio', 'tr', 'app_studio'),
  ('app_studio.label.en', 'ASP App Studio', 'en', 'app_studio'),
  ('app_studio.hero.title1.tr', 'Fikri Ürüne', 'tr', 'app_studio'),
  ('app_studio.hero.title1.en', 'From Idea to', 'en', 'app_studio'),
  ('app_studio.hero.title2.tr', 'Dönüştürüyoruz.', 'tr', 'app_studio'),
  ('app_studio.hero.title2.en', 'Product.', 'en', 'app_studio'),
  ('app_studio.hero.subtitle.tr', 'Markanıza özel dijital ürünler, AI araçlar ve mobil uygulamalar geliştiriyoruz. Fikir aşamasından canlıya kadar uçtan uca.', 'tr', 'app_studio'),
  ('app_studio.hero.subtitle.en', 'We build custom digital products, AI tools and mobile apps for your brand. End-to-end from concept to launch.', 'en', 'app_studio'),
  ('app_studio.hero.cta1.tr', 'Projeyi Konuşalım →', 'tr', 'app_studio'),
  ('app_studio.hero.cta1.en', 'Let''s Talk Project →', 'en', 'app_studio'),
  ('app_studio.hero.cta2.tr', 'Portföy Gör', 'tr', 'app_studio'),
  ('app_studio.hero.cta2.en', 'View Portfolio', 'en', 'app_studio'),
  ('app_studio.what.label.tr', 'Ne Yapıyoruz', 'tr', 'app_studio'),
  ('app_studio.what.label.en', 'What We Do', 'en', 'app_studio'),
  ('app_studio.what.title.tr', 'Sadece Kod Yazmıyoruz.', 'tr', 'app_studio'),
  ('app_studio.what.title.en', 'We Don''t Just Write Code.', 'en', 'app_studio'),
  ('app_studio.what.desc1.tr', 'Her dijital ürün bir iş sorununu çözüyor olmalı. Bu yüzden geliştirmeye başlamadan önce problemi, kullanıcıyı ve büyüme modelini birlikte tanımlıyoruz.', 'tr', 'app_studio'),
  ('app_studio.what.desc1.en', 'Every digital product should solve a business problem. That''s why we define the problem, user and growth model together before we start building.', 'en', 'app_studio'),
  ('app_studio.what.desc2.tr', 'Shoovo, Dreemart ve Benche — kendi ürünlerimizi inşa ederek kazandığımız deneyimi müşteri projelerine taşıyoruz.', 'tr', 'app_studio'),
  ('app_studio.what.desc2.en', 'Shoovo, Dreemart and Benche — we bring the experience from building our own products to client projects.', 'en', 'app_studio'),
  ('app_studio.what.cta.tr', 'İletişime Geç →', 'tr', 'app_studio'),
  ('app_studio.what.cta.en', 'Get in Touch →', 'en', 'app_studio'),
  ('app_studio.how.label.tr', 'Sürecimiz', 'tr', 'app_studio'),
  ('app_studio.how.label.en', 'Our Process', 'en', 'app_studio'),
  ('app_studio.how.title.tr', 'Fikir → Canlı', 'tr', 'app_studio'),
  ('app_studio.how.title.en', 'Idea → Live', 'en', 'app_studio'),
  ('app_studio.cta.label.tr', 'Proje Başlat', 'tr', 'app_studio'),
  ('app_studio.cta.label.en', 'Start Project', 'en', 'app_studio'),
  ('app_studio.cta.title.tr', 'Bir Fikrin mi Var?', 'tr', 'app_studio'),
  ('app_studio.cta.title.en', 'Got an Idea?', 'en', 'app_studio'),
  ('app_studio.cta.subtext.tr', 'Konsepten canlıya — ürününüzü birlikte inşa edelim.', 'tr', 'app_studio'),
  ('app_studio.cta.subtext.en', 'From concept to launch — let''s build your product together.', 'en', 'app_studio'),
  ('app_studio.cta.cta1.tr', 'Projeyi Anlat →', 'tr', 'app_studio'),
  ('app_studio.cta.cta1.en', 'Tell Us Your Project →', 'en', 'app_studio'),
  ('app_studio.cta.cta2.tr', 'Fiyat Sor', 'tr', 'app_studio'),
  ('app_studio.cta.cta2.en', 'Ask for Quote', 'en', 'app_studio')
on conflict (key) do update set value = excluded.value, updated_at = now();

-- Ne Yapıyoruz kartları
insert into app_studio_what (title_tr, title_en, desc_tr, desc_en, sort_order) values
  ('SaaS Ürün Geliştirme', 'SaaS Product Development', 'Fikir → MVP → lansman. Next.js, Supabase, Stripe/LemonSqueezy entegrasyonlu tam ürün.', 'Idea → MVP → launch. Full product with Next.js, Supabase, Stripe/LemonSqueezy integration.', 1),
  ('Mobil Uygulama', 'Mobile App', 'React Native ile iOS & Android. RevenueCat abonelik, App Store yayın süreçleri.', 'iOS & Android with React Native. RevenueCat subscriptions, App Store publishing.', 2),
  ('Markalara Özel AI Araçlar', 'Custom AI Tools', 'LLM entegrasyonu, otomasyon workflow''ları, dahili AI asistanlar. Rakiplerinizden önce.', 'LLM integration, automation workflows, internal AI assistants. Stay ahead of competitors.', 3),
  ('Web Uygulama & Dashboard', 'Web App & Dashboard', 'Admin paneller, analitik dashboard''lar, müşteri portalleri. Tam yetki, tam mülkiyet.', 'Admin panels, analytics dashboards, customer portals. Full control, full ownership.', 4);

-- Süreç adımları
insert into app_studio_how (num, title_tr, title_en, desc_tr, desc_en, sort_order) values
  ('01', 'Problem Tanımı', 'Problem Definition', 'Çözdüğümüz problemi, hedef kullanıcıyı ve başarı kriterlerini netleştiriyoruz.', 'We clarify the problem we solve, target user and success criteria.', 1),
  ('02', 'Mimari & Tasarım', 'Architecture & Design', 'Tech stack, veri modeli ve UI/UX tasarımı. Geliştirmeden önce tam plan.', 'Tech stack, data model and UI/UX design. Full plan before development.', 2),
  ('03', 'MVP Geliştirme', 'MVP Development', 'Hızlı iterasyon. İlk çalışan versiyon 4-8 haftada hazır.', 'Fast iteration. First working version ready in 4-8 weeks.', 3),
  ('04', 'Lansman', 'Launch', 'App Store yayını, domain kurulumu, test & QA.', 'App Store release, domain setup, test & QA.', 4),
  ('05', 'Growth', 'Growth', 'Kullanıcı edinimi, retention ve sürekli geliştirme. Ürün bitmiyor, büyüyor.', 'User acquisition, retention and continuous improvement. The product keeps growing.', 5);
