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
  const classes =
    `container mx-auto pl-2 md:pl-4 lg:pl-8 pr-2 md:pr-4 lg:pr-8 transition ${className}`.trim()

  return <Component className={classes}>{children}</Component>
}
