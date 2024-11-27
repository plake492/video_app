import React from "react"
import Container from "@/components/Container"
import Heading from "@/components/Heading"
import Text from "@/components/Text"
import Hero from "@/components/home/Hero"
import TopVideos from "@/components/home/TopVideos"

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

      <TopVideos />
    </>
  )
}
