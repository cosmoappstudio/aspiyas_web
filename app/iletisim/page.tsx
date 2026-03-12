import { Linkedin, Twitter, Instagram } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { ContactForm } from "@/components/ContactForm";
import { getContactFormOptions } from "@/lib/getContactFormOptions";
import { getContactInfo } from "@/lib/getContactInfo";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "İletişim — Aspiyas | Konuşalım, Büyüyelim",
  description:
    "Formdan mesaj bırakın veya doğrudan görüşme takvimi ayarlayın. 1 iş günü içinde yanıt veriyoruz.",
};

const CALENDAR_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1ySQpbTSBcOC3NY3_v7tRYjmgIumNmBzwjqDkl1Wzr4xeherL76jP2ZaETYg-PpizV_Aa7n4bl?gv=true";

const socialIcons = [
  { key: "linkedin" as const, Icon: Linkedin, label: "LinkedIn" },
  { key: "x" as const, Icon: Twitter, label: "X" },
  { key: "instagram" as const, Icon: Instagram, label: "Instagram" },
];

export default async function IletisimPage() {
  const [formOptions, contactInfo] = await Promise.all([
    getContactFormOptions(),
    getContactInfo(),
  ]);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-4">
            İletişim
            <span className="w-7 h-px bg-[#5a5fcf]" />
          </div>
          <h1 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.93] tracking-[-0.04em] text-white mb-4">
            Konuşalım.
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px rgba(255,255,255,.2)" }}
            >
              Büyüyelim.
            </span>
          </h1>
          <p className="text-[#8892a4] text-base leading-relaxed max-w-[440px]">
            Formdan mesaj bırakın veya doğrudan bir görüşme takvimi ayarlayın.
            Genellikle 1 iş günü içinde yanıt veriyoruz.
          </p>
        </div>
      </section>

      {/* Form + Calendar */}
      <section className="bg-[#070b17] border-b border-white/[0.06] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Form */}
          <div>
            <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-6">
              Mesaj Gönder
              <span className="w-7 h-px bg-[#5a5fcf]" />
            </div>
            <ContactForm options={formOptions} />
          </div>

          {/* Calendar */}
          <div>
            <div className="flex items-center gap-2.5 text-[11px] text-[#5a5fcf] uppercase tracking-[0.12em] font-mono mb-2">
              Görüşme Takvimi
              <span className="w-7 h-px bg-[#5a5fcf]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Doğrudan Randevu Al
            </h2>
            <p className="text-[#8892a4] text-sm leading-relaxed mb-4">
              30 dakikalık ücretsiz keşif görüşmesi. Google Meet üzerinden.
            </p>
            <div
              className="rounded-xl overflow-hidden border border-white/[0.06] [filter:invert(1)_hue-rotate(180deg)]"
              style={{ backgroundColor: "#fff" }}
            >
              <iframe
                src={CALENDAR_URL}
                style={{ border: 0 }}
                width="100%"
                height="600"
                frameBorder="0"
                title="Google Calendar Randevu"
              />
            </div>
            <p className="mt-4 text-sm text-[#8892a4]">
              veya{" "}
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-white font-semibold hover:underline"
              >
                {contactInfo.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="bg-[#03050d] border-b border-white/[0.06] py-16 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#070b17] border border-white/[0.06] rounded-xl p-5">
            <div className="font-mono text-[10px] text-[#5a6378] uppercase tracking-wider mb-2">
              Adres
            </div>
            <div className="text-sm font-semibold text-white mb-0.5">
              {contactInfo.adres}
            </div>
            <div className="text-xs text-[#8892a4]">Teknokent & Remote</div>
          </div>
          <div className="bg-[#070b17] border border-white/[0.06] rounded-xl p-5">
            <div className="font-mono text-[10px] text-[#5a6378] uppercase tracking-wider mb-2">
              E-posta
            </div>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-sm font-semibold text-white hover:underline block mb-0.5"
            >
              {contactInfo.email}
            </a>
            <div className="text-xs text-[#8892a4]">1 iş günü içinde yanıt</div>
          </div>
          <div className="bg-[#070b17] border border-white/[0.06] rounded-xl p-5">
            <div className="font-mono text-[10px] text-[#5a6378] uppercase tracking-wider mb-2">
              Telefon
            </div>
            <a
              href={`tel:${contactInfo.telefon.replace(/\s/g, "")}`}
              className="text-sm font-semibold text-white hover:underline block mb-0.5"
            >
              {contactInfo.telefon}
            </a>
            <div className="text-xs text-[#8892a4]">Hafta içi 09:00–18:00</div>
          </div>
          <div className="bg-[#070b17] border border-white/[0.06] rounded-xl p-5">
            <div className="font-mono text-[10px] text-[#5a6378] uppercase tracking-wider mb-2">
              Sosyal
            </div>
            <div className="flex gap-3">
              {socialIcons.map(({ key, Icon, label }) => {
                const url = contactInfo.socialLinks?.[key];
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
        </div>
      </section>
    </PageLayout>
  );
}
