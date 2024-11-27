import Container from "@/components/Container"
import VideoUpload from "@/components/dashboard/VideoUpload"

import { cookies } from "next/headers" // Import cookies() from next/headers
import { getVideos } from "@/lib/dbHelpers/getVideos"
import { jwtVerify } from "jose"
import UserInfo from "@/components/dashboard/UserInfo"
import UserVideos from "@/components/dashboard/UserVideos"

export default async function index() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token") // Get the token cookie

  if (!token) {
    return <div>Not authenticated</div>
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET) // Ensure JWT_SECRET is set
  const { payload } = await jwtVerify(token.value, secret)

  if (!payload) {
    return <div>Not authenticated</div>
  }

  const videos = await getVideos(payload.id)

  return (
    <Container>
      <div className="flex gap-4 items-start">
        <UserInfo />
        <VideoUpload />
      </div>
      <div className="mt-24">
        <UserVideos videos={videos} />
      </div>
    </Container>
  )
}
