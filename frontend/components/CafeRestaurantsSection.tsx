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
    <div className="bg-[#40DDCB] min-h-screen">
      {/* Hero section - full 100vh with blue background */}
      <section className="relative w-full h-screen bg-[#40DDCB]">
        {getImageUrl(data.lending_image, "large") && (
          <img
            src={getImageUrl(data.lending_image, "large") ?? undefined}
            alt={data.lending_image?.alternativeText || data.landing_text1}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        )}
        <div className="relative z-10 flex flex-col justify-center h-full bg-opacity-50 px-4 sm:px-6 md:px-12 text-center md:text-left">
         <h1 
  className="sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 uppercase"
  style={{ color: '#D63484y' }}
>
            {data.landing_text1}
          </h1>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl max-w-4xl mx-auto md:mx-0">
            {data.lending_text2}
          </h2>
        </div>
      </section>

      {/* Section with individual hero sections */}
      {data.first_hero_section.map((item, index) => {
        const isImageOnRight = index % 2 === 0;
        const isLast = index === data.first_hero_section.length - 1;
        const negativeMarginClass = !isLast ? "-mb-8 sm:-mb-12" : "";
        const desktopNegativeMarginClass = !isLast ? "-mb-16 md:-mb-20" : "";
        
        return (
          <section
            key={item.id}
            style={{ backgroundColor: item.bg_color || '#40DDCB' }}
            className="relative w-full min-h-screen lg:h-screen flex items-center justify-center py-12 lg:py-0 overflow-hidden"
          >
            <div className="container mx-auto px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row items-center h-full">
              {/* Mobile Layout - Stacked */}
              <div className="lg:hidden w-full flex flex-col items-center text-center space-y-8">
                {/* Text */}
                <div className="flex-1 max-w-lg">
                  <h3
                    className="text-2xl sm:text-3xl font-bold mb-4"
                    style={{ color: item.text1_color }}
                  >
                    {item.text1}
                  </h3>
                  <h4
                    className="text-2xl sm:text-3xl md:text-4xl mb-4 font-bold"
                    style={{ color: item.text2_color }}
                  >
                    {item.text2}
                  </h4>
                  <p
                    className="text-lg sm:text-xl"
                    style={{ color: item.text3_color }}
                  >
                    {item.text3}
                  </p>
                </div>

                {/* Image */}
                {item.image.length > 0 && (
                  <div className="flex-1 flex justify-center w-full max-w-full">
                    <img
                      src={getImageUrl(item.image[0], "large") ?? undefined}
                      alt={item.image[0].alternativeText || item.text1}
                      className={`w-auto max-w-full h-auto max-h-[70vh] object-contain rounded-lg ${negativeMarginClass}`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:flex flex-col md:flex-row items-center h-full w-full">
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
                    className="text-2xl md:text-6xl mb-4 font-bold"
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

                {/* Image */}
                {item.image.length > 0 && (
                  <div
                    className={`flex-1 flex justify-center items-center w-full max-w-full h-full ${
                      isImageOnRight ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <img
                      src={getImageUrl(item.image[0], "large") ?? undefined}
                      alt={item.image[0].alternativeText || item.text1}
                      className={`w-auto max-w-full h-auto max-h-[70vh] object-contain rounded-lg ${desktopNegativeMarginClass}`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default CafeRestaurantsSection;