import { NextResponse } from "next/server"
import AWS from "aws-sdk"

// Initialize the S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  region: process.env.AWS_REGION as string,
})

interface UploadParams {
  fileName: string
  fileContent: Buffer
}

// POST
export async function POST(req: Request) {
  const { fileName, fileContent }: UploadParams = await req.json()

  if (!fileName || !fileContent) {
    return NextResponse.json(
      {
        error: "Missing required parameters",
      },
      { status: 400 },
    )
  }

  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: fileName,
    Body: Buffer.from(fileContent.toString(), "base64"), // Ensure fileContent is a base64 encoded string
    ContentType: "application/octet-stream", // Adjust for file type
  }

  try {
    const data = await s3.upload(params).promise()
    return NextResponse.json({ location: data.Location }, { status: 200 }) // URL of the uploaded file
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Error uploading file" }, { status: 500 })
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
