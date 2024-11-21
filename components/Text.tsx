import React from "react"

const texts = {
  xs: "text-center leading-normal text-xs tracking-wider",
  sm: "text-center leading-normal text-sm tracking-wider",
  md: "text-center leading-normal text-md tracking-wider",
  lg: "text-center leading-normal text-lg tracking-wider",
  xl: "text-center leading-normal text-xl tracking-wider",
  "2xl": "text-center leading-normal text-2xl tracking-wider",
}

export default function Text({
  children,
  as,
  variant,
}: {
  children: React.ReactNode
  as?: React.ElementType
  variant?: keyof typeof texts
}) {
  const Component: React.ElementType = as ?? "div"

  return (
    <Component className={texts[variant ?? ("md" as keyof typeof texts)]}>
      {children}
    </Component>
  )
}
