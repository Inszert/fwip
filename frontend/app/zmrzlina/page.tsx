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

export default async function ZariadeniaPage() {
  let headerData: HeaderData = { button: [], image: null, subtitle: "" };
  let footerData: FooterData | null = null;

  let heroVideo: any = null; // for HeroVideoBackgroundIce
  let heroVideoData: any = null; // for CutVideoIceCream

  try {
    // Fetch header, footer, and hero videos
    heroVideo = await fetchHeroVideoIceCream();
    heroVideoData = await fetchHeroVideoToSeparate();
    headerData = await fetchHeaderData();
    footerData = await fetchFooterData();

    console.log("Fetched hero video data:", heroVideo);
    console.log("Fetched hero video with segments:", heroVideoData);

    return (
      <main className="min-h-screen flex flex-col justify-between bg-white">
<Header />

        {/* Original HeroVideo section */}
        {heroVideo?.video?.url && (
          <section className="">
            <HeroVideoBackgroundIce
              key={heroVideo.video.url}
              videoUrl={heroVideo.video.url}
              textField1={heroVideo.textField1}
              textField2={heroVideo.textField2}
              textField3={heroVideo.textField3}
            />
          </section>
        )}

        {/* New CutVideoIceCream component */}
        {heroVideoData?.main_body_video && (
          <CutVideoIceCream
            videoUrl={heroVideoData.main_body_video.video_separ.url}
            segments={heroVideoData.main_body_video.data_for_sep}
          />
        )}
<SignatureRecipes />
        <Footer/>
        
      </main>
    );
  } catch (error) {
    console.error("Error fetching data for Zariadenia page:", error);
    return <div>Error loading page data.</div>;
  }
}
