"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button, HeaderImage } from "@/lib/strapi";

interface HeaderProps {
  subtitle?: string;
  buttons?: Button[];
  image?: HeaderImage | null;
}

const Header: React.FC<HeaderProps> = ({ subtitle, buttons, image }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full group">
      {/* Hamburger button for mobile only */}
      <button
        className="sm:hidden z-50 p-3 text-white fixed top-4 right-4"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        type="button"
      >
        {/* Hamburger icon with animation */}
        <div
          className={`w-6 h-0.5 bg-white mb-1 transition-transform duration-300 ${
            menuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <div
          className={`w-6 h-0.5 bg-white mb-1 transition-opacity duration-300 ${
            menuOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Always-visible button texts - hidden on mobile, pointer events enabled for hover trigger */}
      <div className="hidden sm:flex absolute top-0 left-0 right-0 z-20 flex items-center justify-end pr-4 sm:pr-6 lg:pr-8 xl:pr-12 h-16">
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-end">
          {buttons?.map((btn, i) => (
            <span
              key={i}
              className="font-extrabold text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-[-10px] cursor-default drop-shadow-lg"
            >
              {btn.text}
            </span>
          ))}
        </div>
      </div>

      {/* Header menu: toggle visibility on mobile, hover on desktop */}
      <header
        className={`
          absolute top-0 left-0 right-0 z-40
          bg-gradient-to-r from-[#40DDCB] via-[#3DD4C4] to-[#2EC4B6] text-white shadow-lg
          transform transition-all duration-500 ease-in-out
          ${
            menuOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto -translate-y-full opacity-0 pointer-events-none"
          }
        `}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-5 gap-4 sm:gap-6">
            {/* Logo and subtitle section */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 flex-1 min-w-0">
              {image && (
                <div className="shrink-0 transition-transform duration-300 hover:scale-110 hover:rotate-3">
                  <div className="relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`}
                      alt={image.alternativeText || "Logo"}
                      height={60}
                      width={60}
                      className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)] w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl -z-10 scale-150"></div>
                  </div>
                </div>
              )}
              {subtitle && (
                <div className="min-w-0 flex-1">
                  <p className="text-base sm:text-lg lg:text-xl font-semibold text-white tracking-wide drop-shadow-md line-clamp-2">
                    {subtitle}
                  </p>
                </div>
              )}
            </div>

            {/* Buttons - always clickable */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-end w-full sm:w-auto">
              {buttons?.map((btn, i) => (
                <a
                  key={i}
                  href={btn.url || "#"}
                  className={`
                    relative px-4 sm:px-6 lg:px-7 py-2 sm:py-3 font-semibold text-white
                    transition-all duration-300 ease-out
                    border-2 border-white
                    overflow-visible
                    hover:scale-105 hover:shadow-xl
                    min-h-[44px] flex items-center justify-center
                    w-full sm:w-auto
                    cursor-pointer
                    ${
                      btn.color === "blue"
                        ? "bg-blue-500/90 border-blue-400 hover:bg-blue-600/90 hover:border-blue-500"
                        : btn.color === "pink"
                        ? "bg-pink-500/90 border-pink-400 hover:bg-pink-600/90 hover:border-pink-500"
                        : "bg-white/10 backdrop-blur-sm hover:bg-white/20"
                    }
                  `}
                  style={{
                    borderRadius:
                      btn.color === "blue"
                        ? "12px"
                        : btn.color === "pink"
                        ? "20px 4px 20px 4px"
                        : "4px 20px 4px 20px",
                  }}
                >
                  <span className="relative z-10 text-sm sm:text-base text-center">
                    {btn.text}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"></div>
      </header>
    </div>
  );
};

export default Header;