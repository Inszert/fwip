// HeroVideoBackgroundIce.tsx
"use client";

import React, { useEffect, useState } from "react";

interface HeroVideoBackgroundProps {
  videoUrl: string;
  textField1?: string | null;
  textField2?: string | null;
  textField3?: string | null;
}

const HeroVideoBackgroundIce: React.FC<HeroVideoBackgroundProps> = ({
  videoUrl,
  textField1,
  textField2,
  textField3,
}) => {
  const [texts, setTexts] = useState({ t1: textField1, t2: textField2, t3: textField3 });

  useEffect(() => {
    setTexts({ t1: textField1, t2: textField2, t3: textField3 });
  }, [textField1, textField2, textField3]);

  // Use the URL as-is if it already starts with http
  const resolvedUrl = videoUrl.startsWith("http") 
    ? videoUrl 
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${videoUrl}`;

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "#40DDCB" }}>
      <video
        src={resolvedUrl}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <div className="flex-1 flex items-center pl-8 md:pl-16 lg:pl-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl leading-tight mb-6">
              {texts.t1}
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-lg font-semibold">
              {texts.t2}
            </p>
          </div>
        </div>

        <div className="flex justify-end items-end pb-8 md:pb-12 lg:pb-16 pr-8 md:pr-16 lg:pr-24">
          <div className="text-right max-w-lg">
            <p className="text-xl md:text-2xl lg:text-3xl text-white drop-shadow-lg font-medium leading-relaxed">
              {texts.t3}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVideoBackgroundIce;
