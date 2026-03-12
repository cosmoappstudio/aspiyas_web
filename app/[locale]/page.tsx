import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Products } from "@/components/Products";
import { Services } from "@/components/Services";
import { Partners } from "@/components/Partners";
import { FAQ } from "@/components/FAQ";
import { WhyAspiyas } from "@/components/WhyAspiyas";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { getBrands } from "@/lib/getBrands";
import { getContactInfo } from "@/lib/getContactInfo";
import { getContent } from "@/lib/getContent";
import { getFaqs } from "@/lib/faq";
import { buildFaqPageSchema } from "@/lib/faq-schema";
import { getFooterProducts } from "@/lib/getFooterProducts";
import { getPartners } from "@/lib/getPartners";
import { getServices } from "@/lib/getServices";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { getStats } from "@/lib/getStats";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const [faqs, settings, brands, content, stats, services, partners, contactInfo, footerProducts] =
    await Promise.all([
      getFaqs(),
      getSiteSettings(),
      getBrands(),
      getContent(locale),
      getStats(),
      getServices(locale),
      getPartners(),
      getContactInfo(),
      getFooterProducts(),
    ]);
  const faqSchema = buildFaqPageSchema(faqs);

  return (
    <div className="min-h-screen bg-[#03050d] text-[#eef0f6] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar logoUrl={settings.logo_url} locale={locale} />
      <Hero content={content} stats={stats} locale={locale} />
      <Marquee brands={brands} />
      <Products content={content} stats={stats} locale={locale} />
      <Services content={content} services={services} locale={locale} />
      <Partners content={content} partners={partners} locale={locale} />
      <FAQ items={faqs} locale={locale} content={content} />
      <WhyAspiyas content={content} stats={stats} locale={locale} />
      <CTASection content={content} locale={locale} />
      <Footer
        logoUrl={settings.logo_url}
        siteTagline={content["footer.tagline"] ?? settings.site_tagline}
        email={contactInfo.email}
        socialLinks={contactInfo.socialLinks}
        products={footerProducts}
        locale={locale}
      />
    </div>
  );
}
