import React from "react"

export default function Container({
  children,
  as,
  className,
}: {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
}) {
  const Component: React.ElementType = as ?? "div"
  const classes = `container mx-auto transition ${className}`.trim()

  return <Component className={classes}>{children}</Component>
}
