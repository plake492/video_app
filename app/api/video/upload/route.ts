import { NextResponse } from "next/server"
import { uploadFile } from "@/utils/s3"
import User from "@/models/User"
import Video from "@/models/Video"
import connect from "@/lib/mongoose"

export async function POST(req: Request) {
  try {
    await connect()

    const formData = await req.formData()
    const userId = formData.get("userId") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const fileName = `user-videos/${userId}/${file.name}`
    const fileContent = Buffer.from(await file.arrayBuffer())
    const fileType = file.type

    const location = await uploadFile({
      fileName,
      fileContent,
      fileType,
    })

    if (location) {
      const video = await Video.create({
        title,
        description,
        url: location,
        user: userId,
      })

      await User.findByIdAndUpdate(userId, { $push: { videos: video._id } })
      return NextResponse.json({ location }, { status: 200 })
    }

    return NextResponse.json({ error: "Error uploading file" }, { status: 500 })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    )
  }
}
