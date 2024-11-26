"use client"

import React from "react"
import { useUserStore } from "@/store/index"
import { motion } from "framer-motion"

const pageVariants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  transition: {
    ease: "easeInOut",
    duration: 0.66,
  },
}

export default function Template({ children }: { children: React.ReactNode }) {
  const { setUser, user, setUserFetched } = useUserStore()

  React.useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        const response = await fetch("/api/auth/me")

        if (response.ok) {
          const data = await response.json()

          if (data) {
            setUser(data)
          }
        }
        setUserFetched(true)
      }

      fetchUser()
    }
  }, [user])

  return <motion.div {...pageVariants}>{children}</motion.div>
}
