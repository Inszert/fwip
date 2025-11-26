import Header from "@/components/Header";
import PortobelloSection from "@/components/PortobelloSection";
import PurpleShowcase from "@/components/PurpleShowcase";
import PromoSection from "@/components/PromoSection";
import PortobelloHwdSection from "@/components/PortobelloHwdSection"; // nový import
import Footer from "@/components/Footer"; // pridaj import Footer
import React from "react";
import {
  fetchHeaderData,
  fetchPortobelloData,
  fetchPurpleShowcaseData,
  fetchPromoSections,
  fetchPortobelloHwdData, // nová funkcia
  fetchFooterData,        // import fetchFooterData
  HeaderData,
} from "@/lib/strapi";

export default async function PortobelloPage() {
  let headerData: HeaderData = { button: [], image: null, subtitle: "" };
  let footerData = null; // pridaj pre footer data

  try {
    headerData = await fetchHeaderData();
    footerData = await fetchFooterData(); // fetchni footer data
  } catch (err) {
    console.error("Chyba pri načítaní:", err);
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
    <main>
<Header />
      <PortobelloSection data={portobelloData} />
      <PurpleShowcase
        headline={showcaseData.headline}
        features={showcaseData.features}
      />

      {/* Render only selected promo sections, in specified order */}
      {selectedPromoSections.map((promoSection, index) => (
        <PromoSection key={index} data={promoSection} />
      ))}

      {/* HWD section last */}
      {hwdData
        .filter(hwd => hwd.portobelloHwd != null)
        .map(hwd => (
          <PortobelloHwdSection key={hwd.id} data={hwd.portobelloHwd!} />
        ))}

      {/* FOOTER added here */}
      <Footer/>
    </main>
  );
}
