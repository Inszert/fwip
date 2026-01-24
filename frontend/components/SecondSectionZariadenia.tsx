"use client";

import React from "react";

export interface Button {
  text: string;
  url: string | null;
  color?: string;
}

export interface UnitPart {
  id: number;
  text1: string;
  text2: string;
  text3: string;
  image?: {
    url: string;
    alternativeText?: string | null;
    width?: number;
    height?: number;
  };
  button?: Button;
}

export interface ZariadeniaCardProps {
  units?: UnitPart[];
}

const PurpleCenteredCard: React.FC<ZariadeniaCardProps> = ({ units }) => {
  return (
    <div className="bg-[#7e36e3] min-h-screen flex justify-center items-start font-sans">
      <div className="bg-[#7e36e3] text-white w-full max-w-[95vw] min-h-[60vh] p-4 md:p-6 lg:p-8">
        <div
          className="grid gap-4 w-full justify-items-center"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            rowGap: "120px",
          }}
        >
          {units?.map((unit) => (
            <div
              key={unit.id}
              className="rounded-2xl p-4 flex flex-col items-center text-center relative bg-transparent"
              style={{
                width: "100%",
                maxWidth: "280px",
                minHeight: "380px",
                marginBottom: "60px",
              }}
            >
              {/* Image */}
              <div className="absolute left-1/2 -top-[100px] -translate-x-1/2 z-10 transition-transform duration-300 hover:scale-105">
                <div className="bg-[#17e4e4] rounded-full w-[200px] h-[200px] shadow-xl relative">
                  <div
                    className="absolute"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%) scale(.35)",
                    }}
                  >
                    {unit.image && (
                      <img
                        src={unit.image.url}
                        alt={unit.image.alternativeText || unit.text1}
                        className="max-w-none block"
                        style={{
                          width: unit.image.width
                            ? `${unit.image.width}px`
                            : "auto",
                          height: unit.image.height
                            ? `${unit.image.height}px`
                            : "auto",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-[90px] flex flex-col h-full w-full">
                <h2 className="text-[1.1rem] font-bold text-[#32e3e3] mb-2 tracking-wide line-clamp-none md:line-clamp-2">
                  {unit.text1}
                </h2>

                <p className="text-[0.9rem] mb-3 leading-relaxed line-clamp-none md:line-clamp-4">
                  {unit.text2}
                </p>

                <p className="text-[0.85rem] text-[#32e3e3] font-bold underline mb-2 line-clamp-none md:line-clamp-1">
                  {unit.text3}
                </p>

                {unit.button && (
                  <button
                    className="font-bold py-1.5 px-4 rounded-full text-[0.9rem] shadow-lg transition-opacity hover:opacity-90 mt-auto"
                    style={{
                      backgroundColor: unit.button.color || "#32e3e3",
                      color: "#fff",
                    }}
                    onClick={() =>
                      unit.button?.url &&
                      window.open(unit.button.url, "_blank")
                    }
                  >
                    {unit.button.text}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurpleCenteredCard;
