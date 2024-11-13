import React from "react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-gray-800 py-4 px-12 mb-8 flex justify-between">
      <Link href="/">Vid</Link>
      <nav>
        <ul className="flex">
          <li className="mr-4">
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
