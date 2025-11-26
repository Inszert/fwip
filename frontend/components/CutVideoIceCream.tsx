"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface VideoSegment {
  start_time: number;
  end_time: number;
  text1: string | null;
  text2: string | null;
  side: string | null; // "left", "right", or null
}

interface CutVideoIceCreamProps {
  videoUrl: string;
  segments: VideoSegment[];
}

const CutVideoIceCream: React.FC<CutVideoIceCreamProps> = ({ videoUrl, segments }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());

  // Intersection Observer with 20% threshold
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    segments.forEach((_, index) => {
      const video = videoRefs.current[index];
      if (!video) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setVisibleIndices((prev) => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(index);
              } else {
                newSet.delete(index);
              }
              return newSet;
            });
          });
        },
        { threshold: 0.01 }
      );
      observer.observe(video);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [segments.length]);

  // Loop strictly within segment; restart playback explicitly
  const handleTimeUpdate = useCallback(
    (index: number, segment: VideoSegment) => {
      const video = videoRefs.current[index];

      if (video && video.currentTime >= segment.end_time) {
        video.currentTime = segment.start_time;
        video.play().catch(() => {});
      }
    },
    []
  );

  // On loaded data or when visibility gained, reset to segment start and play
  useEffect(() => {
    visibleIndices.forEach((index) => {
      const video = videoRefs.current[index];
      const segment = segments[index];
      if (video && segment) {
        // Set currentTime only if significantly different to avoid disrupting playback
        if (Math.abs(video.currentTime - segment.start_time) > 0.1) {
          video.currentTime = segment.start_time;
        }
        video.play().catch(() => {});
      }
    });
  }, [visibleIndices, segments]);

  // Pause videos not visible, delayed pause to reduce flicker on quick scroll
  useEffect(() => {
    const pauseTimeouts: NodeJS.Timeout[] = [];

    videoRefs.current.forEach((video, index) => {
      if (video && !visibleIndices.has(index)) {
        const timeout = setTimeout(() => {
          video.pause();
        }, 200);
        pauseTimeouts.push(timeout);
      }
    });

    return () => pauseTimeouts.forEach(clearTimeout);
  }, [visibleIndices]);

  // Function to render text content for a segment
  const renderSegmentText = (segment: VideoSegment, index: number) => {
    if (!segment.text1 && !segment.text2) return null;

    const textContent = (
      <div className="relative z-15 max-w-2xl p-4 lg:p-8">
        {segment.text1 && (
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white mb-4 lg:mb-6 tracking-wide scale-y-155 relative lg:-top-10">
            {segment.text1}
          </h2>
        )}
        {segment.text2 && (
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white opacity-90 leading-relaxed">
            {segment.text2}
          </p>
        )}
      </div>
    );

    // Mobile layout - text positioned higher
    const mobileLayout = (
      <div className="lg:hidden absolute inset-0 flex items-start justify-center pt-20 sm:pt-24 md:pt-32 px-4">
        {textContent}
      </div>
    );

    // Desktop layout - original positioning
    const desktopLayout = (
      <div className="hidden lg:block">
        {segment.side === "left" ? (
          <div className="absolute inset-0 flex items-center justify-start p-8">
            <div className="ml-70">
              {textContent}
            </div>
          </div>
        ) : segment.side === "right" ? (
          <div className="absolute inset-0 flex items-center justify-end p-8 -top-8">
            <div className="mr-48">
              {textContent}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            {textContent}
          </div>
        )}
      </div>
    );

    return (
      <>
        {mobileLayout}
        {desktopLayout}
      </>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        {segments.map((segment, index) => (
          <div key={index} className="w-full h-screen bg-black relative">
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              className="w-full h-full object-cover"
              muted
              loop={false}
              playsInline
              preload="auto"
              onTimeUpdate={() => handleTimeUpdate(index, segment)}
              style={{ backgroundColor: "#000000" }}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            
            {/* Text overlay */}
            {renderSegmentText(segment, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CutVideoIceCream;