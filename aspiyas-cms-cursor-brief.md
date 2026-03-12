# Aspiyas CMS — Cursor Brief
## Supabase Auth + İçerik Yönetim Paneli

---

## 1. GENEL MİMARİ

```
Ziyaretçi → aspiyas.com (Next.js, public)
Admin      → aspiyas.com/admin (korumalı, Supabase auth)
İçerik     → Supabase DB → API → sayfa render
```

Tüm site metinleri, butonlar, SSS, referans markaları ve istatistikler Supabase'de tutulur. Admin panelden değiştirilir, site anında güncellenir.

---

## 2. SUPABASE KURULUM

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

`.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

---

## 3. VERİTABANI ŞEMASI

Supabase SQL editöründe çalıştır:

```sql
-- İçerik tablosu (tüm metin blokları)
create table content (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,        -- örn: 'hero.title.tr'
  value text not null,
  lang text not null default 'tr', -- 'tr' | 'en'
  section text not null,           -- 'hero' | 'services' | 'faq' | 'shoovo' | 'why' | 'cta' | 'footer'
  updated_at timestamptz default now()
);

-- Hizmet kartları
create table services (
  id uuid primary key default gen_random_uuid(),
  icon text not null,
  title_tr text not null,
  title_en text not null,
  desc_tr text not null,
  desc_en text not null,
  tag text,
  badge_type text default 'default', -- 'default' | 'shoovo' | 'free'
  sort_order int default 0,
  span int default 4,  -- 4=1/3, 6=1/2, 12=full
  is_active bool default true,
  updated_at timestamptz default now()
);

-- SSS
create table faq (
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
create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  sort_order int default 0,
  is_active bool default true
);

-- İstatistikler
create table stats (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,   -- 'brands' | 'creators' | 'budget' | 'years'
  value text not null,
  label_tr text not null,
  label_en text not null
);

-- RLS: sadece authenticated kullanıcılar yazabilir
alter table content enable row level security;
alter table services enable row level security;
alter table faq enable row level security;
alter table brands enable row level security;
alter table stats enable row level security;

-- Public okuma
create policy "public_read_content" on content for select using (true);
create policy "public_read_services" on services for select using (true);
create policy "public_read_faq" on faq for select using (true);
create policy "public_read_brands" on brands for select using (true);
create policy "public_read_stats" on stats for select using (true);

