-- Supabase Storage: partners bucket (logo yüklemeleri için)
-- Supabase SQL Editor'da çalıştırın

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'partners',
  'partners',
  true,
  1048576,  -- 1MB
  array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
)
on conflict (id) do nothing;

-- Public read
create policy "public_read_partners"
on storage.objects for select
using (bucket_id = 'partners');

-- Authenticated upload (admin)
create policy "auth_upload_partners"
on storage.objects for insert
with check (bucket_id = 'partners' and auth.role() = 'authenticated');

-- Authenticated update/delete
create policy "auth_update_partners"
on storage.objects for update
using (bucket_id = 'partners' and auth.role() = 'authenticated');

create policy "auth_delete_partners"
on storage.objects for delete
using (bucket_id = 'partners' and auth.role() = 'authenticated');
