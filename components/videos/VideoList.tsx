// components/VideoList.tsx
"use client"

import React from "react"
import Video from "@/models/Video"
import VideoSmallCards from "@/components/videos/VideoSmallCards"

interface Video {
  _id: string
  title: string
  description: string
  url: string
  user: string
  createdAt: string
  updatedAt: string
}

interface VideoListProps {
  videos: Video[]
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <div>
      {videos.map((video) => (
        <VideoSmallCards video={video} key={video._id} />
      ))}
    </div>
  )
}

export default VideoList
