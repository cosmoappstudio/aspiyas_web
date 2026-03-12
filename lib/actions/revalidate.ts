"use server";

import { revalidatePath } from "next/cache";

const LOCALES = ["tr", "en"] as const;
const PAGES = ["", "/hizmetler", "/hakkimizda", "/iletisim", "/app-studio"] as const;

/**
 * Admin'de kayıt yapıldığında sayfa cache'ini invalidate eder.
 * [locale] altındaki tüm sayfaları revalidate eder.
 */
export async function revalidatePages() {
  for (const locale of LOCALES) {
    for (const page of PAGES) {
      revalidatePath(`/${locale}${page}`);
    }
  }
  revalidatePath("/");
}
