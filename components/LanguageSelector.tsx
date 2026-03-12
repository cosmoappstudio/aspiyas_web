"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

const languages: { code: Locale; label: string }[] = [
  { code: "tr", label: "TR" },
  { code: "en", label: "EN" },
];

interface LanguageSelectorProps {
  currentLocale: Locale;
  className?: string;
}

export function LanguageSelector({ currentLocale, className }: LanguageSelectorProps) {
  const pathname = usePathname();

  const getLocalizedPath = (locale: Locale) => {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "tr" || segments[0] === "en") {
      segments[0] = locale;
      return "/" + segments.join("/");
    }
    return `/${locale}${pathname === "/" ? "" : pathname}`;
  };

  return (
    <div
      className={cn(
        "flex items-center rounded-lg border border-white/[0.12] bg-white/[0.03] p-0.5",
        className
      )}
    >
      {languages.map(({ code, label }) => {
        const isActive = currentLocale === code;
        const href = getLocalizedPath(code);
        return (
          <Link
            key={code}
            href={href}
            className={cn(
              "px-2.5 py-1 text-xs font-semibold rounded-md transition-colors",
              isActive
                ? "bg-[#5a5fcf]/30 text-white"
                : "text-[#8892a4] hover:text-white hover:bg-white/[0.06]"
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
