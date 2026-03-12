import { createClient } from "@/lib/supabase/server";

export type SocialLinks = {
  linkedin?: string;
  x?: string;
  instagram?: string;
};

export type ContactInfo = {
  adres: string;
  email: string;
  telefon: string;
  sosyal: string;
  socialLinks: SocialLinks;
};

const FALLBACK: ContactInfo = {
  adres: "Antalya Teknokent Uluğbey Binası, Türkiye",
  email: "hello@aspiyas.com",
  telefon: "+90 533 594 77 07",
  sosyal: "LinkedIn · X · Instagram",
  socialLinks: {
    linkedin: "https://linkedin.com/company/aspiyas",
    x: "https://x.com/aspiyas",
    instagram: "https://instagram.com/aspiyas",
  },
};

async function fetchContactInfo(): Promise<ContactInfo> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contact_info")
      .select("key, value");

    if (error) throw error;
    if (!data?.length) throw new Error("No contact info");

    const map = Object.fromEntries(data.map((r) => [r.key, r.value]));

    return {
      adres: map.adres ?? FALLBACK.adres,
      email: map.email ?? FALLBACK.email,
      telefon: map.telefon ?? FALLBACK.telefon,
      sosyal: map.sosyal ?? FALLBACK.sosyal,
      socialLinks: {
        linkedin: map.linkedin_url || FALLBACK.socialLinks.linkedin,
        x: map.x_url || FALLBACK.socialLinks.x,
        instagram: map.instagram_url || FALLBACK.socialLinks.instagram,
      },
    };
  } catch {
    return FALLBACK;
  }
}

export async function getContactInfo(): Promise<ContactInfo> {
  return fetchContactInfo();
}
