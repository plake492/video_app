"use client"

import React from "react"

export default function VideoPlayer({ videoSrc }: { videoSrc: string }) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [showControls, setShowControls] = React.useState(false)

  const [isPlaying, setIsPlaying] = React.useState(false)
  const onVideoMouseEnter = () => {
    setShowControls(true)
  }
  const onVideoMouseLeave = () => {
    setShowControls(false)
  }

  React.useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play()
    } else {
      videoRef.current?.pause()
    }
  }, [isPlaying])

  return (
    <div
      className="relative"
      onMouseEnter={onVideoMouseEnter}
      onMouseLeave={onVideoMouseLeave}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-xl overflow-hidden"
        src={videoSrc}
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
