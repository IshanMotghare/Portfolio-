import type { Metadata } from "next";
import { Press_Start_2P, Outfit } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ishan Motghare | AI & Full-Stack Developer Portfolio",
  description:
    "Portfolio of Ishan Motghare — CS student & aspiring AI/Full-Stack Developer from India. Explore projects, skills, and journey through an immersive GBA-inspired developer world.",
  keywords: [
    "Ishan Motghare",
    "developer portfolio",
    "AI developer",
    "full stack developer",
    "Java developer",
    "CS student India",
    "GBA portfolio",
  ],
  authors: [{ name: "Ishan Motghare" }],
  openGraph: {
    title: "Ishan Motghare | Developer Portfolio",
    description: "AI & Full-Stack Developer — Enter the developer world.",
    type: "website",
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
      className={`${pressStart2P.variable} ${outfit.variable}`}
    >
      <body className="min-h-full antialiased crt-scan">
        {/* CRT scanline overlay */}
        <div className="crt-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
