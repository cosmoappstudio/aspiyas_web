import { Navbar } from "@/components/Navbar";

export const dynamic = "force-dynamic";
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
import { getPartners } from "@/lib/getPartners";
import { getServices } from "@/lib/getServices";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { getStats } from "@/lib/getStats";

export default async function Home() {
  const [faqs, settings, brands, content, stats, services, partners, contactInfo] =
    await Promise.all([
      getFaqs(),
      getSiteSettings(),
      getBrands(),
      getContent("tr"),
      getStats(),
      getServices("tr"),
      getPartners(),
      getContactInfo(),
    ]);
  const faqSchema = buildFaqPageSchema(faqs);

  return (
    <div className="min-h-screen bg-[#03050d] text-[#eef0f6] overflow-x-hidden">
      {/* FAQPage JSON-LD — GEO / AI search optimizasyonu */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar logoUrl={settings.logo_url} />
      <Hero content={content} stats={stats} />
      <Marquee brands={brands} />
      <Products content={content} stats={stats} />
      <Services content={content} services={services} />
      <Partners content={content} partners={partners} />
      <FAQ items={faqs} />
      <WhyAspiyas content={content} stats={stats} />
      <CTASection content={content} />
      <Footer
        logoUrl={settings.logo_url}
        siteTagline={settings.site_tagline}
        email={contactInfo.email}
        socialLinks={contactInfo.socialLinks}
      />
    </div>
  );
}
