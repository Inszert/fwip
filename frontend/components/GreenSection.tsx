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
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 700);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseOffset({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  const handleMouseLeave = () => setMouseOffset({ x: 0, y: 0 });

  const baseUrl = "";
  const bgImageUrl = data.image?.[0]?.url ? `${baseUrl}${data.image[0].url}` : "";
  const sectionBgImageUrl = data.backgorund?.[0]?.url ? `${baseUrl}${data.backgorund[0].url}` : "";

  if (isMobile) {
    // MOBILE VERSION
    return (
      <section
        className="relative w-full flex flex-col justify-start overflow-visible px-4 sm:px-6"
        style={{
          minHeight: "100vh",
          backgroundImage: sectionBgImageUrl ? `url(${sectionBgImageUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-between relative py-12 sm:py-16 lg:py-20">

          {/* TEXT CONTENT */}
          <div className="w-full flex flex-col items-start gap-4 sm:gap-6 relative z-20">
            <p className="text-sm sm:text-base lg:text-xl font-semibold text-white uppercase tracking-widest bg-black/30 px-3 py-1 sm:px-4 sm:py-2 rounded inline-block">
              {data.text1}
            </p>
            <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-tight drop-shadow-2xl">
              {data.text2}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed drop-shadow-md">
              {data.text3}
            </p>

            {/* POINTS WITH SMALL IMAGES */}
            {(data.points || []).map((point) => (
              <div key={point.id} className="flex flex-row items-start space-x-3 sm:space-x-4 lg:space-x-6 mt-4">
                {point.image?.url && (
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex items-center justify-center">
                    <img
                      src={point.image.url}
                      alt={point.textField1 || ""}
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
            ))}
          </div>

          {/* MAIN IMAGE - bigger on mobile */}
          {bgImageUrl && (
            <div className="w-full flex justify-center mt-8 sm:mt-12 lg:mt-16 relative z-10">
              <img
                src={bgImageUrl}
                alt={data.text2 || "Portobello product"}
                className="w-full max-w-md sm:max-w-lg object-contain"
                draggable={false}
                style={{
                  transform: "scale(1.25)", // väčší ako predtým
                }}
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  // PC VERSION - original absolute layout
  return (
    <section
      className="w-full h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage: sectionBgImageUrl ? `url(${sectionBgImageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-between relative">
        {/* Main image and surrounding elements */}
        <div className="absolute bottom-0 left-0 w-full h-[70%] sm:h-[80%] lg:h-[85%] flex justify-center items-end pointer-events-none">
          {bgImageUrl ? (
            <div className="relative flex justify-center items-end w-full h-full">
              {(data.sorunding_elements || []).map((element) => {
                const elementImageUrl = element.image?.url ? `${baseUrl}${element.image.url}` : null;
                const left = 50 + (element.x - 50) * 0.3 + mouseOffset.x;
                const top = 50 + (element.y - 50) * 0.3 + mouseOffset.y;

                return (
                  <div
                    key={element.id}
                    className="absolute"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      width: `${Math.max(element.size * 1.1, 120)}px`,
                      height: `${Math.max(element.size * 1.1, 120)}px`,
                      transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
                      transition: "left 0.2s ease, top 0.2s ease, transform 0.2s ease",
                      zIndex: 20,
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

              <img
                src={bgImageUrl}
                alt={data.text2 || "Portobello product"}
                className="w-full h-full object-contain relative z-10"
                draggable={false}
                style={{
                  maxHeight: "none",
                  objectPosition: "center bottom",
                  transform: "scale(1.15)",
                  transformOrigin: "center bottom",
                  marginBottom: "-5%",
                }}
              />
            </div>
          ) : (
            <div className="text-center text-white text-sm py-8 drop-shadow-md">
              Image not available
            </div>
          )}
        </div>

        {/* TEXT CONTENT */}
        <div className="relative z-30 w-full flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 lg:gap-8 pt-8 sm:pt-10 lg:pt-12">
          <div className="flex-1 flex flex-col space-y-3 sm:space-y-4 lg:space-y-6 max-w-md">
            <p className="text-sm sm:text-base lg:text-xl font-semibold text-white uppercase tracking-widest bg-black/30 px-3 py-1 sm:px-4 sm:py-2 rounded inline-block">
              {data.text1}
            </p>
            <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-tight drop-shadow-2xl">
              {data.text2}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed drop-shadow-md">
              {data.text3}
            </p>
          </div>

          <div className="flex-1 flex flex-col space-y-3 sm:space-y-4 lg:space-y-5 max-w-md">
            {(data.points || []).map((point) => {
              const pointImageUrl = point.image?.url ? `${baseUrl}${point.image.url}` : null;
              return (
                <div key={point.id} className="flex items-start space-x-3 sm:space-x-4 lg:space-x-6 py-1 sm:py-2">
                  {pointImageUrl && (
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex items-center justify-center">
                      <img
                        src={pointImageUrl}
                        alt={point.textField1 || ""}
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
