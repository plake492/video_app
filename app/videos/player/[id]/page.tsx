import React from "react"
import Link from "next/link"
import Container from "@/components/Container"
import { Video } from "@/models"
import { getSingleVideo } from "@/lib/dbHelpers/getSingleVideo"

export default async function index({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const video = await getSingleVideo(id)

  if (!video) {
    return (
      <Container>
        <p>Video not found</p>
        <Link href="/videos">Back to videos</Link>
      </Container>
    )
  }

  // Increment the views for the video
  // await video.incrementViews()
  await Video.incrementViews(id)

  console.log("video ==>", video)

  return (
    <Container>
      <h1>{video.title}</h1>
      <p>{video.description}</p>
      <p>{video.views} views</p>
      <video controls src={video.url} />
    </Container>
  )
}
