"use client";

import { useState } from "react";
import { PortobelloHwd } from "@/lib/strapi";

interface Props {
  data: PortobelloHwd;
}

export default function PortobelloHwdSection({ data }: Props) {
  const baseColor = "#40DDCB";

  if (!data?.hwdOptions || data.hwdOptions.length === 0) {
    return null;
  }

  const validOptions = data.hwdOptions.filter(opt => opt.text && opt.image);

  if (validOptions.length === 0) {
    return null;
  }

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeOption = validOptions[activeIndex];

  return (
    <section
      className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row items-center justify-between overflow-hidden relative"
      style={{ backgroundColor: baseColor }}
    >
      {/* Mobile & Tablet Layout */}
      <div className="lg:hidden w-full flex flex-col min-h-screen">
        {/* Image */}
        <div className="flex-1 flex items-center justify-center p-4">
          {activeOption && activeOption.image && activeOption.image.url ? (
            <img
              key={`img-${activeIndex}`}
              src={activeOption.image.url}
              alt={activeOption.text || "Product image"}
              className="object-contain transition-all duration-300 ease-in-out w-full h-full max-h-[70vh]"
            />
          ) : (
            <div className="text-white text-2xl">No image available</div>
          )}
        </div>

        {/* Selection Buttons */}
        <div className="flex flex-col justify-center gap-2 px-6 py-4">
          {validOptions.map((option, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={option.id || index}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer font-extrabold uppercase text-white text-xl sm:text-2xl tracking-tight transition-all duration-300 text-center px-6 py-3 rounded-lg ${
                  isActive 
                    ? "opacity-100 scale-105 bg-white/20" 
                    : "opacity-60 hover:opacity-80 bg-white/10"
                }`}
              >
                {option.text}
              </button>
            );
          })}
        </div>

        {/* Content Texts */}
        <div className="flex flex-col px-6 pb-8 text-center">
          {data.button?.[0] && (
            <a
              href={data.button[0].url}
              style={{ backgroundColor: data.button[0].color || "#000" }}
              className="text-lg sm:text-xl font-bold px-8 py-4 rounded-full shadow-xl text-white hover:brightness-110 hover:scale-105 transition-all duration-300 inline-block mb-6"
            >
              {data.button[0].text}
            </a>
          )}

          <div className="flex flex-col">
            {/* Main heading (tf1 same as PromoSection) */}
            {data.textField1 && (
              <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-white drop-shadow-lg leading-tight tracking-tight mb-4">
                {data.textField1}
              </h1>
            )}

            {/* Subheading (tf2 -1 size) */}
            {data.textField2 && (
              <h2
                className="text-xl sm:text-2xl font-extrabold uppercase drop-shadow-lg tracking-tight mb-2"
                style={{ color: "#a855f7" }}
              >
                {data.textField2}
              </h2>
            )}

            {/* Paragraph (tf3 +1 size) */}
            {data.textField3 && (
              <p className="text-xl sm:text-lg font-sans text-white leading-relaxed">
                {data.textField3}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-row items-center h-full w-full">
        {/* LEFT SIDE: Dimensions */}
        <div className="flex flex-row items-center h-full w-2/3 gap-3">
          <div className="flex flex-col justify-center h-full gap-4 pl-32 min-w-fit">
            {validOptions.map((option, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={option.id || index}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`cursor-pointer font-semibold uppercase text-white text-4xl md:text-5xl tracking-tight transition-all duration-300 text-left ${
                    isActive ? "opacity-100 scale-105" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  {option.text}
                </button>
              );
            })}
          </div>

          {/* Image container */}
          <div className="flex items-center justify-start h-full flex-1 -ml-[25rem] mr-8">
            {activeOption && activeOption.image && activeOption.image.url ? (
              <img
                key={`img-${activeIndex}`}
                src={activeOption.image.url}
                alt={activeOption.text || "Product image"}
                className="object-contain transition-all duration-300 ease-in-out"
                style={{
                  height: "90vh",
                  width: "90vw",
                  maxWidth: "none",
                  marginLeft: "2rem",
                }}
              />
            ) : (
              <div className="text-white text-2xl">No image available</div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Content */}
        <div
          className="absolute right-0 top-0 h-full flex flex-col items-start justify-center"
          style={{ 
            left: "75%",
            transform: "translateX(-50%)" 
          }}
        >
          {data.button?.[0] && (
            <a
              href={data.button[0].url}
              style={{ backgroundColor: data.button[0].color || "#000" }}
              className="text-2xl font-bold px-12 py-6 rounded-full shadow-xl text-white hover:brightness-110 hover:scale-105 transition-all duration-300 inline-block mb-12"
            >
              {data.button[0].text}
            </a>
          )}

          <div className="flex flex-col max-w-md">
            {/* Main heading (tf1 same as PromoSection) */}
            {data.textField1 && (
              <h1 className="text-3xl md:text-2xl font-extrabold uppercase text-white drop-shadow-lg leading-tight mb-6 tracking-tight whitespace-normal">
                {data.textField1}
              </h1>
            )}

            {/* Subheading (tf2 -1 size) */}
            {data.textField2 && (
              <h2
                className="text-4xl md:text-5xl font-extrabold uppercase drop-shadow-lg mb-2 tracking-tight whitespace-normal"
                style={{ color: "#a855f7" }}
              >
                {data.textField2}
              </h2>
            )}

            {/* Paragraph (tf3 +1 size) */}
            {data.textField3 && (
              <p className="text-xl md:text-lg font-sans text-white leading-relaxed">
                {data.textField3}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
