import Head from "next/head";
import React from "react";
import Header from "@/components/Header";
import PortobelloSection from "@/components/PortobelloSection";
import PurpleShowcase from "@/components/PurpleShowcase";
import PromoSection from "@/components/PromoSection";
import PortobelloHwdSection from "@/components/PortobelloHwdSection";
import Footer from "@/components/Footer";
import {
  fetchHeaderData,
  fetchPortobelloData,
  fetchPurpleShowcaseData,
  fetchPromoSections,
  fetchPortobelloHwdData,
  fetchFooterData,
  HeaderData,
} from "@/lib/strapi";
export const dynamic = "force-dynamic";
export default async function PortobelloPage() {
  let headerData: HeaderData = { button: [], image: null, subtitle: "" };
  let footerData = null;

  try {
    headerData = await fetchHeaderData();
    footerData = await fetchFooterData();
  } catch (err) {
    console.error("Chyba pri načítaní dát:", err);
  }

  const portobelloData = await fetchPortobelloData();
  const showcaseData = await fetchPurpleShowcaseData();
  const promoSections = await fetchPromoSections();
  const hwdData = await fetchPortobelloHwdData();

  const selectedPromoIndexes = [0, 1, 2, 3, 4];
  const selectedPromoSections = selectedPromoIndexes
    .map(i => promoSections[i])
    .filter(Boolean);

  return (
    <>
      <Head>
        <title>FWIP Portobello - fwip.sk</title>
        <meta
          name="description"
          content="FWIP.sk Portobello – ikonický stroj pre kaviarne a reštaurácie, ktorý umožňuje rýchle a kvalitné podávanie dezertov. Zvýšte príjmy a rozšírte menu jednoducho."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="FWIP Portobello - fwip.sk" />
        <meta
          property="og:description"
          content="FWIP.sk Portobello – ikonický stroj pre kaviarne a reštaurácie, ktorý umožňuje rýchle a kvalitné podávanie dezertov. Zvýšte príjmy a rozšírte menu jednoducho."
        />
        <meta property="og:url" content="https://fwip.sk/portobello" />
        <meta property="og:type" content="website" />

        {/* Schema.org Organization */}
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

        <PortobelloSection data={portobelloData} />

        <PurpleShowcase
          headline={showcaseData.headline}
          features={showcaseData.features}
        />

        {selectedPromoSections.map((promoSection, index) => (
          <PromoSection key={index} data={promoSection} />
        ))}

        {hwdData
          .filter(hwd => hwd.portobelloHwd != null)
          .map(hwd => (
            <PortobelloHwdSection key={hwd.id} data={hwd.portobelloHwd!} />
          ))}

        <Footer />
      </main>
    </>
  );
}