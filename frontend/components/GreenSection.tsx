"use client";
import React, { useState } from "react";

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
      className="w-full h-screen flex items-center justify-center px-4 overflow-hidden relative"
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

        {/* Main image stays fixed */}
        <div className="absolute bottom-0 left-0 w-full h-[75%] flex justify-center items-end pointer-events-none">
          {bgImageUrl ? (
            <div className="relative flex justify-center items-end w-full h-full">
              <img
                src={bgImageUrl}
                alt="Portobello product"
                className="w-full h-full object-contain z-10 relative"
                draggable={false}
                style={{
                  maxHeight: "none",
                  objectPosition: "center bottom",
                  marginBottom: "-1%",
                }}
              />

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
                    className="absolute z-20"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      width: `${Math.max(size, 120)}px`,
                      height: `${Math.max(size, 120)}px`,
                      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                      transition: "left 0.2s ease, top 0.2s ease, transform 0.2s ease",
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
            </div>
          ) : (
            <div className="text-center text-white text-sm py-8 drop-shadow-md">
              Image not available
            </div>
          )}
        </div>

        {/* TEXT CONTENT */}
        <div
          className="relative z-30 w-full flex flex-col lg:flex-row items-start justify-between gap-8"
          style={{ transform: "translateY(30%)" }}
        >
          {/* Left Text */}
          <div className="flex-1 flex flex-col space-y-6 max-w-md">
            <p className="text-lg lg:text-xl font-semibold text-white uppercase tracking-widest bg-black/30 px-4 py-2 rounded inline-block">
              {data.text1}
            </p>
            <h2 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
              {data.text2}
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed drop-shadow-md">
              {data.text3}
            </p>
          </div>

          {/* Right Points - moved 15% lower and with tighter spacing */}
          <div
            className="flex-1 flex flex-col space-y-5 max-w-md"
            style={{ transform: "translateY(15%)" }}
          >
            {(data.points || []).map((point) => {
              const pointImageUrl = point.image?.url
                ? `${baseUrl}${point.image.url}`
                : null;

              return (
                <div key={point.id} className="flex items-start space-x-6 py-2">
                  {pointImageUrl && (
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                      <img
                        src={pointImageUrl}
                        alt=""
                        className="w-12 h-12 object-contain"
                        draggable={false}
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <p className="font-bold text-2xl lg:text-3xl text-white mb-1 drop-shadow-md">
                      {point.textField1}
                    </p>
                    <p className="text-xl lg:text-2xl text-white/90 leading-relaxed drop-shadow-sm">
                      {point.textField2}
                    </p>
                    {point.textField3 && (
                      <p className="text-lg text-white/80 font-medium mt-1 drop-shadow-sm">
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
