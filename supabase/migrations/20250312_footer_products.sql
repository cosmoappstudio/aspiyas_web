-- Footer ürünleri (ad + App Store / URL)

create table if not exists footer_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  sort_order int default 0,
  is_active bool default true,
  updated_at timestamptz default now()
);

alter table footer_products enable row level security;

create policy "public_read_footer_products" on footer_products for select using (true);
create policy "auth_write_footer_products" on footer_products for all using (auth.role() = 'authenticated');

insert into footer_products (name, url, sort_order) values
  ('Shoovo', 'https://shoovo.app', 1),
  ('Dreemart', '#', 2),
  ('Benche', '#', 3),
  ('Musicifal', '#', 4);
