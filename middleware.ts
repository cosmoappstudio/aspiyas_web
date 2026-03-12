import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { defaultLocale } from "@/lib/i18n";

const NO_CACHE_PATHS = ["/", "/tr", "/en", "/tr/app-studio", "/en/app-studio", "/tr/hizmetler", "/en/hizmetler", "/tr/hakkimizda", "/en/hakkimizda", "/tr/iletisim", "/en/iletisim"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Root ve eski path'leri /tr'ye yönlendir
  if (path === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }
  if (["/hizmetler", "/hakkimizda", "/app-studio", "/iletisim"].includes(path)) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${path}`, request.url));
  }

  const response = await updateSession(request);

  // CMS sayfaları için cache devre dışı (düzenlemeler anında görünsün)
  if (NO_CACHE_PATHS.some((p) => path === p || path.startsWith(p + "/"))) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/", "/tr", "/tr/:path*", "/en", "/en/:path*", "/hizmetler", "/hakkimizda", "/app-studio", "/iletisim"],
};
