import React from "react"
import VideoPlayer from "@/components/VideoPlayer"
import { getVideos } from "@/lib/dbHelpers/getVideos"
import VideoList from "@/components/videos/VideoList"

export default async function index() {
  const videos = await getVideos()

  if (!videos) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-[3fr_1fr] gap-8">
      <VideoPlayer videoSrc={videos[0].url} />
      <div className="border border-width-1 border-style-solid border-gray-700 rounded-xl p-2 gap-2 max-h-[85vh] overflow-auto">
        <VideoList videos={videos} />
      </div>
    </div>
  )
}
