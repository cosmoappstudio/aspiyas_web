import Link from "next/link";

const adminSections = [
  {
    href: "/admin/content",
    icon: "✎",
    label: "Metin & Butonlar",
    desc: "Hero, CTA, section başlıkları",
  },
  {
    href: "/admin/services",
    icon: "⚡",
    label: "Hizmet Kartları",
    desc: "Sıralama, içerik, aktif/pasif",
  },
  {
    href: "/admin/faq",
    icon: "❓",
    label: "SSS",
    desc: "Soru-cevap yönetimi",
  },
  {
    href: "/admin/brands",
    icon: "◈",
    label: "Referans Markalar",
    desc: "Marquee marka listesi",
  },
  {
    href: "/admin/partners",
    icon: "▣",
    label: "Partnerler",
    desc: "Logo yükleme, sıralama",
  },
  {
    href: "/admin/stats",
    icon: "#",
    label: "İstatistikler",
    desc: "200+, ₺50M+ gibi rakamlar",
  },
  {
    href: "/admin/contact-info",
    icon: "✉",
    label: "İletişim Bilgileri",
    desc: "Adres, e-posta, telefon",
  },
  {
    href: "/admin/site-settings",
    icon: "⚙",
    label: "Site Ayarları",
    desc: "Logo, site adı, tagline",
  },
  {
    href: "/admin/contact-form-options",
    icon: "▢",
    label: "Form Seçenekleri",
    desc: "Sektör, bütçe, hizmet listeleri",
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-[#8892a4] text-sm mt-1">
          İçerik yönetim paneline hoş geldiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="block bg-[#070b17] border border-white/[0.06] rounded-xl p-6 hover:border-[#5a5fcf]/25 transition-colors group"
          >
            <span className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity">
              {section.icon}
            </span>
            <h2 className="text-lg font-bold text-white mt-4 mb-1">
              {section.label}
            </h2>
            <p className="text-sm text-[#8892a4] mb-4">{section.desc}</p>
            <span className="text-sm text-[#5a5fcf] font-medium group-hover:underline">
              Düzenle →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
