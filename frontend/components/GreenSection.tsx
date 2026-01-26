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
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseOffset({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  const baseUrl = "";
  const bgImageUrl = data.image?.[0]?.url ? `${baseUrl}${data.image[0].url}` : "";
  const sectionBgImageUrl = data.backgorund?.[0]?.url
    ? `${baseUrl}${data.backgorund[0].url}`
    : "";

  /* ================= MOBILE ================= */
  if (isMobile) {
    return (
      <section
        className="relative w-full overflow-x-hidden flex flex-col px-4"
        style={{
          minHeight: "100vh",
          backgroundImage: sectionBgImageUrl ? `url(${sectionBgImageUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col py-12">

          <div className="flex flex-col gap-5 z-20">
            <p className="text-sm font-semibold text-white uppercase tracking-widest bg-black/30 px-3 py-1 rounded inline-block">
              {data.text1}
            </p>

            <h2 className="text-xl font-extrabold text-white leading-tight drop-shadow-2xl">
              {data.text2}
            </h2>

            <p className="text-base text-white/90 leading-relaxed drop-shadow-md">
              {data.text3}
            </p>

            {(data.points || []).map((point) => (
              <div key={point.id} className="flex gap-3 mt-4">
                {point.image?.url && (
                  <img
                    src={point.image.url}
                    alt=""
                    className="w-10 h-10 object-contain shrink-0"
                    draggable={false}
                  />
                )}
                <div>
                  <p className="font-bold text-lg text-white">{point.textField1}</p>
                  <p className="text-sm text-white/90">{point.textField2}</p>
                  {point.textField3 && (
                    <p className="text-xs text-white/80">{point.textField3}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {bgImageUrl && (
            <div className="w-full flex justify-center mt-10">
              <img
                src={bgImageUrl}
                alt=""
                className="w-full max-w-md object-contain"
                draggable={false}
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  /* ================= DESKTOP ================= */
  return (
    <section
      className="relative w-full h-screen overflow-x-hidden flex items-center justify-center px-6"
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage: sectionBgImageUrl ? `url(${sectionBgImageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col justify-between relative">

        {/* IMAGE ZONE */}
        <div className="absolute bottom-0 left-0 w-full h-[80%] flex justify-center items-end pointer-events-none">
          <div className="relative w-full h-full flex justify-center items-end">
            {(data.sorunding_elements || []).map((el) => {
              const left = 50 + (el.x - 50) * 0.3 + mouseOffset.x;
              const top = 50 + (el.y - 50) * 0.3 + mouseOffset.y;

              return (
                <div
                  key={el.id}
                  className="absolute"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${Math.max(el.size, 120)}px`,
                    height: `${Math.max(el.size, 120)}px`,
                    transform: `translate(-50%, -50%) rotate(${el.rotation}deg)`,
                  }}
                >
                  {el.image?.url && (
                    <img
                      src={el.image.url}
                      alt=""
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  )}
                </div>
              );
            })}

            {bgImageUrl && (
              <img
                src={bgImageUrl}
                alt=""
                className="w-full h-full object-contain"
                draggable={false}
              />
            )}
          </div>
        </div>

        {/* TEXT */}
        <div className="relative z-30 flex flex-col lg:flex-row justify-between gap-10 pt-12">
          <div className="max-w-md space-y-4">
            <p className="text-sm font-semibold text-white uppercase tracking-widest bg-black/30 px-3 py-1 rounded inline-block">
              {data.text1}
            </p>
            <h2 className="text-3xl font-extrabold text-white">{data.text2}</h2>
            <p className="text-lg text-white/90">{data.text3}</p>
          </div>

          <div className="max-w-md space-y-4">
            {(data.points || []).map((point) => (
              <div key={point.id} className="flex gap-4">
                {point.image?.url && (
                  <img src={point.image.url} alt="" className="w-12 h-12 object-contain" />
                )}
                <div>
                  <p className="font-bold text-xl text-white">{point.textField1}</p>
                  <p className="text-white/90">{point.textField2}</p>
                  {point.textField3 && (
                    <p className="text-sm text-white/70">{point.textField3}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
