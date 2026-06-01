import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-source-serif",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Good Godly News — The daily briefing for faith, family & liberty",
  description:
    "A reader-supported daily briefing curating the news on faith, family, religious liberty, life, parental rights, and education — from more than fifty trusted publishers. No ads, no trackers, no paywall.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSerif.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
