import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const NO_CACHE_PATHS = ["/", "/app-studio", "/hizmetler", "/hakkimizda", "/iletisim"];

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  // CMS sayfaları için cache devre dışı (düzenlemeler anında görünsün)
  const path = request.nextUrl.pathname;
  if (NO_CACHE_PATHS.includes(path)) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/", "/app-studio", "/hizmetler", "/hakkimizda", "/iletisim"],
};
