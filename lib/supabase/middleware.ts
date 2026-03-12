import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data } = await supabase.auth.getUser();

  // /admin koruması (login hariç)
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    if (!data.user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // /api/admin koruması
  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    if (!data.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // Giriş yapmış kullanıcı login sayfasına gelirse dashboard'a yönlendir
  if (request.nextUrl.pathname === "/admin/login" && data.user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}
