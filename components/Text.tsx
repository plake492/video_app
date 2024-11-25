import React from "react"

const texts = {
  xs: "text-xs leading-normal tracking-wider",
  sm: "md:text-sm text-xs leading-normal tracking-wider",
  md: "md:text-md text-sm leading-normal tracking-wider",
  lg: "md:text-lg text-md leading-normal tracking-wider",
  xl: "md:text-xl text-lg leading-normal tracking-wider",
  "2xl": "md:text-2xl text-xl leading-normal tracking-wider",
}

export default function Text({
  children,
  as,
  variant,
  className = "",
}: {
  children: React.ReactNode
  as?: React.ElementType
  variant?: keyof typeof texts
  className?: string
}) {
  const Component: React.ElementType = as ?? "div"

  const classes = `${
    texts[variant ?? ("md" as keyof typeof texts)]
  } ${className}`.trim()

  return <Component className={classes}>{children}</Component>
}
