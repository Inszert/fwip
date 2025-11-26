import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfferForm from "@/components/Formular";
import {
  fetchHeaderData,
  fetchPortobelloData,
  fetchPurpleShowcaseData,
  fetchPromoSections,
  fetchPortobelloHwdData,
  fetchFooterData,
  HeaderData,
} from "@/lib/strapi";

export default function KontaktPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-white">
      <Header />
      <OfferForm />
      <Footer />
    </main>
  );
}
