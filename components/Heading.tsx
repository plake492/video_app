import React from "react"

const headings = {
  h1: "text-8xl font-bold leading-normal text-center font-mono",
  h2: "text-6xl font-bold leading-normal text-center font-mono",
  h3: "text-4xl font-bold leading-normal text-center font-mono",
  h4: "text-2xl font-bold leading-normal text-center font-mono",
  h5: "text-xl font-bold leading-normal text-center font-mono",
  h6: "text-lg font-bold leading-normal text-center font-mono",
}

export default function Heading({
  children,
  as,
  variant,
}: {
  children: React.ReactNode
  as?: React.ElementType
  variant: keyof typeof headings
}) {
  const Component: React.ElementType = as ?? "div"

  return <Component className={headings[variant]}>{children}</Component>
}
