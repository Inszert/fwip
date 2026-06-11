import Head from "next/head";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CafeRestaurantsSection from "@/components/CafeRestaurantsSection";
export const dynamic = "force-dynamic";
export default function PlacesPage() {
  return (
    <>
      <Head>
        <title>FWIP pre kaviarne a reštaurácie - fwip.sk</title>
        <meta
          name="description"
          content="FWIP.sk ponúka prémiové zmrzliny pre kaviarne, reštaurácie, hotely a ďalšie prevádzky. Zvýšte príjmy a ponúknite nezabudnuteľný zážitok zákazníkom."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="FWIP pre kaviarne a reštaurácie - fwip.sk" />
        <meta
          property="og:description"
          content="FWIP.sk ponúka prémiové zmrzliny pre kaviarne, reštaurácie, hotely a ďalšie prevádzky. Zvýšte príjmy a ponúknite nezabudnuteľný zážitok zákazníkom."
        />
        <meta property="og:url" content="https://fwip.sk/places" />
        <meta property="og:type" content="website" />

        {/* Schema.org Organization markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FWIP.sk",
              "url": "https://fwip.sk",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+421902200971",
                "contactType": "zákaznícka podpora",
                "email": "slovakia@fwip.com",
              },
              "sameAs": [
                "https://www.facebook.com/fwipslovakia.sk",
                "https://www.instagram.com/fwip_slovakia"
              ],
            }),
          }}
        />
      </Head>

      <main className="min-h-screen flex flex-col justify-between bg-white">
        <Header />

        {/* Hlavný obsah pre kaviarne a reštaurácie */}
        <CafeRestaurantsSection />

        <Footer />
      </main>
    </>
  );
}