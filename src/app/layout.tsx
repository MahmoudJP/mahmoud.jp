import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoJp = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-ar",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahmoud.jp"),
  title: "Mahmoud Adel | Trilingual DTP Specialist & Interpreter",
  description:
    "Trilingual professional (Arabic, Japanese, English) specializing in DTP operations, translation quality checks, IT support, and interpretation services in Tokyo, Japan.",
  keywords: [
    "Mahmoud Adel",
    "DTP",
    "Arabic",
    "Japanese",
    "Interpreter",
    "Translator",
    "Tokyo",
  ],
  authors: [{ name: "Mahmoud Adel Ibrahim" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mahmoud Adel | Trilingual DTP Specialist & Interpreter",
    description:
      "Trilingual professional specializing in DTP, translation QC, and interpretation in Tokyo, Japan.",
    url: "https://mahmoud.jp",
    siteName: "Mahmoud Adel",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Adel | Trilingual DTP Specialist & Interpreter",
    description:
      "Trilingual professional specializing in DTP, translation QC, and interpretation in Tokyo, Japan.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable} ${notoJp.variable} ${notoArabic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mahmoud Adel Ibrahim",
              alternateName: ["محمود عادل إبراهيم", "マフムード・アーデル"],
              url: "https://mahmoud.jp",
              image: "https://mahmoud.jp/mahmoud.jpg",
              jobTitle: "DTP Specialist & Interpreter",
              worksFor: { "@type": "Organization", name: "SHAMS Co., Ltd." },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Tokyo",
                addressCountry: "JP",
              },
              nationality: { "@type": "Country", name: "Egypt" },
              knowsLanguage: ["Arabic", "Japanese", "English"],
              email: "m@mahmoud.jp",
              sameAs: [
                "https://www.linkedin.com/in/mahmoud-adel-jp",
                "https://github.com/MahmoudJP",
              ],
            }),
          }}
        />
        <LocaleProvider>{children}</LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
