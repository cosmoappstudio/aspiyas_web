# Aspiyas Tech House — Website Geliştirme Planı

> Next.js 16 + Tailwind CSS v4 + shadcn/ui + Framer Motion  
> Referans: `aspiyas-v5.html` (ana sayfa), `aspiyas-pages.html` (iç sayfalar)

---

## 1. PROJE BİLGİLERİ

**Şirket:** Aspiyas Teknoloji ve Ticaret A.Ş.  
**Konsept:** "Tech House" — SaaS ürünleri geliştiren + markalara dijital hizmet sunan yapı  
**Tagline:** *"We build products. We grow brands."*  
**Domain:** aspiyas.com

---

## 2. TEKNİK STACK

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **UI:** shadcn/ui (new-york style)
- **Animasyon:** Framer Motion
- **İkonlar:** Lucide React
- **Fontlar:** Geist (mevcut) — alternatif: Clash Display + Cabinet Grotesk (referans HTML ile uyum için)

---

## 3. RENK PALETİ

```css
/* Ana renkler */
--background: #050810       /* Derin lacivert-siyah */
--surface: #0d1117          /* Kart arka planları */
--surface-2: #161b27        /* Hover state */
--border: #1e2a3a           /* Subtle border */

/* Accent — Aspiyas mor/mavi gradient */
--accent-primary: #6366f1   /* Indigo */
--accent-secondary: #8b5cf6 /* Violet */

/* Shoovo accent */
--shoovo-accent: #f97316    /* Orange */

/* Metin */
--text-primary: #f1f5f9
--text-secondary: #94a3b8
--text-muted: #475569
```

---

## 4. DOSYA YAPISI

```
aspiyas_web/
├── app/
│   ├── layout.tsx
│   ├── page.tsx            ← anasayfa (tüm section'lar)
│   └── globals.css
├── components/
│   ├── ui/                 ← shadcn components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Products.tsx        ← Shoovo + ürünler
│   ├── Services.tsx
│   ├── Marquee.tsx         ← referans markalar
│   ├── AppStudio.tsx
│   ├── WhyAspiyas.tsx
│   ├── CTASection.tsx
│   └── Footer.tsx
├── lib/
│   └── utils.ts
├── constants/
│   ├── services.ts
│   └── products.ts
└── public/
    ├── logos/
    └── mockups/
```

---

## 5. GELİŞTİRME SIRASI

| Adım | Bileşen | Açıklama |
|------|---------|----------|
| 1 | Navbar.tsx | Sticky nav, logo, linkler, CTA, mobile hamburger |
| 2 | Hero.tsx | Full-screen hero, mesh gradient, istatistikler |
| 3 | Marquee.tsx | Sonsuz scroll marka logoları |
| 4 | Products.tsx | Shoovo bölümü + App Studio referansı |
| 5 | Services.tsx | 8 hizmet kartı grid |
| 6 | WhyAspiyas.tsx | Differentiators bölümü |
| 7 | CTASection.tsx | Pre-footer CTA |
| 8 | Footer.tsx | Linkler, sosyal, iletişim |
| 9 | page.tsx | Tüm bileşenleri birleştir |

---

## 6. KURALLAR

1. **Dark theme:** `bg-[#050810]`, kartlar `bg-[#0d1117]`
2. **Accent:** indigo-500 / violet-500 gradient
3. **Animasyon:** Framer Motion ile scroll-triggered fade-up
4. **Hero:** Animated gradient mesh arka plan
5. **Kartlar:** Glassmorphism — `bg-white/5 backdrop-blur border border-white/10`
6. **CTA butonları:** Glow — `shadow-[0_0_20px_rgba(99,102,241,0.5)]`
7. **İçerik:** Türkçe (EN toggle sonra eklenebilir)
8. **Responsive:** Mobile-first

---

## 7. BİLEŞEN DETAYLARI

### Navbar
- Logo (sol) | Nav linkleri (orta) | "Teklif Al" CTA (sağ)
- Linkler: Ürünlerimiz, Hizmetlerimiz, App Studio, Hakkımızda, İletişim
- Sticky, scroll'da backdrop-blur
- Mobile: hamburger → slide-in drawer

### Hero
- Badge: "✦ Türkiye'nin Tech House'u"
- H1: "Ürünler İnşa Ediyoruz. Markalar Büyütüyoruz."
- Alt metin + [Hizmetleri Keşfet] [Shoovo'yu Gör]
- İstatistikler: 200+ Marka | 500+ Creator | ₺50M+ Bütçe | 8+ Yıl
- Counter animasyonu

### Services (8 kart)
1. Veri Bilimi Odaklı Performans Pazarlama  
2. UGC Hizmeti (Shoovo)  
3. Sosyal Medya Yönetimi  
4. Web Sitesi Tasarım & Geliştirme  
5. Yazılım Danışmanlığı  
6. Markalara Özel AI Araç Geliştirme  
7. Mobile App Growth  
8. Dijital Denetim Hizmeti  

### Marquee
- LC Waikiki, Vodafone, Twigy, Kiralarsın, Marka A, Marka B...
- Sonsuz yatay scroll, pause on hover

---

## 8. REFERANS DOSYALAR

- **aspiyas-v5.html** — Ana sayfa tasarımı, bölüm yapısı, içerik
- **aspiyas-pages.html** — Hizmetler, Hakkımızda, App Studio, İletişim sayfaları
- **aspiyas-cursor-brief.md** — Detaylı brief
- **aspiyas-cms-cursor-brief.md** — CMS/Admin panel (sonraki faz)

---

## 9. CURSOR PROMPT (Sıradaki bileşen için)

```
[Component adı].tsx bileşenini oluştur.
PLANNING.md ve aspiyas-v5.html referans al.
Dark theme, glassmorphism, Framer Motion fade-up.
```

---

*PLANNING.md — Aspiyas Tech House Website v1.0*