-- Auth yazma
create policy "auth_write_content" on content for all using (auth.role() = 'authenticated');
create policy "auth_write_services" on services for all using (auth.role() = 'authenticated');
create policy "auth_write_faq" on faq for all using (auth.role() = 'authenticated');
create policy "auth_write_brands" on brands for all using (auth.role() = 'authenticated');
create policy "auth_write_stats" on stats for all using (auth.role() = 'authenticated');
```

---

## 4. DOSYA YAPISI

```
app/
  (public)/
    page.tsx              ← anasayfa (içerik Supabase'den gelir)
    layout.tsx
  admin/
    layout.tsx            ← auth guard
    page.tsx              ← dashboard
    login/
      page.tsx            ← login ekranı
    content/
      page.tsx            ← metin/buton düzenleme
    services/
      page.tsx            ← hizmet kartları
    faq/
      page.tsx            ← SSS yönetimi
    brands/
      page.tsx            ← marquee marka listesi
    stats/
      page.tsx            ← istatistikler

lib/
  supabase/
    client.ts             ← browser client
    server.ts             ← server client
    middleware.ts         ← auth middleware
  queries/
    content.ts
    services.ts
    faq.ts

middleware.ts             ← /admin rotalarını koru
```

---

## 5. AUTH MIDDLEWARE

`middleware.ts` (root):
```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  // /admin altındaki tüm rotaları koru (login hariç)
  if (req.nextUrl.pathname.startsWith('/admin') &&
      !req.nextUrl.pathname.startsWith('/admin/login')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  // Giriş yapmış biri login sayfasına gelirse dashboard'a yönlendir
  if (req.nextUrl.pathname === '/admin/login' && session) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*']
}
```

---

## 6. LOGIN SAYFASI

`app/admin/login/page.tsx`:
```typescript
'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('E-posta veya şifre hatalı.')
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#03050d',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#070b17', border: '1px solid rgba(255,255,255,.08)',
        borderRadius: '20px', padding: '3rem', width: '380px'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            fontFamily: 'monospace', fontSize: '.7rem', color: '#5a5fcf',
            letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.5rem'
          }}>
            Aspiyas Admin
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>
            Giriş Yap
          </h1>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '.78rem', color: '#8892a4', display: 'block', marginBottom: '.4rem' }}>
              E-posta
            </label>
            <input
              type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%', background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.1)', borderRadius: '9px',
                padding: '.7rem 1rem', color: '#fff', fontSize: '.9rem',
                outline: 'none', fontFamily: 'inherit'
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: '.78rem', color: '#8892a4', display: 'block', marginBottom: '.4rem' }}>
              Şifre
            </label>
            <input
              type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%', background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.1)', borderRadius: '9px',
                padding: '.7rem 1rem', color: '#fff', fontSize: '.9rem',
                outline: 'none', fontFamily: 'inherit'
              }}
            />
          </div>

          {error && (
            <p style={{ color: '#f87171', fontSize: '.8rem', background: 'rgba(248,113,113,.08)', padding: '.6rem 1rem', borderRadius: '8px' }}>
              {error}
            </p>
          )}

          <button
            type="submit" disabled={loading}
            style={{
              background: '#5a5fcf', color: '#fff', border: 'none',
              padding: '.75rem', borderRadius: '9px', fontSize: '.9rem',
              fontWeight: 700, cursor: 'pointer', marginTop: '.5rem',
              opacity: loading ? .7 : 1
            }}
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap →'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

---

## 7. ADMIN DASHBOARD (`app/admin/page.tsx`)

Dashboard, şu bölümleri linkleri olan kart grid olarak gösterir:

```typescript
const adminSections = [
  { href: '/admin/content',  icon: '✎', label: 'Metin & Butonlar',   desc: 'Hero, CTA, section başlıkları' },
  { href: '/admin/services', icon: '⚡', label: 'Hizmet Kartları',    desc: 'Sıralama, içerik, aktif/pasif' },
  { href: '/admin/faq',      icon: '❓', label: 'SSS',                desc: 'Soru-cevap yönetimi' },
  { href: '/admin/brands',   icon: '◈',  label: 'Referans Markalar', desc: 'Marquee logoları ve sıralama' },
  { href: '/admin/stats',    icon: '#',  label: 'İstatistikler',      desc: '200+, ₺50M+ gibi rakamlar' },
]
```

Her kart: ikon, başlık, açıklama, → linki.

---

## 8. İÇERİK DÜZENLEME (`app/admin/content/page.tsx`)

- Section bazlı sekme: Hero | Shoovo | Services | Why | CTA | Footer
- Her metin için TR / EN yan yana textarea
- Kaydet: Supabase `upsert` ile `key` bazlı güncelleme
- Anlık önizleme linki (yeni sekmede aspiyas.com)

```typescript
// Kaydetme örneği
const { error } = await supabase
  .from('content')
  .upsert({ key, value, lang, section }, { onConflict: 'key' })
```

---

## 9. HİZMET KARTI YÖNETİMİ (`app/admin/services/page.tsx`)

- Drag & drop sıralama (dnd-kit)
- Her kart için: ikon emoji seçici, TR/EN başlık + açıklama, tag, badge tipi, span genişliği, aktif toggle
- Yeni kart ekle / sil
- Değişiklikler anında yansısın (revalidatePath)

```bash
npm install @dnd-kit/core @dnd-kit/sortable
```

---

## 10. SSS YÖNETİMİ (`app/admin/faq/page.tsx`)

- Liste görünümü: soru (TR), aktif toggle, düzenle / sil butonları
- Modal/slide-over: TR soru, EN soru, TR cevap, EN cevap
- Sıralama: yukarı/aşağı ok veya drag
- Yeni soru ekle

