import React from "react"
import VideoPlayer from "@/components/VideoPlayer"
import { getVideos } from "@/lib/dbHelpers/getVideos"
import VideoList from "@/components/videos/VideoList"
import VideoDisplayCard from "@/components/videos/VideoDisplayCard"
import Container from "@/components/Container"

export default async function index() {
  const videos = await getVideos()

  if (!videos) return <div>Loading...</div>

  return (
    <Container className="grid xl:grid-cols-5 lg:grid-col-4 md:grid-cols-3 sm:grid-col-2 gap-8">
      {videos.map((video) => (
        <VideoDisplayCard video={video} key={video._id} />
      ))}
    </Container>
  )
}
