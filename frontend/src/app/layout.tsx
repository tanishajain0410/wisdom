import type { Metadata, Viewport } from "next";
import { DM_Sans, Nunito } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Wisdom International School | Mauranipur",
  description: "Joyful, caring education from Play Group to Class 8 at Wisdom International School, Mauranipur.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

import { FloatingCallButton } from "@/components/FloatingCallButton";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${nunito.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        <FloatingCallButton />
      </body>
    </html>
  );
}
