"use client"

import React from "react"
import Link from "next/link"
import useResizeObserver from "@/hooks/useResiveObserver"

export default function Header() {
  const [ref, dimensions] = useResizeObserver<HTMLDivElement>()
  const { height } = dimensions

  return (
    <header style={{ "--header-height": `${height}px` } as React.CSSProperties}>
      <div
        className="py-4 px-12 flex justify-between fixed top-0 left-0 w-full z-50"
        ref={ref}
      >
        <Link href="/">Vid</Link>
        <nav>
          <ul className="flex items-center gap-2">
            <li className="mr-4">
              <Link href="/videos">Videos</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li className="px-2 py-1 bg-blue-600 hover:bg-blue-500 transition-all rounded-md ml-2">
              <Link href="/signup">Signup</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
