import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getSiteSettings } from "@/lib/getSiteSettings";
import "./globals.css";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title =
    settings.meta_title ??
    "Aspiyas — Dijital Büyüme & SaaS Tech House | Antalya, Türkiye";
  const description =
    settings.meta_description ??
    "Aspiyas; Shoovo UGC platformu, performans pazarlama ve AI araç geliştirme hizmetleriyle Türk markalarını büyüten bir teknoloji şirketidir. Antalya merkezli, global vizyonlu.";

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(settings.og_image_url && {
        images: [{ url: settings.og_image_url }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(settings.og_image_url && { images: [settings.og_image_url] }),
    },
  };

  if (settings.favicon_url) {
    metadata.icons = { icon: settings.favicon_url };
  }

  return metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
