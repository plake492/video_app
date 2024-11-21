"use client"
import React from "react"
import VideoSmallCards from "../../components/VideoSmallCards"

const videoList = [
  {
    thumbnail: "/space.mp4",
    video: "/vid.mp4",
    title: "Video 1",
    description: "Description 1",
  },
  {
    thumbnail: "/space.mp4",
    video: "/vid.mp4",
    title: "Video 2",
    description: "Description 2",
  },
  {
    thumbnail: "/space.mp4",
    video: "/space.mp4",
    title: "Video 3",
    description: "Description 3",
  },
  {
    thumbnail: "/space.mp4",
    video: "/space.mp4",
    title: "Video 4",
    description: "Description 4",
  },
  {
    thumbnail: "/space.mp4",
    video: "/space.mp4",
    title: "Video 5",
    description: "Description 5",
  },
  {
    thumbnail: "/space.mp4",
    video: "/space.mp4",
    title: "Video 6",
    description: "Description 5",
  },
  {
    thumbnail: "/space.mp4",
    video: "/space.mp4",
    title: "Video 7",
    description: "Description 5",
  },
]

export default function index() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [showControls, setShowControls] = React.useState(false)

  const [isPlaying, setIsPlaying] = React.useState(false)

  React.useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play()
    } else {
      videoRef.current?.pause()
    }
  }, [isPlaying])

  const onVideoMouseEnter = () => {
    setShowControls(true)
  }
  const onVideoMouseLeave = () => {
    setShowControls(false)
  }

  return (
    <div className="grid grid-cols-[3fr_1fr] gap-8">
      <div
        className="relative"
        onMouseEnter={onVideoMouseEnter}
        onMouseLeave={onVideoMouseLeave}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-xl overflow-hidden"
          src="/vid.mp4"
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
      <div className="border border-width-1 border-style-solid border-gray-700 rounded-xl p-2 gap-2 max-h-[85vh] overflow-auto">
        {videoList.map((video, index, arr) => (
          <div
            key={video.title}
            className={`${index !== arr.length - 1 && "mb-4"}`}
          >
            <VideoSmallCards {...video} />
          </div>
        ))}
      </div>
    </div>
  )
}
