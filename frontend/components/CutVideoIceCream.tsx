"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface VideoSegment {
  start_time: number;
  end_time: number;
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
        { threshold: 0.2 }
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

  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        {segments.map((segment, index) => (
          <div key={index} className="w-full h-screen bg-black relative">
            <video
              // Use callback ref carefully to avoid resetting video element on each render
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
              // omit onLoadedData to avoid unnecessary resets; handled in effect above
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-lg z-10 text-xs">
              <div>Segment {index + 1}</div>
              <div>
                {segment.start_time}s - {segment.end_time}s
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CutVideoIceCream;
