"use client"

import React, { useState } from "react"
import { useUserStore } from "@/store"
import { Input } from "../FormComponents"
import Heading from "../Heading"

const VideoUpload = () => {
  const { user } = useUserStore()
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!user) return

    if (!file) {
      setMessage("Please select a file to upload.")
      return
    }

    setUploading(true)
    setMessage("")

    const formData = new FormData()
    formData.append("userId", user.id) // Replace with actual user ID
    formData.append("title", videoData.title)
    formData.append("description", videoData.description)
    formData.append("file", file)

    try {
      const response = await fetch("/api/video/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (response.ok) {
        setMessage("File uploaded successfully!")
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage("An error occurred while uploading the file.")
    } finally {
      setUploading(false)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoData({
      ...videoData,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className="flex flex-col items-start gap-8 flex-1">
      <Heading variant="h3" as="p">
        Upload Video
      </Heading>
      <Input
        label="Title"
        placeholder="Video Title"
        value={videoData.title}
        onChange={handleInputChange}
        name="title"
      />
      <Input
        label="Description"
        placeholder="Video Description"
        value={videoData.description}
        onChange={handleInputChange}
        name="description"
      />
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default VideoUpload
