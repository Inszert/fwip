import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyPolicy from "@/components/PrivacyPolicy";
export const dynamic = "force-dynamic";
export default async function PrivacyPage() {
  return (
    <main>
      <Header />
      <PrivacyPolicy />
      <Footer />
    </main>
  );
}