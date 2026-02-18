import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ['normal', 'italic'],
});

import CustomCursor from "@/components/CustomCursor";
import AntiTheft from "@/components/AntiTheft";

export const metadata: Metadata = {
  title: "Tolgahan Tokatlı | Architect",
  description: "Architectural Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-[#0a0a0a] text-white font-sans selection:bg-white selection:text-black cursor-none`}
      >
        <AntiTheft />
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
