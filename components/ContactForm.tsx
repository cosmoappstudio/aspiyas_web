"use client";

import { useState } from "react";
import type { ContactFormOptions } from "@/lib/getContactFormOptions";
import { tr, trOption } from "@/lib/translations";
import type { Locale } from "@/lib/i18n";

const DEFAULT_OPTIONS: ContactFormOptions = {
  sectors: [
    "E-ticaret & Perakende",
    "Turizm & Otelcilik",
    "Fintech & Finans",
    "Sağlık & Wellness",
    "Gıda & İçecek",
    "Moda & Güzellik",
    "Teknoloji & SaaS",
    "Eğitim & EdTech",
    "Gayrimenkul",
    "Otomotiv",
    "Diğer",
  ],
  budgets: ["₺0", "₺10K-50K", "₺50K-150K", "₺150K-500K", "₺500K-1M", "₺1M+"],
  services: [
    "Veri Bilimi Odaklı Performans Pazarlama",
    "UGC Hizmeti (Shoovo)",
    "Sosyal Medya Yönetimi",
    "Web Sitesi Tasarım & Geliştirme",
    "Yazılım Danışmanlığı",
    "Markalara Özel AI Araç Geliştirme",
    "Mobile App Growth",
    "Dijital Denetim Hizmeti",
    "Birden Fazla Hizmet",
  ],
};

const inputClass =
  "w-full bg-white/[0.04] border border-white/[0.06] rounded-[10px] px-4 py-3 text-[#eef0f6] text-sm outline-none transition-colors focus:border-[#5a5fcf]/40 focus:bg-[#5a5fcf]/5";
const labelClass =
  "block font-mono text-[10px] text-[#5a6378] uppercase tracking-wider mb-1.5";

interface ContactFormProps {
  options?: ContactFormOptions;
  locale?: Locale;
}

export function ContactForm({ options = DEFAULT_OPTIONS, locale = "tr" }: ContactFormProps) {
  const { sectors, budgets, services } = options;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          company: formData.get("company"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          sector: formData.get("sector"),
          budget: formData.get("budget"),
          service: formData.get("service"),
          message: formData.get("message"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || tr("contactForm", "error", locale));
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg(tr("contactForm", "errorConnection", locale));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            {tr("contactForm", "name", locale)}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={tr("contactForm", "namePlaceholder", locale)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            {tr("contactForm", "company", locale)}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder={tr("contactForm", "companyPlaceholder", locale)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={labelClass}>
            {tr("contactForm", "email", locale)}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={tr("contactForm", "emailPlaceholder", locale)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            {tr("contactForm", "phone", locale)}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={tr("contactForm", "phonePlaceholder", locale)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sector" className={labelClass}>
            {tr("contactForm", "sector", locale)}
          </label>
          <select
            id="sector"
            name="sector"
            className={`${inputClass} cursor-pointer appearance-none bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235a6378' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
            }}
          >
            <option value="">{tr("contactForm", "sectorPlaceholder", locale)}</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {trOption("sectors", s, locale)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>
            {tr("contactForm", "budget", locale)}
          </label>
          <select
            id="budget"
            name="budget"
            className={`${inputClass} cursor-pointer appearance-none bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235a6378' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
            }}
          >
            <option value="">{tr("contactForm", "budgetPlaceholder", locale)}</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {trOption("budgets", b, locale)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>
          {tr("contactForm", "service", locale)}
        </label>
        <select
          id="service"
          name="service"
          className={`${inputClass} cursor-pointer appearance-none bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235a6378' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
          }}
        >
            <option value="">{tr("contactForm", "servicePlaceholder", locale)}</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {trOption("services", s, locale)}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {tr("contactForm", "message", locale)}
        </label>
        <textarea
          id="message"
          name="message"
          placeholder={tr("contactForm", "messagePlaceholder", locale)}
          required
          rows={5}
          className={`${inputClass} resize-y min-h-[110px] leading-relaxed`}
        />
      </div>

      {status === "success" && (
        <p className="text-sm text-emerald-400">
          {tr("contactForm", "success", locale)}
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gradient-to-br from-[#5a5fcf] to-[#7c5cdb] text-white border-none py-3 px-8 rounded-[11px] font-extrabold text-sm cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(90,95,207,0.5)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          tr("contactForm", "sending", locale)
        ) : (
          <>
            {tr("contactForm", "submit", locale)}
            <span>→</span>
          </>
        )}
      </button>

      <p className="text-xs text-[#5a6378]">
        {tr("contactForm", "formNote", locale)}
      </p>
    </form>
  );
}
