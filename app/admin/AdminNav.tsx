"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", icon: "◉", label: "Dashboard" },
  { href: "/admin/content", icon: "✎", label: "Metin & Butonlar" },
  { href: "/admin/services", icon: "⚡", label: "Hizmet Kartları" },
  { href: "/admin/faq", icon: "❓", label: "SSS" },
  { href: "/admin/brands", icon: "◈", label: "Referans Markalar" },
  { href: "/admin/partners", icon: "▣", label: "Partnerler" },
  { href: "/admin/app-studio", icon: "◆", label: "App Studio" },
  { href: "/admin/stats", icon: "#", label: "İstatistikler" },
  { href: "/admin/contact-info", icon: "✉", label: "İletişim Bilgileri" },
  { href: "/admin/footer-products", icon: "▤", label: "Footer Ürünleri" },
  { href: "/admin/site-settings", icon: "⚙", label: "Site Ayarları" },
  { href: "/admin/contact-form-options", icon: "▢", label: "Form Seçenekleri" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-4 space-y-0.5">
      {navItems.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#5a5fcf]/15 text-white border border-[#5a5fcf]/30"
                : "text-[#8892a4] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <span className="text-base opacity-70">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
