import React from "react"
import Link from "next/link"
import Container from "@/components/Container"
import { getVideos } from "@/lib/dbHelpers/getVideos"
import Heading from "@/components/Heading"

export default async function index({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const videos = await getVideos(id)

  if (!videos || videos.length === 0) {
    return (
      <Container>
        <p>No videos found</p>
        <Link href="/videos">Back to videos</Link>
      </Container>
    )
  }

  return (
    <Container className="">
      <Heading variant="h2" as="h1" className="mb-8">
        Videos from {videos[0].user.firstName + " " + videos[0].user.lastName}
      </Heading>
      <div className="grid grid-cols-3 gap-8">
        {videos.map((video) => (
          <Link href={`/videos/player/${video._id}`} key={video._id}>
            <h1>{video.title}</h1>
            <p>{video.description}</p>
            <p>{video.views} views</p>
            <video src={video.url} />
          </Link>
        ))}
      </div>
    </Container>
  )
}
