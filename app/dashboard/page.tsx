"use client"
// app/dashboard/page.tsx
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const Dashboard = () => {
  const [user, setUser] = useState(null)
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
      <div>Welcome to your dashboard, {user.name}!</div>
      <div>
        <Image
          src="/vix.JPG"
          width={600}
          height={600}
          alt="Dashboard"
          className="mx-auto rounded-full overflow-hidded"
        />
      </div>
    </div>
  )
}

export default Dashboard
