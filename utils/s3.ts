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
  fileType: string
}

export const uploadFile = async ({
  fileName,
  fileContent,
  fileType,
}: UploadParams): Promise<string> => {
  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: fileName,
    Body: fileContent,
    ContentType: fileType,
  }

  try {
    const data = await s3.upload(params).promise()
    return data.Location // URL of the uploaded file
  } catch (error) {
    console.error("Error uploading file:", error)
    throw error
  }
}
