"use client";
import React, { useRef, useState } from 'react';

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
  console.log("StepBubbles received:", steps);

  // Handle different possible data structures
  let stepsData: Step[] = [];
  
  if (Array.isArray(steps)) {
    stepsData = steps;
  } else if (steps?.data && Array.isArray(steps.data)) {
    stepsData = steps.data;
  } else if (steps?.data?.[0]?.video) {
    stepsData = steps.data;
  }

  console.log("Processed stepsData:", stepsData);

  // Handle empty steps array gracefully
  if (!stepsData || stepsData.length === 0) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>No steps available</p>
        </div>
      </section>
    );
  }

  // Use the first step for header text
  const mainStep = stepsData[0];
  const mainText1 = mainStep?.text1 || "It's as easy as 1, 2, 3";
  const mainText2 = mainStep?.text2 || "Simple steps to get started";

  // Get all videos from the first step
  const videos = mainStep.video || [];

  // Determine grid columns based on number of videos
  const getGridCols = () => {
    const count = videos.length;
    if (count === 1) return 'lg:grid-cols-1';
    if (count === 2) return 'lg:grid-cols-2';
    if (count === 3) return 'lg:grid-cols-3';
    return 'lg:grid-cols-4';
  };

  return (
    <section className="min-h-screen bg-white py-16 px-6">
      {/* Header Section - Left Aligned */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="text-left max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight font-serif">
            {mainText1}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-teal-400 mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light font-sans">
            {mainText2}
          </p>
        </div>
      </div>

      {/* Videos Section - Dynamic grid showing all videos from the first step */}
      <div className={`grid grid-cols-1 md:grid-cols-2 ${getGridCols()} gap-12 lg:gap-16 max-w-7xl mx-auto justify-items-center`}>
        {videos.map((video, index) => (
          <div key={video.id || index} className="flex flex-col items-center w-full">
            {/* Video Bubble - Each video gets its own bubble */}
            <Bubble 
              video={video} 
              stepText={video.text || `Step ${index + 1}`}
            />
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

  const handleMouseOver = () => {
    setIsHovered(true);
    if (videoRef.current && isVideoLoaded && !showFallback) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Video play failed:', error);
          setShowFallback(true);
        });
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
    : '';

  // Fallback content when video fails to load
  if (showFallback || !videoUrl) {
    return (
      <div className="flex flex-col items-center group">
        <div className="relative rounded-full border-8 border-gray-200 w-72 h-72 flex items-center justify-center overflow-hidden shadow-2xl bg-gradient-to-br from-purple-50 to-teal-50 transition-all duration-500 group-hover:border-purple-300 group-hover:shadow-2xl">
          <div className="text-center px-4">
            <p className="font-semibold text-2xl text-gray-800 mb-3 font-sans">{stepText}</p>
            <p className="text-sm text-gray-600 font-sans">Hover to play video</p>
          </div>
        </div>
        {/* Step Text below bubble */}
        <div className="text-center mt-8">
          <h3 className="text-3xl font-normal text-gray-900 mb-2 font-sans bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
            {stepText}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center group">
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onFocus={handleMouseOver}
        onBlur={handleMouseOut}
        className="flex flex-col items-center cursor-pointer transition-all duration-500 group-hover:scale-105"
        tabIndex={0}
      >
        <div className="relative rounded-full border-8 border-gray-200 w-72 h-72 flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-purple-300 group-hover:shadow-2xl">
          {/* Video element */}
          <video
            ref={videoRef}
            src={videoUrl}
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            preload="metadata"
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
          />
          
          {/* Gradient overlay that's always visible but becomes transparent on hover */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-purple-600/40 to-teal-500/40 transition-all duration-500 flex items-center justify-center ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="text-center text-white px-4">
              <p className="font-semibold text-2xl drop-shadow-lg mb-3 font-sans">{stepText}</p>
              <p className="text-sm drop-shadow-lg font-sans">Hover to play</p>
            </div>
          </div>

          {/* Static background that shows when video is not playing */}
          {!isHovered && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-teal-100 -z-10" />
          )}
        </div>
      </div>
      
      {/* Step Text below bubble */}
      <div className="text-center mt-8">
        <h3 className="text-3xl font-normal text-gray-900 mb-2 font-sans bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
          {stepText}
        </h3>
      </div>
    </div>
  );
}