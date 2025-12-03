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
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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

  // Function to get object-position based on side for mobile - STRONGER PUSH
  const getVideoObjectPosition = (side: string | null) => {
    if (!isMobile || !side) return "center center";
    
    if (side === "left") {
      return "70% center"; // STRONGER: Shift video further right (was 60%)
    } else if (side === "right") {
      return "30% center"; // STRONGER: Shift video further left (was 40%)
    }
    return "center center";
  };

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

    // Mobile layout - text positioned higher with side positioning - STRONGER PUSH
    const mobileLayout = (
      <div className="lg:hidden absolute inset-0 flex items-start justify-center pt-20 sm:pt-24 md:pt-32">
        {segment.side === "left" ? (
          // LEFT SIDE on mobile - text on left with STRONGER push
          <div className="w-full h-full flex items-start justify-start pl-4 sm:pl-6 md:pl-8">
            {textContent}
          </div>
        ) : segment.side === "right" ? (
          // RIGHT SIDE on mobile - text on right with STRONGER push
          <div className="w-full h-full flex items-start justify-end pr-4 sm:pr-6 md:pr-8">
            {textContent}
          </div>
        ) : (
          // CENTER on mobile
          <div className="w-full h-full flex items-start justify-center px-4">
            {textContent}
          </div>
        )}
      </div>
    );

    // Desktop layout - TEXT PUSHED MORE TO THE EDGES
    const desktopLayout = (
      <div className="hidden lg:block">
        {segment.side === "left" ? (
          // LEFT SIDE - Pushed more to left edge
          <div className="absolute inset-0 flex items-center justify-start">
            <div className="ml-20 pl-10 xl:ml-30 xl:pl-15">
              {textContent}
            </div>
          </div>
        ) : segment.side === "right" ? (
          // RIGHT SIDE - Pushed more to right edge
          <div className="absolute inset-0 flex items-center justify-end">
            <div className="mr-25 pr-8 xl:mr-24 xl:pr-12 -top-8">
              {textContent}
            </div>
          </div>
        ) : (
          // CENTER - Keep centered but adjust positioning
          <div className="absolute inset-0 flex items-center justify-center">
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
              style={{ 
                backgroundColor: "#000000",
                objectPosition: getVideoObjectPosition(segment.side),
                transition: "object-position 0.3s ease-out"
              }}
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