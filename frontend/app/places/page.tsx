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

        <section className="p-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Supermarkety</h2>
          <p>
            Veľký zážitok. Väčšie nákupy. Supermarkety musia zákazníkom poskytovať
            vysokokvalitný zážitok. FWIP uľahčuje ponuku prémiovej zmrzliny rýchlo a efektívne.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">Malé obchody</h2>
          <p>
            Malý priestor, veľký zisk. FWIP umožňuje ponúkať rôzne zážitky aj v
            malých prevádzkach, jednoducho udržiavateľné a vysoko ziskové.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">Čerpacie stanice</h2>
          <p>
            Vysoká kvalita, viac zákazníkov. FWIP ponúka jedinečné prémiové zmrzliny pre zákazníkov na cestách.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">Kaviarne a reštaurácie</h2>
          <p>
            Rozšírte si sortiment dezertov a zvýšte príjmy rýchlo a jednoducho. FWIP podporuje
            kreativitu personálu a každá prevádzka môže ponúknuť kvalitné dezerty.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">FWIP sa prispôsobí každej prevádzke</h2>
          <p>
            Hotely, rekreačné strediská, maloobchodné prevádzky, reštaurácie, kúpaliská,
            zoologické záhrady, catering – FWIP funguje všade.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-4">Kontakt</h2>
          <p>Telefón: +421 902 200 971</p>
          <p>Košice, Slovensko</p>
          <p>Email: slovakia@fwip.com</p>
        </section>

        <Footer />
      </main>
    </>
  );
}