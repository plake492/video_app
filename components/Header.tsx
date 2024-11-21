import React from "react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-gray-800 py-4 px-12 mb-32 flex justify-between">
      <Link href="/">Vid</Link>
      <nav>
        <ul className="flex items-center gap-2">
          <li className="mr-4">
            <Link href="/videos">Videos</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li className="px-2 py-1 bg-blue-600 hover:bg-blue-500 transition-all rounded-md ml-2">
            <Link href="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
