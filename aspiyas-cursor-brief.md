# Aspiyas Tech House — Website Cursor Brief
> Next.js 14 + Tailwind CSS + shadcn/ui + Framer Motion  
> Dark theme, teknoloji/startup estetiği, Captain Digital tarzı dönüşüm odaklı yapı

---

## 1. PROJE GENEL BİLGİLERİ

**Şirket:** Aspiyas Teknoloji ve Ticaret A.Ş.  
**Konsept:** "Tech House" — Hem kendi SaaS ürünlerini geliştiren, hem de markalara teknoloji odaklı dijital hizmetler sunan bir yapı.  
**Tagline önerisi:** *"We build products. We grow brands."*  
**Hedef kitle:** Türk e-ticaret markaları, büyüme arayan KOBİ'ler, yatırımcılar, potansiyel çalışanlar  
**Ana dil:** Türkçe (EN toggle opsiyonel)  
**Domain:** aspiyas.com  

---

## 2. TEKNİK STACK

```
- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- UI Components: shadcn/ui
- Animations: Framer Motion
- Icons: Lucide React
- Fonts: Geist (display) + Inter (body) — veya alternatif: Space Grotesk + DM Sans
- Deployment: Vercel
```

---

## 3. RENK PALETİ & ESTETİK

```css
/* Ana renkler */
--background: #050810       /* Derin lacivert-siyah */
--surface: #0d1117          /* Kart arka planları */
--surface-2: #161b27        /* Hover state kartlar */
--border: #1e2a3a           /* Subtle border */

/* Accent — Aspiyas mor/mavi gradient */
--accent-primary: #6366f1   /* Indigo */
--accent-secondary: #8b5cf6 /* Violet */
--accent-glow: #4f46e5      /* CTA glow */

/* Shoovo için ayrı accent */
--shoovo-accent: #f97316    /* Orange — enerji, UGC, creator */

/* Metin */
--text-primary: #f1f5f9
--text-secondary: #94a3b8
--text-muted: #475569
```

**Estetik yönergeler:**
- Arka planda subtle grid pattern (CSS) veya noise texture
- Hero'da animated mesh gradient (Framer Motion ile)
- Kartlarda glassmorphism efekti (backdrop-blur + border opacity)
- CTA butonlarında glow efekti (box-shadow: 0 0 20px accent)
- Section geçişlerinde blur/fade-in scroll animasyonları

---

## 4. SAYFA YAPISI & BİLEŞENLER

### 4.1 NAVBAR
```
Logo (sol) | Nav linkleri (orta) | "Teklif Al" CTA (sağ)

Nav linkleri:
- Ürünlerimiz
- Hizmetlerimiz  
- App Studio
- Hakkımızda
- İletişim

Özellikler:
- Sticky, scroll'da backdrop-blur aktif
- Mobile: hamburger menu, slide-in drawer
- "Ürünlerimiz" ve "Hizmetlerimiz" hover'da dropdown açılsın
```

---

### 4.2 HERO SECTION

**Layout:** Full-screen, dikey ortalanmış metin + sağda floating ürün mockup'ları

**İçerik:**
```
Küçük badge (animasyonlu): ✦ Türkiye'nin Tech House'u

H1 (büyük, bold):
"Ürünler İnşa Ediyoruz.
Markalar Büyütüyoruz."

Alt metin (body):
"Aspiyas; kendi SaaS ürünlerini geliştiren ve markalara 
veri odaklı büyüme hizmetleri sunan bir teknoloji şirketidir."

CTA'lar:
[Hizmetleri Keşfet →]  [Shoovo'yu Gör]

İstatistik bar (hero altında):
200+ Marka  |  500+ Creator  |  ₺50M+ Yönetilen Bütçe  |  8+ Yıl Deneyim
```

**Animasyon:** H1 kelime kelime fade-up, istatistikler counter animasyonu

---

### 4.3 ÜRÜNLER SECTION — "Kendi Geliştirdiğimiz Ürünler"

**Layout:** Sol: metin, Sağ: büyük product card

**Shoovo Kartı:**
```
Logo + "flagship ürün" badge
Başlık: "Shoovo — UGC İçerik Platformu"
Açıklama: "Markaları içerik üreticileriyle buluşturan 
Türkiye'nin ilk UGC SaaS platformu."

Metrikler: 27+ Marka | 200+ Creator | ₺2.200 İlk Ay Geliri
CTA: [Shoovo'yu İncele →] (shoovo.app'e link)
```

