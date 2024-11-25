"use client"

import React from "react"
import { usePathname } from "next/navigation"

export default function MainWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const isNotHome = pathname !== "/"
  const mainClasses = `flex-1 ${isNotHome && "py-24"}`.trim()

  return (
    <main className={mainClasses}>
      <section className="w-full h-full mx-auto rounded-xl flex flex-col justify-center">
        {children}
      </section>
    </main>
  )
}
