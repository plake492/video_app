import React from "react"
import Heading from "../Heading"

export default function UserVideos({ videos }: any) {
  return (
    <>
      <Heading variant="h4">My Videos</Heading>
      <div className="grid grid-cols-4 gap-4">
        {videos.map((video: any) => (
          <div key={video._id}>
            <video src={video.url} />
            <h2>{video.title}</h2>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}
