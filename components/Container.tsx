import React from "react"

export default function Container({
  children,
  as,
}: {
  children: React.ReactNode
  as?: React.ElementType
}) {
  const Component: React.ElementType = as ?? "div"

  return (
    <Component className="container mx-auto transition">{children}</Component>
  )
}
