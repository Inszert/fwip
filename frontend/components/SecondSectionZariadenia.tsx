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
  };
  button?: Button; // object, not field
}

export interface ZariadeniaCardProps {
  units?: UnitPart[];
}

const PurpleCenteredCard: React.FC<ZariadeniaCardProps> = ({ units }) => {
  console.log("Units data in PurpleCenteredCard:", units);

  return (
    <div className="bg-[#7e36e3] min-h-screen flex justify-center items-start relative pt-0 font-sans">
      <div className="bg-[#7e36e3] text-white w-[95vw] min-h-[60vh] p-8 md:p-10 lg:p-12 rounded-3xl">
        <div
          className="grid gap-8 w-full justify-items-center"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
        >
          {units?.map((unit) => (
            <div
              key={unit.id}
              className="text-white rounded-2xl p-6 flex flex-col items-center text-center relative overflow-visible bg-transparent"
              style={{ width: 300, height: 460 }}
            >
              {/* Circle image */}
              <div className="absolute left-1/2 -top-[160px] -translate-x-1/2 z-10 transition-transform duration-300 hover:scale-105">
                <div className="bg-[#17e4e4] rounded-full w-[280px] h-[280px] flex items-center justify-center relative shadow-xl overflow-visible">
                  {unit.image && (
                    <img
                      src={unit.image.url}
                      alt={unit.image.alternativeText || unit.text1}
                      className="absolute w-[310px] h-[310px] object-cover rounded-full -top-[15px]"
                    />
                  )}
                </div>
              </div>

              {/* Card content */}
              <div className="pt-[130px] flex flex-col justify-start h-full w-full">
                <div className="flex-grow flex flex-col justify-start">
                  <h2 className="text-[1.25rem] font-bold text-[#32e7e3] mb-2 min-h-[36px] tracking-wide">
                    {unit.text1}
                  </h2>
                  <p className="text-[1rem] text-white mb-3 min-h-[60px] leading-relaxed line-clamp-3">
                    {unit.text2}
                  </p>
                  <p className="text-[0.95rem] text-[#32e7e3] font-bold underline mb-2 min-h-[28px]">
                    {unit.text3}
                  </p>

                  {/* Button moved here, inside text block */}
                  {unit.button && (
                    <button
                      className="font-bold py-2 px-6 rounded-full text-[1rem] shadow-lg transition-all hover:opacity-90 mt-4"
                      style={{
                        backgroundColor: unit.button.color || "#32e7e3",
                        color: "#fff",
                      }}
                      onClick={() => {
                        if (unit.button?.url) {
                          window.open(unit.button.url, "_blank");
                        }
                      }}
                    >
                      {unit.button.text}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurpleCenteredCard;
