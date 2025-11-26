
import React from "react";  
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CafeRestaurantsSection from "@/components/CafeRestaurantsSection";
export default function placesPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-white">
      <Header />
      

<CafeRestaurantsSection/>




      <Footer />
    </main>
  );
}
