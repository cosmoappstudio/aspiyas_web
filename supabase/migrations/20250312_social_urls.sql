-- Sosyal medya URL'leri (footer ikonları için)
insert into contact_info (key, value) values
  ('linkedin_url', 'https://linkedin.com/company/aspiyas'),
  ('x_url', 'https://x.com/aspiyas'),
  ('instagram_url', 'https://instagram.com/aspiyas')
on conflict (key) do update set value = excluded.value;
