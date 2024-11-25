"use client"

import React from "react"
import Image from "next/image"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"

export default function GridBg({ children }: { children?: React.ReactNode }) {
  const gridWrapperRef = React.useRef<HTMLDivElement>(null)
  const gridContentRef = React.useRef<HTMLDivElement>(null)
  const imageRef = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    // Register plugin safely on the client
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const gridWrapper = gridWrapperRef.current
    const gridContent = gridContentRef.current
    const image = imageRef.current

    if (!gridWrapper || !image || !gridContent) return

    if (gridWrapper && image && gridContent) {
      setTimeout(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: gridContent,
            start: "top 90%",
            end: "center 90%",
          },
          defaults: { duration: 0.33, ease: "power4.out" },
        })

        tl.fromTo(
          gridWrapper.children,
          { y: "-100%" },
          { y: 0, stagger: 0.1 },
          "start",
        )
        tl.fromTo(image, { opacity: 0 }, { opacity: 1 }, "start")
      }, 100)
    }
  }, [])

  return (
    <div className="border-t-4 border-b-4 border-purple-900 overflow-hidden relative z-1">
      <div className="grid-bg" ref={gridContentRef}>
        <div className="grid-bg-wrapper" ref={gridWrapperRef}>
          {Array.from({ length: 11 }, (_, i) => (
            <div key={i} className="grid-bg__line" />
          ))}
        </div>
        <div className="grid-bg-content">{children}</div>
      </div>
      <Image
        ref={imageRef}
        alt="tree"
        src="/chip.png"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto", minWidth: "900px" }} // optional
        className="absolute right-0 top-[100%] transform translate-y-[-33%] scale-[1] z-[-1] rotate-90 brightness-0 opacity-20"
      />
    </div>
  )
}
