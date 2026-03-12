-- ═══════════════════════════════════════════════════════════════
-- Aspiyas CMS — Supabase Schema
-- Supabase SQL Editor'da çalıştırın
-- ═══════════════════════════════════════════════════════════════

-- İçerik tablosu (tüm metin blokları, TR/EN)
create table if not exists content (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value text not null,
  lang text not null default 'tr',
  section text not null,
  updated_at timestamptz default now()
);

-- Hizmet kartları
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  icon text not null,
  title_tr text not null,
  title_en text not null,
  desc_tr text not null,
  desc_en text not null,
  tag text,
  badge_type text default 'default',
  sort_order int default 0,
  span int default 4,
  is_active bool default true,
  updated_at timestamptz default now()
);

-- SSS
create table if not exists faq (
  id uuid primary key default gen_random_uuid(),
  question_tr text not null,
  question_en text not null,
  answer_tr text not null,
  answer_en text not null,
  sort_order int default 0,
  is_active bool default true,
  updated_at timestamptz default now()
);

-- Referans markaları (marquee)
create table if not exists brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  sort_order int default 0,
  is_active bool default true,
  updated_at timestamptz default now()
);

-- Partner logoları (ana sayfa partners bölümü)
create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text,
  logo_url text,
  sort_order int default 0,
  is_active bool default true,
  updated_at timestamptz default now()
);

-- İstatistikler
create table if not exists stats (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value text not null,
  label_tr text not null,
  label_en text not null,
  updated_at timestamptz default now()
);

-- İletişim bilgileri (adres, email, telefon, sosyal)
create table if not exists contact_info (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value text not null,
  updated_at timestamptz default now()
);

-- İletişim formu seçenekleri (sektör, bütçe, hizmet)
create table if not exists contact_form_options (
  id uuid primary key default gen_random_uuid(),
  option_type text not null,
  value text not null,
  sort_order int default 0,
  updated_at timestamptz default now()
);

-- Site ayarları (logo, favicon, site adı vb.)
create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value text not null,
  updated_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- RLS: Public okuma, authenticated yazma
-- ═══════════════════════════════════════════════════════════════

alter table content enable row level security;
alter table services enable row level security;
alter table faq enable row level security;
alter table brands enable row level security;
alter table partners enable row level security;
alter table stats enable row level security;
alter table contact_info enable row level security;
alter table contact_form_options enable row level security;
alter table site_settings enable row level security;

-- Public read
create policy "public_read_content" on content for select using (true);
create policy "public_read_services" on services for select using (true);
create policy "public_read_faq" on faq for select using (true);
create policy "public_read_brands" on brands for select using (true);
create policy "public_read_partners" on partners for select using (true);
create policy "public_read_stats" on stats for select using (true);
create policy "public_read_contact_info" on contact_info for select using (true);
create policy "public_read_contact_form_options" on contact_form_options for select using (true);
create policy "public_read_site_settings" on site_settings for select using (true);

-- Auth write
create policy "auth_write_content" on content for all using (auth.role() = 'authenticated');
create policy "auth_write_services" on services for all using (auth.role() = 'authenticated');
create policy "auth_write_faq" on faq for all using (auth.role() = 'authenticated');
create policy "auth_write_brands" on brands for all using (auth.role() = 'authenticated');
create policy "auth_write_partners" on partners for all using (auth.role() = 'authenticated');
create policy "auth_write_stats" on stats for all using (auth.role() = 'authenticated');
create policy "auth_write_contact_info" on contact_info for all using (auth.role() = 'authenticated');
create policy "auth_write_contact_form_options" on contact_form_options for all using (auth.role() = 'authenticated');
create policy "auth_write_site_settings" on site_settings for all using (auth.role() = 'authenticated');
