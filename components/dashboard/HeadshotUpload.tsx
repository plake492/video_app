"use-client"

import React, { useState } from "react"
import { useUserStore } from "@/store"

export default function HeadshotUpload() {
  const { user } = useUserStore()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!user) return
    if (!selectedFile) return

    // Create a FormData object
    const formData = new FormData()
    formData.append("id", user.id)
    formData.append("file", selectedFile) // Append the raw file
    console.log("user ==>", user)

    try {
      const response = await fetch("/api/avatar", {
        method: "POST",
        body: formData, // Send the form data
      })

      if (!response.ok) {
        throw new Error("Failed to upload file")
      }

      const data = await response.json()
      console.log("File uploaded to:", data.location)
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }

  return (
    <div className="mt-4">
      <h1>Headshot Upload</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: "200px", height: "200px" }}
          className="object-cover rounded-full"
        />
      )}
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}
