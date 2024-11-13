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
  return (
    <section className="border border-width-1 border-gray-500 rounded-xl overflow-hidden grid grid-cols-[1fr_1fr] gap-4">
      <Image src={thumbnail} alt={title} width={200} height={"200"} />
      <div className="p-4">
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </section>
  )
}
