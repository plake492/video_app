// lib/videos.ts
import Video from "@/models/Video"
import connect from "@/lib/mongoose"

export async function getSingleVideo(id?: string) {
  await connect()

  try {
    return await Video.findById(id).populate(
      "user",
      "firstName lastName email avatar",
    )
  } catch (error: unknown) {
    console.warn(error)
    return null
  }
}
