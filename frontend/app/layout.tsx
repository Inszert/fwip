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
  title: "fwip | The World's Smallest Gelateria | Award-winning ice cream",
  description: "Experience the world's smallest gelateria, fwip, where award-winning ice cream meets artisanal craftsmanship. Indulge in our unique flavors made from the finest ingredients, served in a cozy and charming setting. Discover why fwip is celebrated globally for its innovative approach to gelato. Visit us for an unforgettable taste adventure!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
