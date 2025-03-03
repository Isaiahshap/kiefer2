import type { Metadata } from "next";
import { Cabin, Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { HeroProvider } from "@/contexts/HeroContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cabin = Cabin({
  variable: "--font-cabin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kiefer | Musician, Producer, Composer",
  description: "Official website of Kiefer - Jazz pianist, producer, and composer known for his unique blend of jazz, hip-hop, and electronic music",
  keywords: ["Kiefer", "jazz", "hip-hop", "electronic music", "pianist", "producer", "composer", "It's Ok, B U"],
  openGraph: {
    title: "Kiefer | Musician, Producer, Composer",
    description: "Official website of Kiefer - Jazz pianist, producer, and composer",
    url: "https://www.kiefermusic.com",
    siteName: "Kiefer Music",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiefer | Musician, Producer, Composer",
    description: "Official website of Kiefer - Jazz pianist, producer, and composer",
  },
  verification: {
    google: "verification_token",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${cabin.variable} ${spaceMono.variable} antialiased text-stone-900`}
      >
        <HeroProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </HeroProvider>
      </body>
    </html>
  );
}
