import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export default async function PrivacyPage() {
  return (
    <main>
      <Header />
      <PrivacyPolicy />
      <Footer />
    </main>
  );
}