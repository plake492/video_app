import React from "react"
import Link from "next/link"
import Heading from "@/components/Heading"
import Text from "@/components/Text"
import UserAvatar from "../UserAvatar"

export default function VideoDisplayCard({ video }: { video: any }) {
  console.log("video ==>", video)

  return (
    <div className="bg-purple-950 rounded-xl p-4 shadow-xl flex flex-col h-full justify-between">
      <video className="w-full rounded-lg" src={video.url} />

      <div className="mt-2">
        <Heading variant="h4" as="p" className="mb-1">
          {video.title}
        </Heading>
        <Text>{video.description}</Text>
        <div className="flex items-center justify-between mt-4">
          <Link
            href={`/videos/player/${video._id}`}
            className="bg-purple-900 text-white rounded-lg px-4 py-2 hover:bg-purple-800 transition"
          >
            Watch Video
          </Link>
          <Link href={`/videos/user/${video.user._id}`}>
            <UserAvatar avatar={video.user.avatar} width={30} height={30} />
          </Link>
        </div>
      </div>
    </div>
  )
}
