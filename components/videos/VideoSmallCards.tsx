"use client"

import React from "react"
import Text from "@/components/Text"
import Image from "next/image"
import UserAvatar from "../UserAvatar"

export default function VideoSmallCards({ video }: { video: any }) {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const onMouseOver = () => {
    videoRef.current?.play()
  }
  const onMouseLeave = () => {
    videoRef.current?.pause()
  }

  const { title, description, url, user } = video
  return (
    <div className="border border-width-1 border-gray-500 rounded-xl overflow-hidden grid grid-cols-[1fr_1fr] gap-4">
      <video
        ref={videoRef}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        src={url}
        width={200}
        height={"200"}
        muted
        className="h-[150px] object-cover"
      />
      <div className="p-4">
        <Text variant="xl">{title}</Text>
        <p>{description}</p>
        <hr />
        <Text variant="sm">
          {user.firstName} {user.lastName}
        </Text>
        <UserAvatar avatar={user.avatar} width={30} height={30} />
      </div>
    </div>
  )
}
