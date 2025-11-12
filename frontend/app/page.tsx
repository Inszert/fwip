import React from "react";
import Header from "@/components/Header";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import SignatureRecipes from "@/components/SignatureRecipes";
import Footer from "@/components/Footer";
import StepBubbles from "@/components/StepsOfUse";
import { fetchSteps } from "@/lib/strapi";
import {
  fetchHeaderData,
  fetchHeroVideo,
  fetchMainBody,
  fetchFooterData,
  HeaderData,
  HeroVideo as HeroVideoType,
} from "@/lib/strapi";

interface RichTextChild {
  type: string;
  text: string;
}

interface RichTextBlock {
  type: string;
  children: RichTextChild[];
}

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
  let steps = null;

  try {
    [headerData, heroVideo, mainBody, footerData, steps] = await Promise.all([
      fetchHeaderData(),
      fetchHeroVideo(),
      fetchMainBody().then(data => data?.data?.[0]?.mainPrimaryContent || null),
      fetchFooterData(),
      fetchSteps()
    ]);

    console.log("Steps data:", steps);
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
      <Header />

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

      <SignatureRecipes />

      {/* StepBubbles section */}
      {steps && (
        <section className="mb-12">
          <StepBubbles steps={steps} />
        </section>
      )}

      <Footer />
    </main>
  );
}