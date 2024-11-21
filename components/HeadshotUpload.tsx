"use-client"

import React, { useState } from "react"

export default function HeadshotUpload() {
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

  // const handleUpload = () => {
  //   if (selectedFile) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       const arrayBuffer = reader.result as ArrayBuffer
  //       const buffer = Buffer.from(arrayBuffer)
  //       uploadFile({
  //         fileName: selectedFile.name,
  //         fileContent: buffer,
  //       })
  //     }
  //     reader.readAsArrayBuffer(selectedFile)
  //     // Handle the file upload logic here
  //     console.log("Uploading:", selectedFile)
  //   }
  // }

  const handleUpload = async () => {
    if (!selectedFile) return

    const fileContent = await selectedFile.arrayBuffer()
    const base64FileContent = Buffer.from(fileContent).toString("base64")

    const response = await fetch("/api/avatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: selectedFile.name,
        fileContent: base64FileContent,
      }),
    })

    const data = await response.json()
    console.log("File uploaded to:", data.location)
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
