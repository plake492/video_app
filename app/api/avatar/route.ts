import { NextResponse } from "next/server"
import { uploadFile } from "@/utils/s3"
import { updateJwtToken } from "@/utils/updateJwtToken"
import User from "@/models/User"
import AWS from "aws-sdk"

// Initialize the S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  region: process.env.AWS_REGION as string,
})
interface UploadParams {
  id: string
  fileName: string
  file: Buffer
  fileType: string
}

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
}

// POST handler
export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const files = formData.getAll("file") as File[]
    const userId = formData.get("id") as string
    // Upload the file to S3

    if (files.length === 0) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const file = files[0]
    const fileName = `user-avatar/${userId}`
    const fileContent = Buffer.from(await file.arrayBuffer())
    const fileType = file.type

    // Upload the file to S3
    const location = await uploadFile({
      fileName,
      fileContent,
      fileType,
    })
    if (location) {
      // Update the user's avatar in the database
      const user = await User.findByIdAndUpdate(userId, { avatar: location })

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      // Use the utility function to update the JWT token
      return updateJwtToken({
        req,
        updatedUserInfo: { avatar: location },
        location,
      })
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

// GET
export async function GET(req: Request) {
  const { fileName }: UploadParams = await req.json()

  const params: AWS.S3.GetObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: fileName as string,
  }

  try {
    const data = await s3.getObject(params).promise()
    NextResponse.json(data.Body, { status: 200 }) // Return file content
  } catch (error) {
    console.error("Error fetching file:", error)
    NextResponse.json({ error: "Error fetching file" }, { status: 500 })
  }
}
