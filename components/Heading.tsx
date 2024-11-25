import React from "react"

const headings = {
  h1: "md:text-8xl text-6xlfont-bold leading-normal font-mono",
  h2: "md:text-6xl text-4xl font-bold leading-normal font-mono",
  h3: "md:text-4xl text-2xl font-bold leading-normal font-mono",
  h4: "md:text-2xl text-xl font-bold leading-normal font-mono",
  h5: "md:text-xl text-lg font-bold leading-normal font-mono",
  h6: "md:text-lg text-md font-bold leading-normal font-mono",
}

export default function Heading({
  children,
  as,
  variant,
  className = "",
}: {
  children: React.ReactNode
  as?: React.ElementType
  variant: keyof typeof headings
  className?: string
}) {
  const Component: React.ElementType = as ?? "div"
  const classes = `${headings[variant]} ${className}`.trim()

  return <Component className={classes}>{children}</Component>
}
