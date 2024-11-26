"use client"

import React from "react"
import Link from "next/link"
import useResizeObserver from "@/hooks/useResiveObserver"
import { useUserStore } from "@/store/index"
import { usePathname, useRouter } from "next/navigation"
import UserAvatar from "./UserAvatar"

export default function Header() {
  const path = usePathname()
  const router = useRouter()

  const { user, setUser, userFetched } = useUserStore()

  const [ref, dimensions] = useResizeObserver<HTMLDivElement>()
  const { height } = dimensions

  const logout = () => {
    const fetchLogout = async () => {
      const res = await fetch("/api/auth/logout")

      if (res.ok) {
        setUser(null)

        if (path.startsWith("/dashboard")) {
          router.push("/")
        }
      }
    }

    fetchLogout()
  }

  return (
    <header style={{ "--header-height": `${height}px` } as React.CSSProperties}>
      {userFetched && (
        <div
          className="py-4 px-12 flex justify-between fixed top-0 left-0 w-full z-50 bg-[#00000070] backdrop-blur-[8px]"
          ref={ref}
        >
          <Link href="/">Vid</Link>
          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <Link href="/videos">Videos</Link>
              </li>
              {!user && (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li className="px-2 py-1 bg-blue-600 hover:bg-blue-500 transition-all rounded-md">
                    <Link href="/signup">Signup</Link>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <a onClick={logout} className="cursor-pointer">
                      Logout
                    </a>
                  </li>
                  <li>
                    <Link href="/dashboard">
                      <UserAvatar avatar={user.avatar} height={50} width={50} />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
