"use client"

import React from "react"
import VideoPlayer from "@/components/VideoPlayer"
import Container from "@/components/Container"
import Heading from "@/components/Heading"
import Text from "@/components/Text"
import GridBg from "@/components/GridBg"

import Hero from "@/components/home/Hero"

export default function index() {
  return (
    <>
      <Hero />
      <div className="bg-[#00000050] py-24">
        <Container>
          <div className="bg-purple-950 rounded-xl p-8 shadow-xl">
            <Heading variant="h2" as="h2" className="mb-8">
              Heading Two
            </Heading>
            <Text variant="lg">
              Lorem ipsum dolor sit amet consectetur adipiscing elit congue dis,
              purus litora posuere taciti ligula metus Lorem ipsum dolor sit
              amet consectetur adipiscing elit congue dis, purus litora posuere
              taciti ligula metus Lorem ipsum dolor sit amet consectetur
              adipiscing elit congue dis, purus litora posuere taciti ligula
              metus
            </Text>
          </div>
        </Container>
      </div>
      <GridBg>
        <Container className="py-48 flex flex-col gap-4">
          <Heading variant="h3" as="h2">
            Heading Two
          </Heading>
          <Text variant="md">
            Lorem ipsum dolor sit amet consectetur adipiscing elit congue dis,
            purus litora posuere taciti ligula metus
          </Text>
          <div className="py-12 flex gap-12">
            <VideoPlayer videoSrc="/vid.mp4" />
            <VideoPlayer videoSrc="/vid.mp4" />
          </div>
        </Container>
      </GridBg>
    </>
  )
}
