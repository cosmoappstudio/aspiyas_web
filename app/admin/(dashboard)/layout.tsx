import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { AdminNav } from "../AdminNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen text-[#eef0f6]">
      <aside className="fixed left-0 top-0 bottom-0 w-56 bg-[#070b17] border-r border-white/[0.06] flex flex-col">
        <div className="p-6 border-b border-white/[0.06]">
          <Link
            href="/admin"
            className="font-bold text-white text-lg tracking-tight"
          >
            asp<span className="text-[#5a5fcf]">·</span>iyas
          </Link>
          <span className="block font-mono text-[10px] text-[#5a5fcf] uppercase tracking-wider mt-1">
            Admin
          </span>
        </div>
        <AdminNav />
        <div className="mt-auto p-4 border-t border-white/[0.06]">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-[#5a6378] hover:text-[#8892a4] transition-colors"
          >
            Siteyi aç →
          </Link>
        </div>
      </aside>

      <main className="ml-56 min-h-screen">
        <header className="sticky top-0 z-10 h-16 bg-[#03050d]/90 backdrop-blur border-b border-white/[0.06] flex items-center justify-between px-8">
          <div />
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#8892a4]">{user.email}</span>
              <form action="/api/auth/signout" method="post">
                <button
                  type="submit"
                  className="text-xs text-[#5a6378] hover:text-red-400 transition-colors"
                >
                  Çıkış
                </button>
              </form>
            </div>
          )}
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
