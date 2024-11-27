import React from "react"
import Image from "next/image"

const gravatarLoader = ({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) => {
  const params = new URLSearchParams({
    s: "200", // Size
    d: "identicon", // Default icon style
  })

  return `${src}?${params.toString()}`
}

function DefaultImage() {
  const avatar = "https://gravatar.com/avatar/"

  return (
    <div>
      <Image
        src={avatar}
        alt="Default Avatar"
        width={200}
        height={200}
        loader={gravatarLoader}
        unoptimized // Disable Next.js optimizations for testing
        priority
      />
    </div>
  )
}

export default function UserAvatar({
  avatar = "https://gravatar.com/avatar?s=200&d=identicon",
  width = 300,
  height = 300,
  className = "",
}: {
  avatar?: string
  width?: number
  height?: number
  className?: string
}) {
  const classes = `rounded-full overflow-hidden ${className || ""}`.trim()

  const src = avatar.includes("gravatar.com")
    ? avatar
    : avatar + `?${new Date().getTime()}`
  return (
    <div
      className={classes}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image src={src} width={width} height={height} alt="User avatar" />
    </div>
  )
}
