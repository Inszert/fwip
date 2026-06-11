"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function CookieConsentSimple() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Skontrolovať, či už používatel súhlasil s cookies
  useEffect(() => {
    // Zobraziť iba na hlavnej stránke (domovskej)
    if (pathname === "/") {
      const hasConsented = localStorage.getItem("simpleCookieConsent");
      if (!hasConsented) {
        // Počkáme chvíľu, aby sa stránka najprv načítala
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  const handleAccept = () => {
    localStorage.setItem("simpleCookieConsent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-auto z-50">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-lg mx-auto md:mx-0">
        <div className="p-4 flex items-center justify-between gap-4">
          {/* Text */}
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#40DDCB] to-[#2EC4B6] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Naša stránka používa súbory cookies.</span>{" "}
              <Link
                href="/ochrana-osobnych-udajov"
                className="text-[#2EC4B6] hover:text-[#40DDCB] font-medium underline underline-offset-2 transition-colors"
              >
                Viac informácií
              </Link>
            </p>
          </div>

          {/* Tlačidlo OK */}
          <button
            onClick={handleAccept}
            className="flex-shrink-0 bg-gradient-to-r from-[#40DDCB] to-[#2EC4B6] text-white px-5 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity active:scale-95 transition-transform"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}