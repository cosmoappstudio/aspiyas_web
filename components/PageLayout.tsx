import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getContactInfo } from "@/lib/getContactInfo";
import { getFooterProducts } from "@/lib/getFooterProducts";
import { getSiteSettings } from "@/lib/getSiteSettings";

interface PageLayoutProps {
  children: React.ReactNode;
}

export async function PageLayout({ children }: PageLayoutProps) {
  const [settings, contactInfo, products] = await Promise.all([
    getSiteSettings(),
    getContactInfo(),
    getFooterProducts(),
  ]);
  return (
    <div className="min-h-screen bg-[#03050d] text-[#eef0f6] overflow-x-hidden">
      <Navbar logoUrl={settings.logo_url} />
      <main className="pt-16">{children}</main>
      <Footer
        logoUrl={settings.logo_url}
        siteTagline={settings.site_tagline}
        email={contactInfo.email}
        socialLinks={contactInfo.socialLinks}
        products={products}
      />
    </div>
  );
}