---

## 11. ANA SAYFA VERİ ÇEKME

`app/(public)/page.tsx`:
```typescript
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const revalidate = 60 // ISR: 60 saniyede bir yenile

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies })

  const [
    { data: services },
    { data: faq },
    { data: brands },
    { data: stats },
    { data: content }
  ] = await Promise.all([
    supabase.from('services').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('faq').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('brands').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('stats').select('*'),
    supabase.from('content').select('*'),
  ])

  // content'i key-value map'e çevir
  const c = Object.fromEntries((content || []).map(r => [r.key, r.value]))

  return <HomePage data={{ services, faq, brands, stats, c }} />
}
```

---

## 12. CURSOR BAŞLANGIÇ PROMPTU

Cursor'da `PLANNING.md` olarak kaydet:

```
Aspiyas websitesine Supabase tabanlı içerik yönetim sistemi (CMS) ekliyoruz.

YAPILACAKLAR (sırayla):

1. Supabase client kurulumu
   - lib/supabase/client.ts (browser)
   - lib/supabase/server.ts (server component)
   - .env.local ile config

2. /admin/login sayfası
   - Supabase email/password auth
   - Dark theme, minimal tasarım (site ile uyumlu)
   - Hatalı giriş mesajı

3. middleware.ts — /admin route koruması
   - Session yoksa /admin/login'e yönlendir
   - Login'deyken session varsa /admin'e yönlendir

4. /admin/layout.tsx
   - Sol sidebar: Dashboard, Metinler, Hizmetler, SSS, Markalar, İstatistikler
   - Sağ üst: kullanıcı email + çıkış butonu
   - Dark theme, site estetiğiyle uyumlu

5. /admin/page.tsx (dashboard)
   - Kart grid: her bölüm için ikon + başlık + link

6. /admin/services/page.tsx
   - Hizmet kartları listesi
   - Drag & drop sıralama (@dnd-kit)
   - Aktif/pasif toggle
   - TR/EN içerik düzenleme modal

7. /admin/faq/page.tsx
   - SSS listesi
   - Ekle/düzenle/sil
   - TR/EN ayrı alanlar

8. /admin/brands/page.tsx
   - Marquee marka listesi
   - Sıralama ve aktif toggle

9. /admin/stats/page.tsx
   - 4 istatistik (200+, 500+, ₺50M+, 8+) düzenleme

10. app/(public)/page.tsx güncelleme
    - Tüm içerik Supabase'den çekilsin
    - ISR: revalidate = 60

Şu an için ilk olarak adım 1 ve 2'yi yap.
```

---

## 13. SEED DATA (İlk Veri)

Supabase SQL editöründe çalıştır:

```sql
-- İstatistikler
insert into stats (key, value, label_tr, label_en) values
  ('brands',   '200+', 'Aktif Marka',       'Active Brands'),
  ('creators', '500+', 'Creator',            'Creators'),
  ('budget',   '₺50M+','Yönetilen Bütçe',   'Managed Budget'),
  ('years',    '8+',   'Yıl Deneyim',        'Years Experience');

-- Referans markalar
insert into brands (name, sort_order) values
  ('LC Waikiki', 1), ('Vodafone', 2), ('Twigy', 3),
  ('Kiralarsın', 4), ('Marka A', 5), ('Marka B', 6);

-- Örnek SSS
insert into faq (question_tr, question_en, answer_tr, answer_en, sort_order) values
  ('Aspiyas hangi hizmetleri sunuyor?', 'What services does Aspiyas offer?',
   'Performans pazarlama, UGC, sosyal medya, web, yazılım danışmanlığı, mobile app growth, dijital denetim ve AI araç geliştirme.',
   'Performance marketing, UGC, social media, web, software consulting, mobile app growth, digital audit and AI tool development.',
   1);
```

---

*Brief: Aspiyas CMS v1.0 — Supabase Auth + Content Management*
*Cursor'da önce SQL şemasını çalıştır, sonra PLANNING.md'yi ver ve adım adım ilerle.*
