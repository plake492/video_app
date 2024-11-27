import { getTopThreeVideos } from "@/lib/dbHelpers/getTopThreeVidoes"
import React from "react"
import VideoPlayer from "@/components/VideoPlayer"
import Container from "@/components/Container"
import Heading from "@/components/Heading"
import Text from "@/components/Text"
import GridBg from "@/components/GridBg"
import Link from "next/link"

export default async function TopVideos() {
  const videos = await getTopThreeVideos()

  return (
    <GridBg>
      <Container className="py-48 flex flex-col gap-4">
        <Heading variant="h3" as="h2">
          Top Videos
        </Heading>
        <Text variant="md">
          Lorem ipsum dolor sit amet consectetur adipiscing elit congue dis,
          purus litora posuere taciti ligula metus
        </Text>
        <div className="py-12 grid grid-cols-3 gap-8">
          {videos.map((video) => (
            <Link key={video._id} href={`/videos/player/${video._id}`}>
              <video src={video.url} />
            </Link>
          ))}
        </div>
      </Container>
    </GridBg>
  )
}
