-- ═══════════════════════════════════════════════════════════════
-- Auth users trigger hatasını düzelt
-- "Database error creating new user" hatası profiles tablosu
-- yokken trigger'ın insert yapmaya çalışmasından kaynaklanır.
-- ═══════════════════════════════════════════════════════════════

-- Seçenek A: Trigger'ı kaldır (profiles kullanmayacaksanız)
-- Aşağıdaki satırları çalıştırın:

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS handle_new_user ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
