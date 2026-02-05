"use client";

import React, { useEffect, useState } from "react";
import { fetchFooterData, FooterData } from "@/lib/strapi";
import { useRouter } from "next/navigation";

const SIGNATURE_COLOR = "#40DDCB";

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const router = useRouter();

  // ✅ Navigation brain (internal + external links)
  const handleNavigation = (url?: string | null) => {
    if (!url) return;

    const isExternal = /^https?:\/\//i.test(url);

    if (isExternal) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      router.push(`/${url.replace(/^\/+/, "")}`);
    }
  };

  useEffect(() => {
    const getFooter = async () => {
      try {
        const data = await fetchFooterData();
        setFooterData(data);
      } catch (err) {
        console.error("Error fetching footer data:", err);
      }
    };
    getFooter();
  }, []);

  if (!footerData) return null;

  return (
    <footer
      className="bg-gradient-to-b from-[#40DDCB] via-[#13716f] to-[#0a4d4a]"
      aria-label="Site Footer"
    >
      <div className="max-w-7xl mx-auto px-6 py-2 sm:py-3 grid grid-cols-1 sm:grid-cols-6 gap-4 text-white">
        <div className="sm:col-span-2 space-y-1">
          <h3 className="font-bold text-lg tracking-wider">Kontakt</h3>
          <p className="text-sm">
            Telefón:{" "}
            <a
              href={`tel:${footerData.phoneNumber}`}
              className="underline font-semibold hover:text-gray-200 transition"
            >
              {footerData.phoneNumber}
            </a>
          </p>
          <p className="text-sm">{footerData.location}</p>
        </div>

        {footerData.footer_opt?.slice(0, 4).map((slot) => (
          <div key={slot.id} className="sm:col-span-1">
            <h4
              className={`font-semibold mb-1.5 text-lg border-b border-white/30 pb-1 ${
                slot.url ? "cursor-pointer hover:text-gray-200 transition" : ""
              }`}
              onClick={() => handleNavigation(slot.url)}
            >
              {slot.Title}
            </h4>

            <div
              className={`${slot.url ? "cursor-pointer" : ""}`}
              onClick={() => handleNavigation(slot.url)}
            >
              {slot.description?.map((block: any, i: number) =>
                block.type === "paragraph" ? (
                  <p
                    key={i}
                    className={`text-white/90 leading-relaxed text-sm ${
                      slot.url ? "hover:text-gray-200 transition" : ""
                    }`}
                  >
                    {block.children?.map((child: any, ci: number) => (
                      <React.Fragment key={ci}>{child.text}</React.Fragment>
                    ))}
                  </p>
                ) : null
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0a4d4a] border-t border-[#074338]">
        <div className="max-w-7xl mx-auto px-6 py-1 flex flex-wrap gap-2 justify-center">
          {footerData.footer_btns?.map(({ id, text, url }) => (
            <button
              key={id}
              onClick={() => handleNavigation(url)}
              className="px-4 py-1 bg-[#40DDCB] hover:bg-[#32b4a6] rounded-md text-black font-semibold text-sm transition whitespace-nowrap"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
