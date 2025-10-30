import Header from "@/components/Header";
import PortobelloSection from "@/components/PortobelloSection";
import PurpleShowcase from "@/components/PurpleShowcase";
import PromoSection from "@/components/PromoSection";
import {
  fetchHeaderData,
  fetchPortobelloData,
  fetchPurpleShowcaseData,
  fetchPromoSections,
  HeaderData,
} from "@/lib/strapi";

export default async function PortobelloPage() {
  let headerData: HeaderData = { button: [], image: null, subtitle: "" };

  try {
    headerData = await fetchHeaderData();
  } catch (err) {
    console.error("Chyba pri načítaní:", err);
  }

  const portobelloData = await fetchPortobelloData();
  const showcaseData = await fetchPurpleShowcaseData();
  const promoSections = await fetchPromoSections(); // This returns an array of all sections

  return (
    <main>
      <Header
        subtitle={headerData.subtitle}
        buttons={headerData.button}
        image={headerData.image}
      />
      <PortobelloSection data={portobelloData} />
      <PurpleShowcase headline={showcaseData.headline} features={showcaseData.features} />

      {/* Render ALL promo sections */}
      {promoSections.map((promoSection, index) => (
        <PromoSection key={index} data={promoSection} />
      ))}
    </main>
  );
}