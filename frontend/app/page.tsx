import Head from "next/head";
import React from "react";
import Header from "@/components/Header";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import SignatureRecipes from "@/components/SignatureRecipes";
import Footer from "@/components/Footer";
import StepBubbles from "@/components/StepsOfUse";
import ComparisonTableSection from "@/components/Comaprison";
import CookieConsentSimple from "@/components/CookieConsentSimple";
import PortobelloGreen from "@/components/GreenSection";

import {
  fetchHeaderData,
  fetchHeroVideo,
  fetchMainBody,
  fetchFooterData,
  fetchPortobelloMiddles,
  fetchComparisons,
  fetchSteps,
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

const renderRichText = (blocks: RichTextBlock[]) =>
  blocks.map((block, i) => {
    if (block.type === "paragraph") {
      return (
        <p key={i}>
          {block.children.map((child, ci) => (
            <React.Fragment key={ci}>{child.text}</React.Fragment>
          ))}
        </p>
      );
    }
    return null;
  });

export default async function Home() {
  let headerData: HeaderData = { button: [], image: null, subtitle: "" };
  let heroVideo: HeroVideoType | null = null;
  let mainBody: any = null;
  let footerData: any = null;
  let steps: any = null;
  let portobelloData: any = null;
  let comparisons: any = [{}];

  try {
    [headerData, heroVideo, mainBody, footerData, steps, portobelloData] = await Promise.all([
      fetchHeaderData(),
      fetchHeroVideo(),
      fetchMainBody().then(data => data?.data?.[0]?.mainPrimaryContent || null),
      fetchFooterData(),
      fetchSteps(),
      fetchPortobelloMiddles()
    ]);

    comparisons = await fetchComparisons().catch(() => [{}]);
    if (!comparisons || comparisons.length === 0) comparisons = [{}];

  } catch (err) {
    console.error("Chyba pri načítaní dát:", err);
  }

  return (
    <>
      <Head>
        <title>FWIP - prémiová zmrzlina a zariadenia pre prevádzky</title>
        <meta
          name="description"
          content="FWIP.sk ponúka prémiovú zmrzlinu, Portobello stroje a zariadenia pre kaviarne, reštaurácie a hotely. Objavte signature recepty, kroky použitia a porovnanie produktov."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="FWIP - prémiová zmrzlina a zariadenia" />
        <meta
          property="og:description"
          content="FWIP.sk ponúka prémiovú zmrzlinu, Portobello stroje a zariadenia pre kaviarne, reštaurácie a hotely. Objavte signature recepty, kroky použitia a porovnanie produktov."
        />
        <meta property="og:url" content="https://fwip.sk/" />
        <meta property="og:type" content="website" />
    <meta name="google-site-verification" content="CQf3MebeF3y1lc8rt9sf283lJsjZKlG_AxizZYQG1ts" />
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

        {heroVideo?.video?.url && (
          <HeroVideoBackground
            key={heroVideo.video.url}
            videoUrl={heroVideo.video.url}
            textField1={heroVideo.textField1}
            textField2={heroVideo.textField2}
            textField3={heroVideo.textField3}
          />
        )}

        <SignatureRecipes />

        <StepBubbles steps={steps} />

        {portobelloData && portobelloData.length > 0 && (
          <PortobelloGreen data={portobelloData[0]} />
        )}

        <ComparisonTableSection data={comparisons[0] || {}} />

        <CookieConsentSimple />

        <Footer />
      </main>
    </>
  );
}