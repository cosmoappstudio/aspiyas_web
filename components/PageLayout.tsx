import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getContent } from "@/lib/getContent";
import { getContactInfo } from "@/lib/getContactInfo";
import { getFooterProducts } from "@/lib/getFooterProducts";
import { getSiteSettings } from "@/lib/getSiteSettings";
import type { Locale } from "@/lib/i18n";

interface PageLayoutProps {
  children: React.ReactNode;
  locale: Locale;
}

export async function PageLayout({ children, locale }: PageLayoutProps) {
  const [settings, contactInfo, products, content] = await Promise.all([
    getSiteSettings(),
    getContactInfo(),
    getFooterProducts(),
    getContent(locale),
  ]);
  const tagline = content["footer.tagline"] ?? settings.site_tagline;
  return (
    <div className="min-h-screen bg-[#03050d] text-[#eef0f6] overflow-x-hidden">
      <Navbar logoUrl={settings.logo_url} locale={locale} />
      <main className="pt-16">{children}</main>
      <Footer
        logoUrl={settings.logo_url}
        siteTagline={tagline}
        email={contactInfo.email}
        socialLinks={contactInfo.socialLinks}
        products={products}
        locale={locale}
      />
    </div>
  );
}
