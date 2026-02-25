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
title: "fwip | Najmenšia gelatéria na svete | Ocenená kapsulová zmrzlina",
description: "Objavte fwip – najmenšiu gelatériu na svete, kde sa ocenená kapsulová zmrzlina vyrába s vášňou a dôrazom na každý detail. Vychutnajte si originálne príchute z tých najkvalitnejších surovín v útulnom a očarujúcom prostredí. fwip je celosvetovo oceňovaný pre svoj inovatívny prístup ku gelatu a prináša jedinečný chuťový zážitok v kapsulovej podobe."  
  
  "};

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
