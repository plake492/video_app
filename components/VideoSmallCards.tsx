import React from "react"
import Image from "next/image"

export default function VideoSmallCards({
  thumbnail,
  video,
  title,
  description,
}: {
  thumbnail: string
  video: string
  title: string
  description: string
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const onMouseOver = () => {
    videoRef.current?.play()
  }
  const onMouseLeave = () => {
    videoRef.current?.pause()
  }

  return (
    <section className="border border-width-1 border-gray-500 rounded-xl overflow-hidden grid grid-cols-[1fr_1fr] gap-4">
      <video
        ref={videoRef}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        src={thumbnail}
        width={200}
        height={"200"}
        muted
        className="h-[150px] object-cover"
      />
      <div className="p-4">
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </section>
  )
}
