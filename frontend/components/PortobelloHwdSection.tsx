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
        {/* Image First - Much Larger */}
        <div className="flex-1 flex items-center justify-center p-4">
          {activeOption && activeOption.image && activeOption.image.url ? (
            <img
              key={`img-${activeIndex}`}
              src={activeOption.image.url}
              alt={activeOption.text || "Product image"}
              className="object-contain transition-all duration-300 ease-in-out w-full h-full max-h-[70vh]"
              onError={(e) => {
                console.error("Image failed to load:", e);
              }}
            />
          ) : (
            <div className="text-white text-2xl">No image available</div>
          )}
        </div>

        {/* Selection Buttons */}
        <div className="flex flex-col justify-center gap-3 px-6 py-4">
          {validOptions.map((option, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={option.id || index}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer font-extrabold uppercase text-white text-2xl sm:text-3xl tracking-tight transition-all duration-300 text-center px-6 py-3 rounded-lg ${
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
        <div className="flex flex-col gap-4 px-6 pb-8 text-center">
          {/* Button */}
          {data.button?.[0] && (
            <a
              href={data.button[0].url}
              style={{ backgroundColor: data.button[0].color || "#000" }}
              className="text-lg sm:text-xl font-bold px-8 py-4 rounded-full shadow-xl text-white hover:brightness-110 hover:scale-105 transition-all duration-300 inline-block"
            >
              {data.button[0].text}
            </a>
          )}

          {/* Main heading */}
          {data.textField1 && (
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-white drop-shadow-lg leading-tight tracking-tight">
              {data.textField1}
            </h1>
          )}

          {/* Subheading */}
          {data.textField2 && (
            <h2
              className="text-2xl sm:text-3xl font-extrabold uppercase drop-shadow-lg tracking-tight"
              style={{ color: "#a855f7" }}
            >
              {data.textField2}
            </h2>
          )}

          {/* Paragraph */}
          {data.textField3 && (
            <p className="text-base sm:text-lg font-sans text-white leading-relaxed">
              {data.textField3}
            </p>
          )}
        </div>
      </div>

      {/* Desktop Layout - MODIFIED: Image pushed more to the right */}
      <div className="hidden lg:flex flex-row items-center h-full w-full">
        {/* LEFT SIDE: Dimensions + Image */}
        <div className="flex flex-row items-center h-full w-2/3 gap-4">
          <div className="flex flex-col justify-center h-full gap-6 pl-32 min-w-fit">
            {validOptions.map((option, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={option.id || index}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`cursor-pointer font-semibold uppercase text-white text-5xl md:text-6xl tracking-tight transition-all duration-300 text-left ${
                    isActive ? "opacity-100 scale-105" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  {option.text}
                </button>
              );
            })}
          </div>

          {/* Image container pushed more to the right */}
          <div className="flex items-center justify-start h-full flex-1 -ml-[25rem] mr-8"> {/* Changed -ml from -36rem to -30rem and added mr-8 */}
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
                  marginLeft: "2rem", // Additional margin to push right
                }}
                onError={(e) => {
                  console.error("Image failed to load:", e);
                }}
              />
            ) : (
              <div className="text-white text-2xl">No image available</div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Content - Adjusted position */}
        <div
          className="absolute right-0 top-0 h-full flex flex-col items-start justify-center"
          style={{ 
            left: "75%", // Changed from 75% to 80% to push content more right
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

          <div className="flex flex-col gap-6 max-w-md">
            {/* Main heading */}
            {data.textField1 && (
              <h1 className="text-3xl md:text-2xl font-extrabold uppercase text-white drop-shadow-lg leading-tight mb-6 tracking-tight whitespace-normal">
                {data.textField1}
              </h1>
            )}

            {/* Subheading */}
            {data.textField2 && (
              <h2
                className="text-5xl md:text-6xl font-extrabold uppercase drop-shadow-lg mb-6 tracking-tight whitespace-normal"
                style={{ color: "#a855f7" }}
              >
                {data.textField2}
              </h2>
            )}

            {/* Paragraph */}
            {data.textField3 && (
              <p className="text-xl md:text-2xl font-sans text-white leading-relaxed">
                {data.textField3}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}