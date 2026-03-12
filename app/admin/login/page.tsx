"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-posta veya şifre hatalı.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#03050d] px-4"
      style={{ minHeight: "100dvh" }}
    >
      <div className="w-full max-w-[380px] bg-[#070b17] border border-white/[0.08] rounded-[20px] p-8 md:p-12">
        <div className="mb-8">
          <Link
            href="/"
            className="font-mono text-[11px] text-[#5a5fcf] uppercase tracking-[0.1em] block mb-2"
          >
            Aspiyas Admin
          </Link>
          <h1 className="text-2xl font-bold text-white">Giriş Yap</h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-[#8892a4] mb-1.5">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#5a5fcf]/40 transition-colors"
              placeholder="admin@aspiyas.com"
            />
          </div>
          <div>
            <label className="block text-sm text-[#8892a4] mb-1.5">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#5a5fcf]/40 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 px-4 py-2.5 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5a5fcf] text-white border-none py-3 px-6 rounded-lg font-bold text-sm cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap →"}
          </button>
        </form>

        <p className="mt-6 text-xs text-[#5a6378] text-center">
          <Link href="/" className="hover:text-[#8892a4] transition-colors">
            ← Siteye dön
          </Link>
        </p>
      </div>
    </div>
  );
}
