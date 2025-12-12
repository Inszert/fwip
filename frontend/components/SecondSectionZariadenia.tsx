"use client";

import React, { useState, useEffect } from "react";

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
  console.log("Units data in PurpleCenteredCard:", units);

  return (
    <div className="bg-[#7e36e3] min-h-screen flex justify-center items-start relative pt-0 font-sans">
      <div className="bg-[#7e36e3] text-white w-full max-w-[95vw] min-h-[60vh] p-4 md:p-8 lg:p-12">
        <div 
          className="grid gap-8 w-full justify-items-center" 
          style={{ 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            rowGap: "180px"
          }}
        >
          {units?.map((unit) => (
            <div
              key={unit.id}
              className="text-white rounded-2xl p-6 flex flex-col items-center text-center relative bg-transparent"
              style={{ 
                width: "100%", 
                maxWidth: "340px",
                minHeight: "460px",
                marginBottom: "80px"
              }}
            >
              {/* Circle image section */}
              <div className="absolute left-1/2 -top-[160px] -translate-x-1/2 z-10 transition-transform duration-300 hover:scale-105">
                {/* Cyan circle background - 280px */}
                <div className="bg-[#17e4e4] rounded-full w-[280px] h-[280px] relative shadow-xl">
                  {/* Image container - Original image size, scaled up */}
                  <div 
                    className="absolute"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%) scale(.4)" // Only scale changes
                    }}
                  >
                    {unit.image && (
                      <img
                        src={unit.image.url}
                        alt={unit.image.alternativeText || unit.text1}
                        className="max-w-none" // Prevent width constraints
                        style={{
                          width: unit.image.width ? `${unit.image.width}px` : 'auto',
                          height: unit.image.height ? `${unit.image.height}px` : 'auto',
                          display: 'block'
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Card content section */}
              <div className="pt-[130px] flex flex-col justify-start h-full w-full">
                <div className="flex-grow flex flex-col justify-start">
                  <h2 className="text-[1.25rem] font-bold text-[#32e3e3] mb-3 min-h-[36px] tracking-wide line-clamp-2">
                    {unit.text1}
                  </h2>
                  
                  <p className="text-[1rem] text-white mb-4 min-h-[80px] leading-relaxed line-clamp-4">
                    {unit.text2}
                  </p>
                  
                  <p className="text-[0.95rem] text-[#32e3e3] font-bold underline mb-3 min-h-[28px] line-clamp-1">
                    {unit.text3}
                  </p>

                  {unit.button && (
                    <button
                      className="font-bold py-2 px-6 rounded-full text-[1rem] shadow-lg transition-all hover:opacity-90 mt-4"
                      style={{
                        backgroundColor: unit.button.color || "#32e3e3",
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