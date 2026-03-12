-- ═══════════════════════════════════════════════════════════════
-- Duplicate kayıtları temizle (seed tekrar çalıştırıldığında)
-- Supabase SQL Editor'da çalıştırın
-- ═══════════════════════════════════════════════════════════════

-- BRANDS: Aynı (name, sort_order) için tek kayıt kalsın
DELETE FROM brands a
USING brands b
WHERE a.id > b.id AND a.name = b.name AND a.sort_order = b.sort_order;

-- SERVICES: Aynı (title_tr, sort_order) için tek kayıt kalsın
DELETE FROM services a
USING services b
WHERE a.id > b.id AND a.title_tr = b.title_tr AND a.sort_order = b.sort_order;

-- FAQ: Aynı (question_tr, sort_order) için tek kayıt kalsın
DELETE FROM faq a
USING faq b
WHERE a.id > b.id AND a.question_tr = b.question_tr AND a.sort_order = b.sort_order;

-- PARTNERS: Aynı sort_order için tek kayıt kalsın (en küçük id)
DELETE FROM partners a
USING partners b
WHERE a.id > b.id AND a.sort_order = b.sort_order;

-- CONTACT_FORM_OPTIONS: Aynı (option_type, value) için tek kayıt kalsın
DELETE FROM contact_form_options a
USING contact_form_options b
WHERE a.id > b.id AND a.option_type = b.option_type AND a.value = b.value;
