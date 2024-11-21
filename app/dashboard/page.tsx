"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import HeadshotUpload from "../../components/HeadshotUpload"

interface User {
  firstName: string
  lastName: string
  email: string
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if the user is authenticated by verifying the token
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me", { method: "GET" }) // This is an endpoint you need to create to get user data
      if (res.status === 200) {
        const data = await res.json()
        setUser(data.user)
      } else {
        router.push("/login") // Redirect to login if user is not authenticated
      }
    }

    checkAuth()
  }, [])

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <div>
        Welcome to your dashboard, {user.firstName} {user.lastName}!
      </div>
      <HeadshotUpload />
    </div>
  )
}

export default Dashboard
