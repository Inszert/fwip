import React from "react";
import Header from "@/components/Header";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import SignatureRecipes from "@/components/SignatureRecipes";
import MainPrimary from "@/components/MainPrimary";
import Footer from "@/components/Footer";

import {
  fetchHeaderData,
  fetchHeroVideo,
  fetchMainBody,
  fetchFooterData,
  HeaderData,
  HeroVideo as HeroVideoType,
} from "@/lib/strapi";

// Typy pre rich text
interface RichTextChild {
  type: string;
  text: string;
}

interface RichTextBlock {
  type: string;
  children: RichTextChild[];
}

// Funkcia na renderovanie Blokov rich textu
const renderRichText = (blocks: RichTextBlock[]) => {
  return blocks.map((block, i) => {
    if (block.type === "paragraph") {
      return (
        <p key={i}>
          {block.children.map((child: RichTextChild, ci: number) => (
            <React.Fragment key={ci}>{child.text}</React.Fragment>
          ))}
        </p>
      );
    }
    return null;
  });
};

export default async function Home() {
  let headerData: HeaderData = { button: [], image: null, subtitle: "" };
  let heroVideo: HeroVideoType | null = null;
  let mainBody: any = null;
  let footerData = null;

  try {
    headerData = await fetchHeaderData();
    heroVideo = await fetchHeroVideo();
    const mainData = await fetchMainBody();
    mainBody = mainData?.data?.[0]?.mainPrimaryContent || null;

    footerData = await fetchFooterData();

    console.log("Fetched footer data:", footerData);
  } catch (err) {
    console.error("Error loading data:", err);
  }

  const optionalSlots =
    footerData?.footer_opt?.map((slot) => (
      <div key={slot.id}>
        <h4 className="font-semibold mb-1">{slot.Title}</h4>
        {slot.description && renderRichText(slot.description)}
      </div>
    )) || [];

  const bottomLinks =
    footerData?.footer_btns?.map(({ id, text, url }) => ({
      text,
      href: url || "#",
    })) || [];

  return (
    <main>
      <Header
        subtitle={headerData.subtitle}
        buttons={headerData.button}
        image={headerData.image}
      />

      {heroVideo?.video?.url && (
        <section className="mb-8">
          <HeroVideoBackground
            key={heroVideo.video.url}
            videoUrl={heroVideo.video.url}
            textField1={heroVideo.textField1}
            textField2={heroVideo.textField2}
            textField3={heroVideo.textField3}
          />
        </section>
      )}

      {mainBody && (
        <MainPrimary
          title={mainBody.title}
          content={mainBody.content}
          imageUrl={`${process.env.NEXT_PUBLIC_STRAPI_URL}${mainBody.image?.url}`}
        />
      )}

      <SignatureRecipes />

      <Footer
        phoneNumber={footerData?.phoneNumber || ""}
        location={footerData?.location || ""}
        optionalSlots={optionalSlots}
        bottomLinks={bottomLinks}
      />
    </main>
  );
}
