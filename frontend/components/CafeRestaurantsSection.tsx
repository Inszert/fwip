// CafeRestaurantsSection.tsx

"use client";

import React, { useEffect, useState } from "react";
import { fetchPlaceData, getImageUrl, PlaceData } from "@/lib/strapi";

const CafeRestaurantsSection: React.FC = () => {
  const [data, setData] = useState<PlaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPlaceData();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <>
      {/* Hero sekcia - full 100vh */}
      <section className="relative w-full h-screen">
        {getImageUrl(data.lending_image, "large") && (
          <img
            src={getImageUrl(data.lending_image, "large") ?? undefined}
            alt={data.lending_image?.alternativeText || data.landing_text1}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="relative z-10 flex flex-col justify-center h-full bg-opacity-50 px-6 md:px-12 text-left md:text-left">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 uppercase">
            {data.landing_text1}
          </h1>
          <h2 className="text-white text-xl md:text-2xl max-w-2xl">
            {data.lending_text2}
          </h2>
        </div>
      </section>

      {/* Sekcia s jednotlivými hero sekciami */}
      {data.first_hero_section.map((item, index) => {
        const isImageOnRight = index % 2 === 0;
        const isLast = index === data.first_hero_section.length - 1;
        return (
          <section
            key={item.id}
            style={{ backgroundColor: item.bg_color }}
            className="relative w-full h-screen flex items-center justify-center"
          >
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center h-full">
              {/* Text */}
              <div
                className={`flex-1 text-center md:text-left ${
                  isImageOnRight ? "md:order-1" : "md:order-2"
                }`}
              >
                <h3
                  className="text-3xl md:text-3xl font-bold mb-4"
                  style={{ color: item.text1_color }}
                >
                  {item.text1}
                </h3>
                <h4
                  className="text-2xl md:text-6xl mb-4 font-bold "
                  style={{ color: item.text2_color }}
                >
                  {item.text2}
                </h4>
                <p
                  className="text-xl md:text-2xl"
                  style={{ color: item.text3_color }}
                >
                  {item.text3}
                </p>
              </div>

              {/* Obrázok */}
              {item.image.length > 0 && (
                <div
                  className={`flex-1 flex justify-center ${
                    isImageOnRight ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <img
                    src={getImageUrl(item.image[0], "large") ?? undefined}
                    alt={item.image[0].alternativeText || item.text1}
                    className={`w-full max-w-lg h-auto rounded-lg ${
                      !isLast ? "-mb-16 md:-mb-20" : ""
                    }`}
                  />
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default CafeRestaurantsSection;