**ASP App Studio mini referansı** (küçük, alt kısımda):
```
"+ Dreemart AI · Benche · Musicifal"
[App Studio'yu Gör →]
```

---

### 4.4 HİZMETLER SECTION — "Markanızı Büyütüyoruz"

**Layout:** Üstte başlık + açıklama, altta 3 kolonlu kart grid (2 satır = 6 kart + 2 daha küçük = toplam 8)

**Hizmet Kartları:**

```
1. 🎯 Veri Bilimi Odaklı Performans Pazarlama
   "Google, Meta, TikTok reklamlarında AI destekli 
   optimizasyon ile ROAS'ınızı maksimize ediyoruz."

2. 📱 Sosyal Medya Yönetimi
   "Strateji, içerik üretimi ve topluluk yönetimini 
   tek çatı altında sunuyoruz."

3. 🎬 UGC Hizmeti
   "Shoovo altyapısıyla markanız için hızlı, 
   ekonomik ve dönüşüm odaklı video içerikler."

4. 💻 Web Sitesi Tasarım & Geliştirme
   "Hızlı, modern ve dönüşüm odaklı web siteleri."

5. 📊 Yazılım Danışmanlığı
   "Ürün yol haritası, teknik mimari ve geliştirme 
   süreç danışmanlığı."

6. 📲 Mobile App Growth
   "ASO, kullanıcı edinimi ve retention stratejileriyle 
   uygulamanızı büyütüyoruz."

7. 🔍 Dijital Denetim Hizmeti
   "Mevcut dijital varlıklarınızı analiz ederek 
   büyüme fırsatlarını raporluyoruz."

8. 🤖 Markalara Özel AI Araç Geliştirme
   "İş süreçlerinize özel yapay zeka araçları 
   ve otomasyonlar geliştiriyoruz."
```

**Kart stili:** Dark glass card, hover'da border glow + scale(1.02), ikon solda üstte

---

### 4.5 SOCIAL PROOF / REFERANSLAR

**Layout:** Infinite scroll marquee (tek satır, logo carousel)

**Başlık:** "Güvendikleri Şirket"

**Markalar (placeholder + gerçek):**
LC Waikiki, Vodafone, Twigy, Kiralarsın, [diğerleri]

---

### 4.6 ASP APP STUDIO SECTION

**Konsept:** Aspiyas çatısı altındaki uygulamalar — ayrı bir "studio" kimliği

**Layout:** Dark bg içinde centered, ürün kartları yan yana

```
Başlık: "ASP App Studio"
Alt: "Kendi geliştirdiğimiz uygulamalar ekosistemi"

Ürün kartları:
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Shoovo     │  │  Dreemart   │  │   Benche    │
│  UGC SaaS  │  │  AI Dream   │  │  iOS App    │
│  Platform  │  │  Art App    │  │             │
│ [İncele →] │  │ [İncele →]  │  │ [İncele →]  │
└─────────────┘  └─────────────┘  └─────────────┘

+ Musicifal (küçük badge olarak)
```

---

### 4.7 NEDEN ASPIYAS? — DIFFERENTIATORS

**Layout:** 2 kolon, sol metin sağ büyük stat/visual

```
✓ Teknoloji şirketiyiz, sadece ajans değil
✓ Kendi ürünlerimizi yönetiyoruz — growth'u içeriden biliyoruz  
✓ UGC'den performance'a entegre hizmet
✓ Veri ve AI odaklı karar alma
✓ Shoovo ile içerik maliyetini %70 düşürüyoruz
```

---

### 4.8 CTA SECTION (Pre-footer)

**Layout:** Full-width, gradient bg, centered

```
Başlık: "Büyüme Hazır mısınız?"
Alt: "Ücretsiz dijital denetim ile başlayın."

[Ücretsiz Denetim Al →]    [Demo Talep Et]
```

---

### 4.9 FOOTER

```
Sol: Logo + tagline + sosyal medya ikonları
Orta: Hızlı linkler (Ürünler / Hizmetler / App Studio / Blog)
Sağ: İletişim (Antalya, TR | hello@aspiyas.com)

Alt bar: © 2025 Aspiyas Teknoloji ve Ticaret A.Ş. | Gizlilik | KVKK
```

