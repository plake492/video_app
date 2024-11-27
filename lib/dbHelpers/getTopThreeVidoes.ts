import connect from "../mongoose"
import { Video } from "@/models"

export async function getTopThreeVideos() {
  await connect()

  const videos = await Video.find()
    .sort({ views: -1 })
    .limit(3)
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
