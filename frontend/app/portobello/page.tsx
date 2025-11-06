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
      <Header
        subtitle={headerData.subtitle}
        buttons={headerData.button}
        image={headerData.image}
      />
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
      <Footer
        phoneNumber={footerData?.phoneNumber || ""}
        location={footerData?.location || ""}
        optionalSlots={footerData?.footer_opt?.map(slot => (
          <div key={slot.id}>
            <h4 className="font-semibold mb-1">{slot.Title}</h4>
            {slot.description.map((block, i) =>
              block.type === "paragraph" ? (
                <p key={i}>
                  {block.children.map((child, ci) => (
                    <React.Fragment key={ci}>{child.text}</React.Fragment>
                  ))}
                </p>
              ) : null
            )}
          </div>
        )) || []}
        bottomLinks={footerData?.footer_btns?.map(({ id, text, url }) => ({
          text,
          href: url || "#",
        })) || []}
      />
    </main>
  );
}
