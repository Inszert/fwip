"use client";
import React, { useRef, useState, useEffect } from "react";

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
      <section className="min-h-screen bg-white flex items-center justify-center font-inter">
        <p className="text-center text-gray-500 text-xl">No steps available</p>
      </section>
    );
  }

  const mainStep = stepsData[0];
  const mainText1 = mainStep?.text1 || "It's as easy as 1, 2, 3";
  const mainText2 = mainStep?.text2 || "Simple steps to get started";
  const videos = mainStep.video || [];

  return (
    <section className="min-h-screen bg-white py-12 md:py-20 px-4 sm:px-6 font-inter">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16 text-left max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent font-inter">
          {mainText1}
        </h1>
        <div className="w-24 md:w-32 h-1.5 bg-gradient-to-r from-blue-500 to-pink-400 my-6 md:my-8 rounded-full"></div>
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-800 font-medium leading-relaxed font-inter">
          {mainText2}
        </p>
      </div>

      {/* Video Bubbles Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 max-w-7xl mx-auto justify-items-center">
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
  const [showFallback, setShowFallback] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isPlayingRef = useRef(false);

const videoUrl = video?.video?.url || "";


  // Reset states when videoUrl changes
  useEffect(() => {
    setHasError(false);
    setShowFallback(false);
    isPlayingRef.current = false;
  }, [videoUrl]);

  const handleMouseOver = async () => {
    setIsHovered(true);
    if (videoRef.current && videoUrl && !hasError && !isPlayingRef.current) {
      try {
        isPlayingRef.current = true;
        
        // Ensure video is loaded and ready
        if (videoRef.current.readyState < 3) {
          videoRef.current.load();
        }
        
        videoRef.current.currentTime = 0;
        
        // Use await to properly handle the promise
        await videoRef.current.play();
        
      } catch (error) {
        console.error("Video play failed:", error);
        setHasError(true);
        setShowFallback(true);
        isPlayingRef.current = false;
      }
    }
  };

  const handleMouseOut = () => {
    setIsHovered(false);
    if (videoRef.current && isPlayingRef.current) {
      isPlayingRef.current = false;
      
      // Use a small timeout to ensure play() has completed
      setTimeout(() => {
        if (videoRef.current && !isPlayingRef.current) {
          try {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          } catch (error) {
            console.error("Video pause error:", error);
          }
        }
      }, 50);
    }
  };

  const handleVideoError = () => {
    console.error("Video failed to load");
    setHasError(true);
    setShowFallback(true);
    isPlayingRef.current = false;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      isPlayingRef.current = false;
    };
  }, []);

  if (showFallback || hasError || !videoUrl) {
    return (
      <div className="flex flex-col items-center group">
        <div className="relative rounded-full border-6 sm:border-8 border-gray-200 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center overflow-hidden shadow-xl sm:shadow-2xl bg-gradient-to-br from-blue-50 to-pink-50">
          <div className="text-center px-4">
            <p className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-800 mb-2 sm:mb-3 font-inter">{stepText}</p>
          </div>
        </div>
        <div className="text-center mt-6 sm:mt-8">

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
        <div className="relative rounded-full border-6 sm:border-8 border-gray-200 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center overflow-hidden shadow-xl sm:shadow-2xl">
          <video
            ref={videoRef}
            src={videoUrl}
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover rounded-full"
            onError={handleVideoError}
            onPlay={() => {
              isPlayingRef.current = true;
            }}
            onPause={() => {
              isPlayingRef.current = false;
            }}
          />

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-blue-600/40 to-pink-500/40 transition-all duration-500 flex items-center justify-center ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="font-semibold text-lg sm:text-xl md:text-2xl text-white drop-shadow-lg font-inter text-center px-2">{stepText}</p>
          </div>

          {!isHovered && <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-pink-100 -z-10" />}
        </div>
      </div>
      <div className="text-center mt-6 sm:mt-8">

      </div>
    </div>
  );
}