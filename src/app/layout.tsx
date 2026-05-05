import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n";
import { Analytics } from "@vercel/analytics/next";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { defaultDescription, person, siteUrl } from "@/lib/site";

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
  metadataBase: new URL(siteUrl),
  title: "Mahmoud Adel | Trilingual DTP Specialist & Interpreter",
  description: defaultDescription,
  keywords: [
    "Mahmoud Adel",
    "Mahmoud Adel Ibrahim",
    "DTP",
    "Multilingual DTP",
    "Arabic DTP",
    "Arabic",
    "Japanese",
    "English",
    "Interpreter",
    "Translator",
    "Translation QC",
    "Desktop Publishing",
    "Tokyo",
  ],
  authors: [{ name: "Mahmoud Adel Ibrahim" }],
  creator: "Mahmoud Adel Ibrahim",
  publisher: "Mahmoud Adel Ibrahim",
  category: "portfolio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mahmoud Adel | Trilingual DTP Specialist & Interpreter",
    description: defaultDescription,
    url: siteUrl,
    siteName: "Mahmoud Adel",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG", "ja_JP"],
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mahmoud Adel portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Adel | Trilingual DTP Specialist & Interpreter",
    description: defaultDescription,
    images: ["/opengraph-image"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Mahmoud Adel",
      description: defaultDescription,
      inLanguage: ["en", "ar", "ja"],
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: "Mahmoud Adel | Trilingual DTP Specialist & Interpreter",
      description: defaultDescription,
      inLanguage: ["en", "ar", "ja"],
      about: { "@id": `${siteUrl}/#person` },
      mainEntity: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: person.name,
      alternateName: person.alternateName,
      url: siteUrl,
      image: person.image,
      email: person.email,
      jobTitle: person.jobTitle,
      description: defaultDescription,
      worksFor: { "@type": "Organization", name: "SHAMS Co., Ltd." },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tokyo",
        addressCountry: "JP",
      },
      nationality: { "@type": "Country", name: "Egypt" },
      knowsLanguage: person.knowsLanguage,
      knowsAbout: person.knowsAbout,
      sameAs: person.sameAs,
      hasOccupation: {
        "@type": "Occupation",
        name: "DTP Specialist and Interpreter",
        occupationLocation: {
          "@type": "City",
          name: "Tokyo",
        },
        skills: person.knowsAbout,
      },
    },
  ],
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
            __html: JSON.stringify(structuredData),
          }}
        />
        <LocaleProvider>{children}</LocaleProvider>
        <AnalyticsTracker />
        <Analytics />
      </body>
    </html>
  );
}
