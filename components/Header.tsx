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

  const pathname = usePathname()
  const isNotHome = pathname !== "/"
  const classes = `relative ${isNotHome ? "mb-24" : ""}`.trim()

  return (
    <header
      className={classes}
      style={{ "--header-height": `${height}px` } as React.CSSProperties}
    >
      {userFetched && (
        <>
          <div className="fixed top-0 left-0 w-full z-50" ref={ref}>
            <div className="bg-[#00000070] backdrop-blur-[8px] absolute top-0 left-0 w-full h-full z-0"></div>
            <div className="py-4 px-12 flex justify-between items-center w-full relative z-1">
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
                          <UserAvatar
                            avatar={user.avatar}
                            height={40}
                            width={40}
                          />
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
