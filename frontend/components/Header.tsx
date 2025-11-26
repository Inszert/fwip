"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchHeaderData, HeaderData } from "@/lib/strapi";

const FIXED_HEADER = true;
const SIGNATURE_COLOR = "#40DDCB";

const Header: React.FC = () => {
  const [headerData, setHeaderData] = useState<HeaderData>({
    subtitle: "",
    button: [],
    image: null,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);
  const [activePage, setActivePage] = useState("");
  
  const pathname = usePathname();

  // Update active page when route changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Store current path in sessionStorage
      sessionStorage.setItem('currentPage', pathname);
      setActivePage(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchHeaderData();
        setHeaderData(data);
      } catch {
        console.error("Failed to fetch header data");
      }
    }
    loadData();

    // Get initial active page from sessionStorage
    if (typeof window !== 'undefined') {
      const storedPage = sessionStorage.getItem('currentPage');
      if (storedPage) {
        setActivePage(storedPage);
      }
    }

    const header = document.querySelector("header");
    if (!header) return;

    let ticking = false;

    // Helper: získa prvý nepriehľadný background color na elementoch nad bodom
    const getBackgroundAtPoint = (x: number, y: number) => {
      let el = document.elementFromPoint(x, y) as HTMLElement | null;
      while (el && el !== document.body) {
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          return bg;
        }
        el = el.parentElement;
      }
      return window.getComputedStyle(document.body).backgroundColor;
    };

    const checkBackground = () => {
      if (!header) return;

      const rect = header.getBoundingClientRect();
      const y = rect.bottom + 40; // pár px pod header
      const xPositions = [
        window.innerWidth / 4,
        window.innerWidth / 2,
        (window.innerWidth * 3) / 4,
      ];

      let light = 0;
      for (const x of xPositions) {
        const bgColor = getBackgroundAtPoint(x, y);
        const rgb = bgColor.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          const [r, g, b] = rgb.map(Number);
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          if (brightness > 180) light++; // citlivý prah
        }
      }

      setIsLightBackground(light >= 2);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkBackground();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkBackground);

    setTimeout(checkBackground, 100); // initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkBackground);
    };
  }, []);

  const { subtitle, button, image } = headerData;
  const pinkButtons = button?.filter((btn) => btn.color === "pink") || [];
  const otherButtons = button?.filter((btn) => btn.color !== "pink") || [];

  // Helper function to check if a button is the active page
  const isActivePage = (buttonUrl: string) => {
    if (!buttonUrl || !activePage) return false;
    
    // Remove leading/trailing slashes and compare
    const normalizedButtonUrl = buttonUrl.replace(/^\/+|\/+$/g, '');
    const normalizedActivePage = activePage.replace(/^\/+|\/+$/g, '');
    
    return normalizedButtonUrl === normalizedActivePage || 
           (normalizedActivePage === '' && normalizedButtonUrl === '');
  };

  const textColor = isLightBackground ? "text-[#40DDCB]" : "text-white";
  const activeTextColor = isLightBackground ? "text-white" : "text-[#40DDCB]";
  const subtitleHoverColor = isLightBackground
    ? "group-hover:text-[#40DDCB]/80"
    : "group-hover:text-blue-100";
  const borderColor = isLightBackground ? "border-[#40DDCB]" : "border-transparent";
  const activeBorderColor = isLightBackground ? "border-white" : "border-[#40DDCB]";
  const blueButtonHoverBg = isLightBackground
    ? "group-hover:bg-[#40DDCB]"
    : "group-hover:bg-blue-500";
  const blueButtonHoverText = isLightBackground
    ? "group-hover:text-white"
    : "group-hover:text-white";
  const blueButtonHoverBorder = isLightBackground
    ? "group-hover:border-[#40DDCB]"
    : "group-hover:border-blue-400";
  const otherButtonHoverBg = isLightBackground
    ? "group-hover:bg-[#40DDCB]/20"
    : "group-hover:bg-white/20";
  const otherButtonHoverBorder = isLightBackground
    ? "group-hover:border-[#40DDCB]/30"
    : "group-hover:border-white/30";
  const hamburgerColor = isLightBackground ? "bg-[#40DDCB]" : "bg-white";

  // Active state styles
  const activeButtonBg = isLightBackground ? "bg-[#40DDCB]" : "bg-white";
  const activeButtonText = isLightBackground ? "text-white" : "text-[#40DDCB]";
  const activeButtonBorder = isLightBackground ? "border-white" : "border-[#40DDCB]";

  return (
    <header
      className={`group ${
        FIXED_HEADER ? "fixed" : "static"
      } top-0 left-0 right-0 z-50 bg-transparent py-5 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo + Subtitle */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {image && (
              <Link
                href="/"
                className="relative transition-transform duration-200 hover:scale-110 active:scale-95"
              >
                <Image
                  src={image.url}
                  
                  alt={image.alternativeText || "Logo"}
                  width={60}
                  height={60}
                  className="object-contain transition-all duration-200 w-16 h-16"
                  unoptimized
                />
              </Link>
            )}
            {subtitle && (
              <p
                className={`font-extrabold tracking-wide ${textColor} text-2xl drop-shadow-lg ${subtitleHoverColor} transition-colors duration-300`}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {otherButtons.length > 0 && (
              <div className="flex items-center gap-4">
                {otherButtons.map((btn, index) => {
                  const isActive = isActivePage(btn.url || "");
                  return (
                    <a
                      key={`other-${index}`}
                      href={btn.url || "#"}
                      className={`px-5 py-3 font-bold cursor-pointer flex items-center justify-center min-h-[48px]
                        text-base transition-all duration-200 ease-out rounded-xl border ${
                          isActive 
                            ? `${activeButtonBg} ${activeButtonText} ${activeButtonBorder}`
                            : `${textColor} ${borderColor} ${
                                btn.color === "blue"
                                  ? `bg-transparent ${blueButtonHoverBg} ${blueButtonHoverText} ${blueButtonHoverBorder} hover:scale-102 active:scale-95`
                                  : `bg-transparent ${otherButtonHoverBg} ${otherButtonHoverBorder} hover:scale-102 active:scale-95`
                              }`
                        }`}
                    >
                      {btn.text}
                      {isActive && (
                        <span className="ml-2 w-2 h-2 rounded-full bg-current animate-pulse"></span>
                      )}
                    </a>
                  );
                })}
              </div>
            )}

            {pinkButtons.length > 0 && (
              <div className="flex items-center gap-4">
                {pinkButtons.map((btn, index) => {
                  const isActive = isActivePage(btn.url || "");
                  return (
                    <a
                      key={`pink-${index}`}
                      href={btn.url || "#"}
                      className={`px-6 py-3 font-bold text-base rounded-xl cursor-pointer flex items-center justify-center min-h-[48px] transition-all duration-200 ease-out border ${
                        isActive
                          ? "bg-pink-600 text-white border-pink-300 scale-105"
                          : "bg-pink-500 text-white border-pink-400 hover:scale-102 hover:bg-pink-600"
                      } active:scale-95`}
                    >
                      {btn.text}
                      {isActive && (
                        <span className="ml-2 w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-12 h-12 flex flex-col items-center justify-center transition-all duration-200 active:scale-95"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-7 h-0.5 transition-all duration-200 ${
                menuOpen ? "rotate-45 translate-y-1.5 bg-current" : hamburgerColor
              }`}
            ></span>
            <span
              className={`w-7 h-0.5 my-1.5 transition-all duration-200 ${
                menuOpen ? "opacity-0 bg-current" : hamburgerColor
              }`}
            ></span>
            <span
              className={`w-7 h-0.5 transition-all duration-200 ${
                menuOpen ? "-rotate-45 -translate-y-1.5 bg-current" : hamburgerColor
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-out overflow-hidden ${
            menuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-3 pb-4">
            {otherButtons.map((btn, index) => {
              const isActive = isActivePage(btn.url || "");
              return (
                <a
                  key={`other-mobile-${index}`}
                  href={btn.url || "#"}
                  className={`w-full px-6 py-4 font-bold text-base cursor-pointer flex items-center justify-center min-h-[48px] transition-all duration-200 rounded-xl border ${
                    isActive
                      ? "bg-[#40DDCB] text-white border-[#40DDCB] scale-105"
                      : btn.color === "blue"
                      ? `bg-blue-500 text-white border border-blue-400 hover:bg-blue-600 active:scale-95`
                      : `bg-white/20 ${textColor} border border-white/30 backdrop-blur-sm hover:bg-white/30 active:scale-95`
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {btn.text}
                  {isActive && (
                    <span className="ml-2 w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  )}
                </a>
              );
            })}

            {pinkButtons.map((btn, index) => {
              const isActive = isActivePage(btn.url || "");
              return (
                <a
                  key={`pink-mobile-${index}`}
                  href={btn.url || "#"}
                  className={`w-full px-6 py-4 font-bold text-base rounded-xl cursor-pointer flex items-center justify-center min-h-[48px] transition-all duration-200 border ${
                    isActive
                      ? "bg-pink-600 text-white border-pink-300 scale-105"
                      : "bg-pink-500 text-white border border-pink-400 hover:bg-pink-600 active:scale-95"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {btn.text}
                  {isActive && (
                    <span className="ml-2 w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Border Gradient */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent ${
          isLightBackground ? "via-[#40DDCB]/50" : "via-blue-400/50"
        } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>
    </header>
  );
};

export default Header;