---

## 5. CURSOR İÇİN KULLANILACAK ANA PROMPT

Cursor'da yeni Next.js projesi aç, sonra şunu `PLANNING.md` olarak kaydet ve Cursor'a ver:

```
Sen Aspiyas Tech House websitesini Next.js 14 (App Router), 
Tailwind CSS, shadcn/ui ve Framer Motion kullanarak geliştiriyorsun.

PROJE YAPISI:
app/
  page.tsx (anasayfa — tüm section'lar buraya)
  layout.tsx
  globals.css
components/
  Navbar.tsx
  Hero.tsx
  Products.tsx
  Services.tsx
  Marquee.tsx (referans logoları)
  AppStudio.tsx
  WhyAspiyas.tsx
  CTASection.tsx
  Footer.tsx

KURALLAR:
1. Dark theme: bg-[#050810], kartlar bg-[#0d1117]
2. Accent: indigo-500/violet-500 gradient
3. Tüm section'larda Framer Motion ile scroll-triggered fade-up animasyonu
4. Hero'da animated gradient mesh arka plan
5. Kartlarda glassmorphism: bg-white/5 backdrop-blur border border-white/10
6. CTA butonlarında glow: shadow-[0_0_20px_rgba(99,102,241,0.5)]
7. Türkçe içerik, responsive (mobile-first)
8. Her component ayrı dosyada

İlk olarak: Navbar.tsx ve Hero.tsx bileşenlerini oluştur.
```

---

## 6. COMPONENT BAZLI CURSOR PROMPTLARI

Her bileşeni ayrı ayrı yaptırmak için:

### Hero:
```
Hero.tsx bileşenini oluştur. 
- Full-screen, dikey ortalanmış
- Arka planda animated mesh gradient (CSS animation veya Framer Motion)
- "✦ Türkiye'nin Tech House'u" animasyonlu badge
- H1: "Ürünler İnşa Ediyoruz. Markalar Büyütüyoruz."
- Alt metin + 2 CTA butonu
- Alt kısımda 4 istatistik: 200+ Marka, 500+ Creator, ₺50M+ Bütçe, 8+ Yıl
- İstatistikler counter animasyonu (useEffect + requestAnimationFrame)
- Sağda floating product mockup (placeholder div yeterli)
```

### Services Grid:
```
Services.tsx bileşenini oluştur.
- Başlık + 8 hizmet kartı (3 kolon grid, responsive)
- Her kart: ikon (Lucide), başlık, kısa açıklama
- Hover: border-indigo-500/50 + scale(1.02) + glow
- Glassmorphism stil
- Framer Motion ile staggered fade-up (her kart 0.1s gecikmeyle)
- Hizmetler: [yukarıdaki 8 madde]
```

### Marquee:
```
Marquee.tsx bileşenini oluştur.
- Sonsuz yatay scroll animasyonu (CSS animation: marquee)
- İki satır (biri sola biri sağa gider — opsiyonel)
- Marka isimleri placeholder text olarak: LC Waikiki, Vodafone, Twigy, Kiralarsın, Marka5, Marka6
- Pause on hover
```

---

## 7. DOSYA & KLASÖR YAPISI ÖNERİSİ

```
aspiyas-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/          (shadcn components)
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Products.tsx
│   ├── Services.tsx
│   ├── Marquee.tsx
│   ├── AppStudio.tsx
│   ├── WhyAspiyas.tsx
│   ├── CTASection.tsx
│   └── Footer.tsx
├── public/
│   ├── logos/       (marka logoları)
│   └── mockups/     (ürün görselleri)
├── lib/
│   └── utils.ts
└── constants/
    ├── services.ts  (hizmet listesi)
    └── products.ts  (ürün listesi)
```

---

## 8. KURULUM KOMUTU (Cursor Terminal'de)

```bash
npx create-next-app@latest aspiyas-website \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd aspiyas-website

# shadcn/ui init
npx shadcn-ui@latest init

# Framer Motion
npm install framer-motion

# Lucide
npm install lucide-react
```

---

*Brief hazırlandı: Aspiyas Tech House Website v1.0*  
*Cursor'da önce kurulumu yap, sonra PLANNING.md'yi oluştur, ardından component bazlı promptları sırayla çalıştır.*
