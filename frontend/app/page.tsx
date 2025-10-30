import Header from "@/components/Header";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import SignatureRecipes from "@/components/SignatureRecipes";
import MainPrimary from "@/components/MainPrimary";

import {
  fetchHeaderData,
  fetchHeroVideo,
  fetchMainBody,
  HeaderData,
  HeroVideo as HeroVideoType,
} from "@/lib/strapi";

export default async function Home() {
  let headerData: HeaderData = { button: [], image: null };
  let heroVideo: HeroVideoType | null = null;
  let mainBody: any = null;

  try {
    headerData = await fetchHeaderData();
    heroVideo = await fetchHeroVideo();
    const mainData = await fetchMainBody();
    mainBody = mainData?.data?.[0]?.mainPrimaryContent || null;
  } catch (err) {
    console.error("Chyba pri načítaní:", err);
  }

  return (
    <main>
      {/* Header */}
      <Header
        subtitle={headerData.subtitle}
        buttons={headerData.button}
        image={headerData.image}
      />

      {/* Hero Video Background with dynamic Strapi text */}
      {heroVideo?.video?.url && (
        <section className="mb-8">
          <HeroVideoBackground
            key={heroVideo.video.url} // Forces remount when video changes
            videoUrl={heroVideo.video.url}
            textField1={heroVideo.textField1}
            textField2={heroVideo.textField2}
            textField3={heroVideo.textField3}
          />
        </section>
      )}

      {/* Main Primary Section */}
      {mainBody && (
        <MainPrimary
          title={mainBody.title}
          content={mainBody.content}
          imageUrl={`${process.env.NEXT_PUBLIC_STRAPI_URL}${mainBody.image?.url}`}
        />
      )}

      {/* Signature Recipes */}
      <SignatureRecipes />

      <div className="p-6">
        <p>Other page content goes here...</p>
      </div>
    </main>
  );
}
