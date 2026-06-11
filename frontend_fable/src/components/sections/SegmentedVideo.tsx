import { useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { VideoSegment } from '../../types'

interface SegmentedVideoProps {
  videoUrl: string
  segments: VideoSegment[]
}

/**
 * One source video "cut" into full-screen parts: each part loops its own
 * [start_time, end_time] window and overlays text on the left/right/center.
 * Port of the original CutVideoIceCream behaviour.
 */
function SegmentPart({ videoUrl, segment }: { videoUrl: string; segment: VideoSegment }) {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { amount: 0.15 })
  const prefersReduced = useReducedMotion()

  // Play only while on screen, always inside the segment window
  useEffect(() => {
    const video = ref.current
    if (!video || prefersReduced) return
    if (inView) {
      if (Math.abs(video.currentTime - segment.start_time) > 0.1 && video.paused) {
        video.currentTime = segment.start_time
      }
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [inView, prefersReduced, segment.start_time])

  const handleTimeUpdate = () => {
    const video = ref.current
    if (video && video.currentTime >= segment.end_time) {
      video.currentTime = segment.start_time
      if (!prefersReduced) video.play().catch(() => {})
    }
  }

  const alignment =
    segment.side === 'left'
      ? 'justify-start text-left'
      : segment.side === 'right'
        ? 'justify-end text-right'
        : 'justify-center text-center'

  return (
    <div className="relative w-full h-screen bg-dark overflow-hidden">
      <video
        ref={ref}
        className="absolute inset-0 w-full h-full object-cover"
        src={videoUrl}
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        aria-hidden="true"
      />
      {/* Soft gradient on the text side for readability */}
      <div
        className={`absolute inset-0 ${
          segment.side === 'left'
            ? 'bg-gradient-to-r from-dark/55 via-transparent to-transparent'
            : segment.side === 'right'
              ? 'bg-gradient-to-l from-dark/55 via-transparent to-transparent'
              : 'bg-dark/30'
        }`}
        aria-hidden="true"
      />

      {(segment.text1 || segment.text2) && (
        <div className={`absolute inset-0 flex items-center ${alignment} px-6 md:px-16 lg:px-24`}>
          <div className="max-w-xl">
            {segment.text1 && (
              <h3 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-wide drop-shadow-lg">
                {segment.text1}
              </h3>
            )}
            {segment.text2 && (
              <p className="text-white/90 text-base md:text-xl mt-4 md:mt-6 leading-relaxed drop-shadow">
                {segment.text2}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SegmentedVideo({ videoUrl, segments }: SegmentedVideoProps) {
  if (!videoUrl || segments.length === 0) return null
  return (
    <section aria-label="Predstavenie produktov">
      {segments.map((segment, i) => (
        <SegmentPart key={`${segment.start_time}-${i}`} videoUrl={videoUrl} segment={segment} />
      ))}
    </section>
  )
}
