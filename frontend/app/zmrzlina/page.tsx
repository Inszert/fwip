import Head from "next/head";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroVideoBackgroundIce from "@/components/HeroVideoIce";
import CutVideoIceCream from "@/components/CutVideoIceCream";
import SignatureRecipes from "@/components/SignatureRecipes";
import {
  fetchHeaderData,
  fetchFooterData,
  fetchHeroVideoIceCream,
  fetchHeroVideoToSeparate,
  HeaderData,
  FooterData,
} from "@/lib/strapi";

export default async function ZmrzlinaPage() {
  let headerData: HeaderData = { button: [], image: null, subtitle: "" };
  let footerData: FooterData | null = null;
  let heroVideo: any = null; // pre HeroVideoBackgroundIce
  let heroVideoData: any = null; // pre CutVideoIceCream

  try {
    heroVideo = await fetchHeroVideoIceCream();
    heroVideoData = await fetchHeroVideoToSeparate();
    headerData = await fetchHeaderData();
    footerData = await fetchFooterData();
  } catch (error) {
    console.error("Chyba pri načítaní dát pre Zmrzlinu:", error);
  }

  return (
    <>
      <Head>
        <title>FWIP Zmrzlina - fwip.sk</title>
        <meta
          name="description"
          content="FWIP.sk ponúka prémiovú zmrzlinu pre kaviarne, reštaurácie a ďalšie prevádzky. Objavte signature recepty a kvalitné ingrediencie."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="FWIP Zmrzlina - fwip.sk" />
        <meta
          property="og:description"
          content="FWIP.sk ponúka prémiovú zmrzlinu pre kaviarne, reštaurácie a ďalšie prevádzky. Objavte signature recepty a kvalitné ingrediencie."
        />
        <meta property="og:url" content="https://fwip.sk/zmrzlina" />
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

        {/* Hero video sekcia */}
        {heroVideo?.video?.url && (
          <section>
            <HeroVideoBackgroundIce
              key={heroVideo.video.url}
              videoUrl={heroVideo.video.url}
              textField1={heroVideo.textField1}
              textField2={heroVideo.textField2}
              textField3={heroVideo.textField3}
            />
          </section>
        )}

        {/* CutVideoIceCream sekcia */}
        {heroVideoData?.main_body_video && (
          <CutVideoIceCream
            videoUrl={heroVideoData.main_body_video.video_separ.url}
            segments={heroVideoData.main_body_video.data_for_sep}
          />
        )}

        <SignatureRecipes />

        <Footer />
      </main>
    </>
  );
}