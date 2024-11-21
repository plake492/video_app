"use client"

import React from "react"
import VideoPlayer from "@/components/VideoPlayer"
import Container from "@/components/Container"
import Heading from "@/components/Heading"
import Text from "@/components/Text"

export default function index() {
  return (
    <Container>
      <div className="flex flex-col gap-8 items-center px-2 max-w-[1200px] mx-auto mb-16">
        <Heading variant="h2" as="h1">
          Video Streaming App
        </Heading>
        <Text variant="lg">
          Lorem ipsum dolor sit amet consectetur adipiscing elit congue dis,
          purus litora posuere taciti ligula metus mattis consequat, porta
          ridiculus faucibus aliquam elementum habitasse cum sed. Gravida
          dictumst eu turpis porttitor tellus massa primis justo morbi, aenean
          tempus natoque cursus eros nibh libero rhoncus mauris sollicitudin,
          enim erat fringilla iaculis convallis lobortis hac fermentum.
        </Text>
      </div>
      <VideoPlayer videoSrc="/vid.mp4" />
    </Container>
  )
}
