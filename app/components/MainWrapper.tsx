import React from "react"

export default function MainWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex-1 px-12 ">
      <section className="w-full h-full mx-auto rounded-xl overflow-hidden flex flex-col justify-center">
        {children}
      </section>
    </main>
  )
}
