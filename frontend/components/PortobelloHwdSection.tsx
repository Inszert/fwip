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
      className="w-full h-screen flex flex-row items-center justify-between overflow-hidden relative"
      style={{ backgroundColor: baseColor }}
    >
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
                className={`cursor-pointer font-extrabold uppercase text-white text-5xl md:text-6xl tracking-tight transition-all duration-300 text-left ${
                  isActive ? "opacity-100 scale-105" : "opacity-40 hover:opacity-70"
                }`}
              >
                {option.text}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-start h-full flex-1 -ml-[36rem]">
          {activeOption && activeOption.image && activeOption.image.url ? (
            <img
              key={`img-${activeIndex}`}
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${activeOption.image.url}`}
              alt={activeOption.text || "Product image"}
              className="object-contain transition-all duration-300 ease-in-out"
              style={{
                height: "90vh",
                width: "90vw",
                maxWidth: "none",
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

      {/* RIGHT SIDE: Content */}
      <div
        className="absolute right-0 top-0 h-full flex flex-col items-start justify-center"
        style={{ left: "75%", transform: "translateX(-50%)" }}
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
          {/* Hlavný nadpis - rovnake štýly ako v PromoSection row1 */}
          {data.textField1 && (
            <h1 className="text-5xl md:text-6xl font-extrabold uppercase text-white drop-shadow-lg leading-tight mb-6 tracking-tight whitespace-normal">
              {data.textField1}
            </h1>
          )}

          {/* Podnadpis - rovnake štýly ako v PromoSection row2, pevná farba */}
          {data.textField2 && (
            <h2
              className="text-5xl md:text-6xl font-extrabold uppercase drop-shadow-lg mb-6 tracking-tight whitespace-normal"
              style={{ color: "#a855f7" }}
            >
              {data.textField2}
            </h2>
          )}

          {/* Odstavec - rovnake štýly ako v PromoSection row3 */}
          {data.textField3 && (
            <p className="text-xl md:text-2xl font-sans text-white leading-relaxed">
              {data.textField3}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
