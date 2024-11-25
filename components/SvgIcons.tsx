import React from "react"

interface SVGProps {
  width?: string
  height?: string
  className?: string
}

function Base({
  children,
  width = "48px",
  height = "48px",
  className,
}: {
  children: React.ReactNode
  width?: string
  height?: string
  className?: string
}) {
  return (
    <div className={className} style={{ width, height }}>
      {children}
    </div>
  )
}

export function Camera({ width, height, className }: SVGProps) {
  return (
    <Base width={width} height={height} className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M22 14.236v3.528l-2-1v-1.528l2-1zm2-3.236l-6 3v4l6 3v-10zm-10 2v5.5c0 .276-.224.5-.5.5h-9c-.276 0-.5-.224-.5-.5v-5.5c-.702 0-1.373-.127-2-.35v6.35c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-6.35c-.627.223-1.298.35-2 .35zm0-8c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm-10 0c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm10-2c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm-10 0c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"
        />
      </svg>
    </Base>
  )
}
