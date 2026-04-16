import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  openGraph: {
    title: "Mahmoud Adel | Trilingual DTP Specialist & Interpreter",
    description:
      "Trilingual professional specializing in DTP, translation QC, and interpretation in Tokyo, Japan.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
