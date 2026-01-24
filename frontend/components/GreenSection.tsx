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
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 700);
    };

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

  const bgImageUrl = data.image?.[0]?.url
    ? `${baseUrl}${data.image[0].url}`
    : "";

  const sectionBgImageUrl = data.backgorund?.[0]?.url
    ? `${baseUrl}${data.backgorund[0].url}`
    : "";

  return (
    <section
      className="w-full min-h-[100svh] md:min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage: sectionBgImageUrl
          ? `url(${sectionBgImageUrl})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-between relative">

        {/* MAIN IMAGE */}
        <div className="absolute bottom-0 left-0 w-full h-[70%] sm:h-[80%] lg:h-[85%] flex justify-center items-end pointer-events-none">
          {bgImageUrl && (
            <div className="relative w-full h-full flex justify-center items-end">
              {(data.sorunding_elements || []).map((el) => {
                const left = 50 + (el.x - 50) * 0.3 + mouseOffset.x;
                const top = 50 + (el.y - 50) * 0.3 + mouseOffset.y;

                const elementAlt =
                  el.image?.alternativeText || "Surrounding ingredient";

                return (
                  <div
                    key={el.id}
                    className="absolute"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      width: `${Math.max(
                        el.size * (isMobile ? 0.9 : 1.1),
                        isMobile ? 90 : 120
                      )}px`,
                      height: `${Math.max(
                        el.size * (isMobile ? 0.9 : 1.1),
                        isMobile ? 90 : 120
                      )}px`,
                      transform: `translate(-50%, -50%) rotate(${el.rotation}deg)`,
                      transition: "left 0.2s, top 0.2s",
                      zIndex: isMobile ? 5 : 20,
                    }}
                  >
                    {el.image ? (
                      <img
                        src={`${baseUrl}${el.image.url}`}
                        alt={elementAlt}
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
                  objectPosition: "center bottom",
                  transform: isMobile ? "scale(1.1)" : "scale(1.15)",
                  transformOrigin: "center bottom",
                }}
              />
            </div>
          )}
        </div>

        {/* TEXT */}
        <div
          className="relative z-30 w-full flex flex-col lg:flex-row gap-6 pt-10"
          style={{
            transform: isMobile ? "translateY(-20%)" : "none",
            marginTop: isMobile ? "auto" : "2rem",
          }}
        >
          {/* LEFT */}
          <div className="flex-1 max-w-md space-y-4">
            <p className="text-sm sm:text-base lg:text-xl font-semibold text-white uppercase bg-black/30 px-4 py-2 rounded">
              {data.text1}
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
              {data.text2}
            </h2>
            <p className="text-base sm:text-lg text-white/90">
              {data.text3}
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex-1 max-w-md space-y-4">
            {(data.points || []).map((p) => {
              const pointAlt = p.image?.alternativeText || "Point image";

              return (
                <div key={p.id} className="flex gap-4">
                  {p.image && (
                    <img
                      src={`${baseUrl}${p.image.url}`}
                      alt={pointAlt}
                      className="w-10 h-10 object-contain"
                      draggable={false}
                    />
                  )}
                  <div>
                    <p className="font-bold text-lg sm:text-xl lg:text-3xl text-white">
                      {p.textField1}
                    </p>
                    <p className="text-sm sm:text-base lg:text-xl text-white/90">
                      {p.textField2}
                    </p>
                    {p.textField3 && (
                      <p className="text-xs sm:text-sm lg:text-lg text-white/80">
                        {p.textField3}
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
