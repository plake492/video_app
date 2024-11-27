"use client"

import React from "react"
import Heading from "@/components/Heading"
import Text from "@/components/Text"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { StaggeredAnimation } from "@/components/StaggeredAnimation"
import useResizeObserver from "@/hooks/useResiveObserver"

export default function Hero() {
  const [videoRef, dimensions] = useResizeObserver<HTMLVideoElement>()
  const { height } = dimensions

  return (
    <div className="relative" style={{ height }}>
      <div className="flex flex-col gap-8 px-2 max-w-[1400px] mx-auto mb-24 relative z-10 justify-center h-full">
        <motion.div
          className="backdrop-blur-[8px] bg-[#0004] p-12 rounded-xl shadow-2xl shadow-gray-900 w-[min(800px,_100%)] relative z-10 pb-32 overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.33,
            ease: "easeInOut",
            duration: 1,
          }}
        >
          <StaggeredAnimation stagger={0.33}>
            <Heading as="p" variant="h6" className="mb-4 text-purple-600">
              WELCOME TO A NEW
            </Heading>
            <Heading variant="h2" as="h1" className="mb-8">
              Video Streaming App
            </Heading>

            <Text variant="lg" className="w-full mb-8">
              Lorem ipsum dolor sit amet consectetur adipiscing elit congue dis,
              purus litora posuere taciti ligula metus mattis consequat, porta
              ridiculus faucibus aliquam elementum habitasse cum sed. Gravida
              dictumst eu turpis porttitor tellus massa primis justo morbi,
              aenean tempus natoque cursus eros nibh libero rhoncus mauris
              sollicitudin, enim erat fringilla iaculis convallis lobortis hac
              fermentum.
            </Text>

            <Link
              href="/videos"
              className="px-2 py-2 bg-purple-700 hover:bg-purple-600 transition-all rounded-md w-[min(200px,_66%)] text-lg"
            >
              Start Here
            </Link>
          </StaggeredAnimation>
          <Image
            alt="tree"
            src="/chip-tree.png"
            width={320}
            height={200}
            className="absolute right-0 top-[100%] transform translate-y-[-33%] scale-[1.2] brightness-0 invert opacity-40 z-0"
          />
        </motion.div>
      </div>

      <video
        src="/vid.mp4"
        muted
        loop
        playsInline
        autoPlay
        ref={videoRef}
        className="mx-auto absolute top-0 left-0 z-0 min-h-[700px] w-full object-cover w-dvh h-dvh"
      ></video>
    </div>
  )
}
