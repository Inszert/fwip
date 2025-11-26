"use client";
import React, { useState, useEffect } from "react";

interface SurroundingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  image?: ImageData;
}

interface Point {
  id: number;
  textField1: string;
  textField2: string;
  textField3?: string | null;
  image?: ImageData;
}

interface ImageData {
  id: number;
  url: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width?: number;
  height?: number;
  formats?: any;
}

interface PortobelloMiddle {
  id: number;
  text1: string;
  text2: string;
  text3: string;
  backgorund?: ImageData[];
  image?: ImageData[];
  sorunding_elements?: SurroundingElement[];
  points?: Point[];
}

interface Props {
  data: PortobelloMiddle;
}

export default function PortobelloGreen({ data }: Props) {
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check screen width on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "";

  const bgImageUrl = data.image?.[0]?.url 
    ? `${baseUrl}${data.image[0].url}` 
    : "";

  const sectionBgImageUrl = data.backgorund?.[0]?.url 
    ? `${baseUrl}${data.backgorund[0].url}` 
    : "";

  return (
    <section
      className="w-full h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        height: "100vh",
        backgroundImage: sectionBgImageUrl ? `url(${sectionBgImageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-between relative">

        {/* Main image stays fixed - responsive height */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] sm:h-[70%] lg:h-[75%] flex justify-center items-end pointer-events-none">
          {bgImageUrl ? (
            <div className="relative flex justify-center items-end w-full h-full">
              {/* Ingredients - behind the main image on mobile */}
              {(data.sorunding_elements || []).map((element) => {
                const { id, x, y, size, rotation } = element;
                const elementImageUrl = element.image?.url
                  ? `${baseUrl}${element.image.url}`
                  : null;

                const left = 50 + (x - 50) * 0.3 + mouseOffset.x;
                const top = 50 + (y - 50) * 0.3 + mouseOffset.y;

                return (
                  <div
                    key={id}
                    className="absolute"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      width: `${Math.max(size * 0.7, 80)}px`,
                      height: `${Math.max(size * 0.7, 80)}px`,
                      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                      transition: "left 0.2s ease, top 0.2s ease, transform 0.2s ease",
                      zIndex: isMobile ? 5 : 20, // Behind on mobile, in front on desktop
                    }}
                  >
                    {elementImageUrl ? (
                      <img
                        src={elementImageUrl}
                        alt="Surrounding element"
                        className="w-full h-full object-contain drop-shadow-lg"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-full h-full bg-white/90 rounded-full opacity-90 shadow-lg" />
                    )}
                  </div>
                );
              })}

              {/* Main image */}
              <img
                src={bgImageUrl}
                alt="Portobello product"
                className="w-full h-full object-contain relative z-10"
                draggable={false}
                style={{
                  maxHeight: "none",
                  objectPosition: "center bottom",
                  marginBottom: "-1%",
                }}
              />
            </div>
          ) : (
            <div className="text-center text-white text-sm py-8 drop-shadow-md">
              Image not available
            </div>
          )}
        </div>

        {/* TEXT CONTENT - Responsive but maintains side-by-side layout */}
        <div
          className="relative z-30 w-full flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 lg:pt-0"
          style={{ transform: "translateY(15%)" }}
        >
          {/* Left Text */}
          <div className="flex-1 flex flex-col space-y-3 sm:space-y-4 lg:space-y-6 max-w-md">
            <p className="text-sm sm:text-base lg:text-xl font-semibold text-white uppercase tracking-widest bg-black/30 px-3 py-1 sm:px-4 sm:py-2 rounded inline-block">
              {data.text1}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
              {data.text2}
            </h2>
            <p className="text-base sm:text-lg lg:text-2xl text-white/90 leading-relaxed drop-shadow-md">
              {data.text3}
            </p>
          </div>

          {/* Right Points - responsive spacing and text */}
          <div
            className="flex-1 flex flex-col space-y-3 sm:space-y-4 lg:space-y-5 max-w-md"
            style={{ transform: "translateY(10%)" }}
          >
            {(data.points || []).map((point) => {
              const pointImageUrl = point.image?.url
                ? `${baseUrl}${point.image.url}`
                : null;

              return (
                <div key={point.id} className="flex items-start space-x-3 sm:space-x-4 lg:space-x-6 py-1 sm:py-2">
                  {pointImageUrl && (
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex items-center justify-center">
                      <img
                        src={pointImageUrl}
                        alt=""
                        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
                        draggable={false}
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <p className="font-bold text-lg sm:text-xl lg:text-3xl text-white mb-1 drop-shadow-md">
                      {point.textField1}
                    </p>
                    <p className="text-sm sm:text-base lg:text-xl text-white/90 leading-relaxed drop-shadow-sm">
                      {point.textField2}
                    </p>
                    {point.textField3 && (
                      <p className="text-xs sm:text-sm lg:text-lg text-white/80 font-medium mt-1 drop-shadow-sm">
                        {point.textField3}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}