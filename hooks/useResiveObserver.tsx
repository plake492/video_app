"use client"

import React from "react"

const useResizeObserver = <T extends HTMLElement>() => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })
  const ref = React.useRef<T>(null)

  React.useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0]

      if (entry && entry.contentRect) {
        const { width, height } = entry.contentRect
        const element = ref.current

        if (element) {
          const computedStyle = getComputedStyle(element)
          const paddingTop = parseFloat(computedStyle.paddingTop)
          const paddingBottom = parseFloat(computedStyle.paddingBottom)
          const paddingLeft = parseFloat(computedStyle.paddingLeft)
          const paddingRight = parseFloat(computedStyle.paddingRight)

          setDimensions({
            width: width + paddingLeft + paddingRight, // Include padding in width
            height: height + paddingTop + paddingBottom, // Include padding in height
          })
        }
      }
    }

    const resizeObserver = new ResizeObserver(handleResize)

    if (ref.current) {
      resizeObserver.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current)
      }
    }
  }, [])

  return [ref, dimensions] as const
}

export default useResizeObserver
