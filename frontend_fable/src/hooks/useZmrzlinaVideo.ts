import type { StrapiHeroVideoIceCream, VideoSegment, ZmrzlinaVideoContent } from '../types'
import { useStrapi } from './useStrapi'

const FALLBACK: ZmrzlinaVideoContent = {
  heroVideoUrl: null,
  separVideoUrl: null,
  segments: [],
}

function transform(items: StrapiHeroVideoIceCream[]): ZmrzlinaVideoContent {
  const item = items[0]
  if (!item) return FALLBACK

  const segments: VideoSegment[] = (item.main_body_video?.data_for_sep || []).map((seg) => ({
    start_time: parseFloat(String(seg.start_time)),
    end_time: parseFloat(String(seg.end_time)),
    text1: seg.text1 || null,
    text2: seg.text2 || null,
    side: seg.side || null,
  }))

  return {
    heroVideoUrl: item.video?.[0]?.url || null,
    separVideoUrl: item.main_body_video?.video_separ?.url || null,
    segments,
  }
}

/** Zmrzlina page videos: top hero video + the segmented video with per-part text. */
export function useZmrzlinaVideo() {
  return useStrapi<StrapiHeroVideoIceCream, ZmrzlinaVideoContent>(
    '/api/hero-video-ice-creams?populate[video]=true&populate[main_body_video][populate]=*',
    transform,
    FALLBACK,
  )
}
