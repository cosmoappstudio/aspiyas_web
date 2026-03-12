"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "@/components/LanguageSelector";
import { tr } from "@/lib/translations";
import type { Locale } from "@/lib/i18n";

const navLinkKeys = [
  { href: "hizmetler", labelKey: "services" as const, scrollOnHome: "#services" },
  { href: "hakkimizda", labelKey: "about" as const, scrollOnHome: "#why" },
  { href: "app-studio", label: "App Studio", scrollOnHome: null },
  { href: "iletisim", labelKey: "contact" as const, scrollOnHome: null },
];

interface NavbarProps {
  logoUrl?: string | null;
  locale?: Locale;
}

export function Navbar({ logoUrl, locale = "tr" }: NavbarProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const base = `/${locale}`;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 px-6 md:px-12",
        "flex items-center justify-between",
        "bg-[#03050d]/82 backdrop-blur-[20px] border-b border-white/[0.06]"
      )}
    >
      <Link
        href={base}
        className="font-bold text-lg tracking-tight text-white flex items-center hover:opacity-90 transition-opacity"
      >
        {logoUrl ? (
          <img src={logoUrl} alt="Aspiyas" className="h-8 w-auto object-contain" />
        ) : (
          <>
            asp<span className="text-[#5a5fcf] text-2xl leading-none">·</span>iyas
          </>
        )}
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-9 list-none">
        {navLinkKeys.map((link) => {
          const isActive = pathname?.includes(`/${link.href}`);
          const linkHref =
            link.scrollOnHome && (pathname === base || pathname === `${base}/`)
              ? link.scrollOnHome
              : `${base}/${link.href}`;
          const label = "labelKey" in link && link.labelKey ? tr("nav", link.labelKey, locale) : (link as { label?: string }).label ?? "";
          return (
            <li key={link.href}>
              <Link
                href={linkHref}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-white" : "text-[#8892a4] hover:text-white"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3">
        <LanguageSelector currentLocale={locale} />
        <Link
          href={`${base}/iletisim`}
          className="hidden md:inline-flex px-5 py-2 rounded-lg border border-white/20 text-white font-bold text-sm hover:bg-white/5 hover:border-white/30 transition-all"
        >
          {tr("nav", "getQuote", locale)}
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 text-[#8892a4] hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? tr("nav", "menuClose", locale) : tr("nav", "menuOpen", locale)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 md:hidden"
            style={{ backgroundColor: "#03050d" }}
          >
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "#03050d" }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div
              className="relative px-6 py-8 border-b border-white/[0.06]"
              style={{ backgroundColor: "#03050d" }}
            >
              <ul className="flex flex-col gap-6">
                {navLinkKeys.map((link) => {
                  const href =
                    (pathname === base || pathname === `${base}/`) && link.scrollOnHome
                      ? link.scrollOnHome
                      : `${base}/${link.href}`;
                  const label = "labelKey" in link && link.labelKey ? tr("nav", link.labelKey, locale) : (link as { label?: string }).label ?? "";
                  return (
                    <li key={link.href}>
                      <Link
                        href={href}
                        className="block text-lg font-medium text-[#8892a4] hover:text-white transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href={`${base}/iletisim`}
                    className="inline-flex px-5 py-2.5 rounded-lg border border-white/20 text-white font-bold text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    {tr("nav", "getQuote", locale)}
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
