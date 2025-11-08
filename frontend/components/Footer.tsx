"use client";

import React, { useEffect, useState } from "react";
import { fetchFooterData, FooterData } from "@/lib/strapi";

const SIGNATURE_COLOR = "#40DDCB";

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

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
      <div className="max-w-7xl mx-auto px-6 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-6 gap-8 text-white">
        <div className="sm:col-span-2 space-y-3">
          <h3 className="font-bold text-2xl tracking-wider">Kontakt</h3>
          <p className="text-lg">
            Telefón:{" "}
            <a
              href={`tel:${footerData.phoneNumber}`}
              className="underline font-semibold hover:text-gray-200 transition"
            >
              {footerData.phoneNumber}
            </a>
          </p>
          <p className="text-lg">{footerData.location}</p>
        </div>

        {footerData.footer_opt?.slice(0, 4).map((slot) => (
          <div key={slot.id} className="sm:col-span-1">
            <h4 className="font-semibold mb-3 text-xl border-b border-white/30 pb-2">
              {slot.Title}
            </h4>
            {slot.description.map((block: any, i: number) =>
              block.type === "paragraph" ? (
                <p key={i} className="text-white/90 leading-relaxed text-base">
                  {block.children.map((child: any, ci: number) => (
                    <React.Fragment key={ci}>{child.text}</React.Fragment>
                  ))}
                </p>
              ) : null
            )}
          </div>
        ))}
      </div>

      <div className="bg-[#0a4d4a] border-t border-[#074338]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap gap-4 justify-center">
          {footerData.footer_btns?.map(({ id, text, url }) => (
            <a
              key={id}
              href={url || "#"}
              className="px-6 py-3 bg-[#40DDCB] hover:bg-[#32b4a6] rounded-md text-black font-semibold text-sm transition whitespace-nowrap"
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
