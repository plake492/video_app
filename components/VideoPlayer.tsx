"use client"

import React from "react"
import { useInView } from "react-intersection-observer"

export default function VideoPlayer({
  videoSrc,
  autoPlay = false,
  loop = false,
  playOnInView = false,
  videoClasseName,
  hideControls = false,
}: {
  videoSrc: string
  autoPlay?: boolean
  loop?: boolean
  playOnInView?: boolean
  videoClasseName?: string
  hideControls?: boolean
}) {
  const { ref: inViewRef, inView } = useInView({
    /* Optional options */
    threshold: 0,
  })

  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [showControls, setShowControls] = React.useState(false)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const onVideoMouseEnter = () => {
    !hideControls && setShowControls(true)
  }
  const onVideoMouseLeave = () => {
    !hideControls && setShowControls(false)
  }

  React.useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play()
    } else {
      videoRef.current?.pause()
    }
  }, [isPlaying])

  React.useEffect(() => {
    if (inView && playOnInView) {
      setIsPlaying(true)
    }
  }, [inView, playOnInView])

  const videoClasses =
    `w-full h-full object-cover rounded-xl overflow-hidden ${videoClasseName}`.trim()

  return (
    <div
      className="relative h-max"
      onMouseEnter={onVideoMouseEnter}
      onMouseLeave={onVideoMouseLeave}
      ref={inViewRef}
    >
      <video
        ref={videoRef}
        className={videoClasses}
        src={videoSrc}
        autoPlay={autoPlay}
        loop={loop}
        muted
      ></video>
      {showControls && (
        <div className="absolute w-full bottom-0 left-0 flex justify-center align-items-center">
          <button
            className="p-4 text-white"
            onClick={() => setIsPlaying((prev) => !prev)}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </div>
  )
}
