"use server";

import { revalidatePath } from "next/cache";

/**
 * Admin'de kayıt yapıldığında sayfa cache'ini invalidate eder.
 * Veri artık cache'siz çekildiği için her istekte taze veri gelir.
 */
export async function revalidatePages() {
  revalidatePath("/", "layout");
  revalidatePath("/hizmetler");
  revalidatePath("/hakkimizda");
  revalidatePath("/iletisim");
  revalidatePath("/app-studio");
}
