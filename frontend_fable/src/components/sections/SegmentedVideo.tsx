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

  // On mobile the subject sits where the desktop text would be — shift the
  // crop away from the text side, like the original CutVideoIceCream
  const mobileObjectPosition =
    segment.side === 'left'
      ? 'max-lg:object-[90%_center]'
      : segment.side === 'right'
        ? 'max-lg:object-[15%_center]'
        : ''

  return (
    <div className="relative w-full h-screen bg-dark overflow-hidden">
      <video
        ref={ref}
        className={`absolute inset-0 w-full h-full object-cover ${mobileObjectPosition}`}
        src={videoUrl}
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        aria-hidden="true"
      />
      {/* Soft gradient on the text side for readability (desktop) */}
      <div
        className={`hidden lg:block absolute inset-0 ${
          segment.side === 'left'
            ? 'bg-gradient-to-r from-dark/55 via-transparent to-transparent'
            : segment.side === 'right'
              ? 'bg-gradient-to-l from-dark/55 via-transparent to-transparent'
              : 'bg-dark/30'
        }`}
        aria-hidden="true"
      />
      {/* Mobile: gentle top + bottom gradients behind the texts */}
      <div
        className="lg:hidden absolute inset-0 bg-gradient-to-b from-dark/55 via-transparent to-dark/55"
        aria-hidden="true"
      />

      {/* Desktop: text on the segment's side */}
      {(segment.text1 || segment.text2) && (
        <div
          className={`hidden lg:flex absolute inset-0 items-center ${alignment} lg:px-36 xl:px-52`}
        >
          <div className="max-w-xl">
            {segment.text1 && (
              <h3 className="font-display font-bold text-5xl lg:text-7xl text-white tracking-wide drop-shadow-lg">
                {segment.text1}
              </h3>
            )}
            {segment.text2 && (
              <p className="text-white/90 text-xl mt-6 leading-relaxed drop-shadow">
                {segment.text2}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Mobile: big text top, small text bottom */}
      <div className="lg:hidden absolute inset-0">
        {segment.text1 && (
          <div className="absolute top-20 left-0 right-0 px-4">
            <h3 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-wide text-center drop-shadow-lg">
              {segment.text1}
            </h3>
          </div>
        )}
        {segment.text2 && (
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <p className="text-white/90 text-sm sm:text-base leading-relaxed text-center max-w-md mx-auto drop-shadow">
              {segment.text2}
            </p>
          </div>
        )}
      </div>
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
