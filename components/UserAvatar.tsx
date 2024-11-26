import React from "react"
import Image from "next/image"

export default function UserAvatar({
  avatar = "https://gravatar.com/avatar/?s=200&d=identicon",
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

  return (
    <div
      className={classes}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        src={avatar + `?${new Date().getTime()}`}
        width={width}
        height={height}
        alt="User avatar"
      />
    </div>
  )
}
