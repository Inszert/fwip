import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopSectionZariadenia from "@/components/TopSectionZariadenia";
import PurpleSectionBase from "@/components/SecondSectionZariadenia";
import { 
  fetchHeaderData, 
  fetchFooterData, 
  fetchZariadeniaData, 
  HeaderData, 
  FooterData 
} from "@/lib/strapi";

export default async function ZariadeniaPage() {
  let headerData: HeaderData = { button: [], image: null, subtitle: "" };
  let footerData: FooterData | null = null;
  let zariadeniaData = null;

  try {
    headerData = await fetchHeaderData();
    footerData = await fetchFooterData();
    const zariadeniaResponse = await fetchZariadeniaData();
    zariadeniaData = zariadeniaResponse?.data?.[0] || null;
    
    console.log("Fetched zariadenia data:", zariadeniaData);
  } catch (error) {
    console.error("Error fetching header or footer data:", error);
  }

  // Získanie URL obrázka z main_image poľa
  const backgroundImageUrl = zariadeniaData?.main_image?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${zariadeniaData.main_image[0].url}`
    : "/images/default-bg.jpg";

  // Rozdelenie text3 na odseky
  const paragraphs = zariadeniaData?.text3 ? 
    zariadeniaData.text3.split('. ').filter(Boolean).map(paragraph => 
      paragraph.endsWith('.') ? paragraph : paragraph + '.'
    ) : [
      "This is the first paragraph of the Zariadenia section.",
      "This is the second paragraph, providing more details.",
      "Finally, this is the last paragraph with important information."
    ];

  return (
    <main className="min-h-screen flex flex-col justify-between bg-white">
      <Header
        subtitle={headerData.subtitle}
        buttons={headerData.button}
        image={headerData.image}
      />

      {/* TopSectionZariadenia s dátami z API alebo fallback */}
      <TopSectionZariadenia
        backgroundImage={backgroundImageUrl}
        title={zariadeniaData?.text1 || "Zariadenia Title"}
        subtitle={zariadeniaData?.text2 || "Zariadenia Subtitle"}
        paragraphs={paragraphs}
      />



    <PurpleSectionBase />



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