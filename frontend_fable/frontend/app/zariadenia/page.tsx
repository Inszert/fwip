import Head from "next/head";
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
export const dynamic = "force-dynamic";
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
    console.error("Chyba pri načítaní dát:", error);
  }

  const paragraphs = zariadeniaData?.text3
    ? zariadeniaData.text3
        .split(". ")
        .filter(Boolean)
        .map((p: string) => (p.endsWith(".") ? p : p + "."))
    : ["", "", ""];

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
    <>
      <Head>
        <title>FWIP Zariadenia - fwip.sk</title>
        <meta
          name="description"
          content="FWIP.sk ponúka zariadenia na výrobu prémiovej zmrzliny pre kaviarne, reštaurácie a ďalšie prevádzky. Jednoduché, efektívne a kvalitné riešenia pre vašu prevádzku."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="FWIP Zariadenia - fwip.sk" />
        <meta
          property="og:description"
          content="FWIP.sk ponúka zariadenia na výrobu prémiovej zmrzliny pre kaviarne, reštaurácie a ďalšie prevádzky. Jednoduché, efektívne a kvalitné riešenia pre vašu prevádzku."
        />
        <meta property="og:url" content="https://fwip.sk/zariadenia" />
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

        <TopSectionZariadenia
          backgroundImage={zariadeniaData?.main_image?.[0]?.url || ""}
          title={zariadeniaData?.text1 || ""}
          subtitle={zariadeniaData?.text2 || ""}
          paragraphs={paragraphs}
        />

        <PurpleCenteredCard units={mappedUnits} />

        <Footer />
      </main>
    </>
  );
}