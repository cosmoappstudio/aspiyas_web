import Link from "next/link";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import type { SocialLinks } from "@/lib/getContactInfo";

interface FooterProps {
  logoUrl?: string | null;
  siteTagline?: string;
  email?: string;
  socialLinks?: SocialLinks;
}

const products = [
  { label: "Shoovo", href: "https://shoovo.app" },
  { label: "Dreemart", href: "#" },
  { label: "Benche", href: "#" },
  { label: "Musicifal", href: "#" },
];

const servicesLinks = [
  { label: "Performans Pazarlama", href: "#services" },
  { label: "UGC", href: "#shoovo" },
  { label: "Sosyal Medya", href: "#services" },
  { label: "AI", href: "#services" },
  { label: "Dijital Denetim", href: "#services" },
];

const companyLinks = [
  { label: "Hakkımızda", href: "#why" },
  { label: "App Studio", href: "/app-studio" },
  { label: "İletişim", href: "/iletisim" },
  { label: "KVKK", href: "#" },
];

const socialIcons = [
  { key: "linkedin" as const, Icon: Linkedin, label: "LinkedIn" },
  { key: "x" as const, Icon: Twitter, label: "X" },
  { key: "instagram" as const, Icon: Instagram, label: "Instagram" },
];

export function Footer({
  logoUrl,
  siteTagline = "We build products.\nWe grow brands.",
  email = "hello@aspiyas.com",
  socialLinks,
}: FooterProps = {}) {
  return (
    <footer className="bg-[#03050d] border-t border-white/[0.06] pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-12 pb-14 border-b border-white/[0.06]">
          {/* Brand */}
          <div>
            <div className="text-lg font-bold text-white mb-3">
              {logoUrl ? (
                <img src={logoUrl} alt="Aspiyas" className="h-8 w-auto object-contain" />
              ) : (
                <>
                  asp<span className="text-[#5a5fcf]">·</span>iyas
                </>
              )}
            </div>
            <p className="text-[#8892a4] text-sm leading-relaxed mb-6 whitespace-pre-line">
              {siteTagline}{"\n\n"}Antalya, Türkiye
              <br />
              <a
                href={`mailto:${email}`}
                className="text-[#8892a4] hover:text-white transition-colors"
              >
                {email}
              </a>
            </p>
            <div className="flex gap-2">
              {socialIcons.map(({ key, Icon, label }) => {
                const url = socialLinks?.[key];
                if (!url) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#8892a4] hover:bg-white/[0.06] hover:text-white hover:border-white/20 transition-all"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Products */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">
              Ürünler
            </h5>
            <ul className="space-y-2.5">
              {products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8892a4] hover:text-white transition-colors"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">
              Hizmetler
            </h5>
            <ul className="space-y-2.5">
              {servicesLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8892a4] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">
              Şirket
            </h5>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8892a4] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-xs text-[#5a6378] font-mono">
            © 2025 Aspiyas Teknoloji ve Ticaret A.Ş.
          </span>
          <a
            href={`mailto:${email}`}
            className="text-xs text-[#5a6378] font-mono hover:text-white transition-colors"
          >
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}
