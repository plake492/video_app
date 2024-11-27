// lib/videos.ts
import { Video } from "@/models" // Import from the central models file
import connect from "@/lib/mongoose"

export async function getVideos(userId?: string) {
  await connect()

  const config = userId ? { user: userId } : {}

  const videos = await Video.find(config)
    .populate("user", "firstName lastName email avatar")
    .select("title description url user createdAt updatedAt views")
    .lean()

  return videos.map((video) => ({
    ...video,
    user: {
      ...video.user,
      _id: video.user._id.toString(),
    },
    _id: video._id.toString(),
    createdAt: video.createdAt.toISOString(),
    updatedAt: video.updatedAt.toISOString(),
  }))
}
