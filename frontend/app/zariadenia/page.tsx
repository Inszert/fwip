import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopSectionZariadenia from "@/components/TopSectionZariadenia";
import PurpleCenteredCard from "@/components/SecondSectionZariadenia";
import {
  fetchHeaderData,
  fetchFooterData,
  fetchZariadeniaData,
  HeaderData,
  FooterData,
} from "@/lib/strapi";

// API unit type
interface UnitPartApi {
  id: number;
  text1: string;
  text2: string;
  text3: string;
  image?: {
    url: string;
    alternativeText?: string | null;
  };
  button?: {
    id: number;
    text: string;
    url: string;
    color?: string;
  };
}

// Component expected type
interface UnitPartMapped {
  id: number;
  text1: string;
  text2: string;
  text3: string;
  image?: {
    url: string;
    alternativeText?: string | null;
  };
  button?: {
    text: string;
    url: string;
    color?: string;
  };
}

export default async function ZariadeniaPage() {
  let headerData: HeaderData = { button: [], image: null, subtitle: "" };
  let footerData: FooterData | null = null;
  let zariadeniaData: any = null;

  try {
    headerData = await fetchHeaderData();
    footerData = await fetchFooterData();
    const zariadeniaResponse = await fetchZariadeniaData();
    zariadeniaData = zariadeniaResponse?.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching header, footer or zariadenia data:", error);
  }

  const backgroundImageUrl = zariadeniaData?.main_image?.[0]?.url
    ? `${zariadeniaData.main_image[0].url}`
    : "/images/default-bg.jpg";

  const paragraphs = zariadeniaData?.text3
    ? zariadeniaData.text3
      .split(". ")
      .filter(Boolean)
      .map((p: string) => (p.endsWith(".") ? p : p + "."))
    : [
      " ",
      " ",
      " ",
    ];

  // Map API units to component type
  const mappedUnits: UnitPartMapped[] =
    zariadeniaData?.units_part?.map((unit: UnitPartApi) => ({
      id: unit.id,
      text1: unit.text1,
      text2: unit.text2,
      text3: unit.text3,
      image: unit.image,
      button: unit.button
        ? { text: unit.button.text, url: unit.button.url, color: unit.button.color }
        : undefined,
    })) || [];

  return (

    <main className="min-h-screen flex flex-col justify-between bg-white">
      <Header />

      <TopSectionZariadenia
        backgroundImage={backgroundImageUrl}
        title={zariadeniaData?.text1 || ""}
        subtitle={zariadeniaData?.text2 || ""}
        paragraphs={paragraphs}
      />

      <PurpleCenteredCard units={mappedUnits} />

      <Footer
      />
    </main>
  );
}
