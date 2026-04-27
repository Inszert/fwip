import Head from "next/head";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfferForm from "@/components/Formular";

export const dynamic = "force-dynamic";

const SIGNATURE_COLOR = "#40DDCB";

export default function KontaktPage() {
  return (
    <>
      <Head>
        <title>Kontaktujte FWIP - fwip.sk</title>
        <meta
          name="description"
          content="Kontaktujte FWIP.sk pre otázky, spoluprácu alebo ponuky. Vyplňte náš formulár a radi vám odpovieme."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Kontaktujte FWIP - fwip.sk" />
        <meta
          property="og:description"
          content="Kontaktujte FWIP.sk pre otázky, spoluprácu alebo ponuky. Vyplňte náš formulár a radi vám odpovieme."
        />
        <meta property="og:url" content="https://fwip.sk/kontakt" />
        <meta property="og:type" content="website" />

        {/* Schema.org markup bez obrázkov */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FWIP.sk",
              url: "https://fwip.sk",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+421123456789",
                contactType: "customer service",
                email: "slovakia@fwip.sk",
              },
            }),
          }}
        />
      </Head>

      <main
        className="min-h-screen flex flex-col justify-between"
        style={{ backgroundColor: SIGNATURE_COLOR }}
      >
        <Header />
        <OfferForm />
        <Footer />
      </main>
    </>
  );
}