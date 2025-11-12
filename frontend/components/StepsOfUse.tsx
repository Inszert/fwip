"use client";
import React, { useRef, useState } from "react";

interface Video {
  id: number;
  text: string;
  video: {
    id: number;
    url: string;
    name: string;
  };
}

interface Step {
  id: number;
  text1: string;
  text2: string;
  video: Video[];
}

interface Props {
  steps: any;
}

export default function StepBubbles({ steps }: Props) {
  let stepsData: Step[] = [];
  if (Array.isArray(steps)) {
    stepsData = steps;
  } else if (steps?.data && Array.isArray(steps.data)) {
    stepsData = steps.data;
  } else if (steps?.data?.[0]?.video) {
    stepsData = steps.data;
  }

  if (!stepsData || stepsData.length === 0) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-center text-gray-500 text-xl">No steps available</p>
      </section>
    );
  }

  const mainStep = stepsData[0];
  const mainText1 = mainStep?.text1 || "It's as easy as 1, 2, 3";
  const mainText2 = mainStep?.text2 || "Simple steps to get started";
  const videos = mainStep.video || [];

  return (
    <section className="min-h-screen bg-white py-20 px-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 text-left max-w-3xl">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
          {mainText1}
        </h1>
        <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-pink-400 my-8 rounded-full"></div>
        <p className="text-2xl md:text-3xl text-gray-800 font-semibold leading-relaxed">
          {mainText2}
        </p>
      </div>

      {/* Video Bubbles Section */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-16 max-w-7xl mx-auto justify-items-center"
      >
        {videos.map((video, index) => (
          <div key={video.id || index} className="flex flex-col items-center w-full">
            <Bubble video={video} stepText={video.text} />
          </div>
        ))}
      </div>
    </section>
  );
}

interface BubbleProps {
  video: Video;
  stepText: string;
}

function Bubble({ video, stepText }: BubbleProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const handleMouseOver = async () => {
    setIsHovered(true);
    if (videoRef.current && isVideoLoaded && !showFallback) {
      try {
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
      } catch {
        setShowFallback(true);
      }
    }
  };

  const handleMouseOut = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    setShowFallback(false);
  };

  const handleVideoError = () => {
    setIsVideoLoaded(false);
    setShowFallback(true);
  };

  const videoUrl = video?.video?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${video.video.url}`
    : "";

  if (showFallback || !videoUrl) {
    return (
      <div className="flex flex-col items-center group">
        <div className="relative rounded-full border-8 border-gray-200 w-64 h-64 flex items-center justify-center overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-pink-50 transition-all duration-500 group-hover:border-blue-300 group-hover:shadow-2xl">
          <div className="text-center px-4">
            <p className="font-bold text-2xl text-gray-800 mb-3">{stepText}</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <h3 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
            {stepText}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center group">
      <div
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onFocus={handleMouseOver}
        onBlur={handleMouseOut}
        className="flex flex-col items-center cursor-pointer transition-transform duration-500 group-hover:scale-105"
        tabIndex={0}
      >
        <div className="relative rounded-full border-8 border-gray-200 w-64 h-64 flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-blue-300 group-hover:shadow-2xl">
          {/* Slightly zoomed-in video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              ref={videoRef}
              src={videoUrl}
              loop
              muted
              playsInline
              preload="metadata"
              className="w-[94%] h-[94%] object-cover rounded-full"
              onLoadedData={handleVideoLoaded}
              onError={handleVideoError}
            />
          </div>

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-blue-600/40 to-pink-500/40 transition-all duration-500 flex items-center justify-center ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="text-center text-white px-4">
              <p className="font-bold text-2xl drop-shadow-lg mb-3">{stepText}</p>
            </div>
          </div>

          {/* Static background */}
          {!isHovered && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-pink-100 -z-10" />
          )}
        </div>
      </div>

      {/* Step text below bubble */}
      <div className="text-center mt-8">
        <h3 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
          {stepText}
        </h3>
      </div>
    </div>
  );
}
